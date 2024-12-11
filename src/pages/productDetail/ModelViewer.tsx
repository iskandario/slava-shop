import React, { Suspense, FC, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment } from '@react-three/drei';

interface ModelViewerProps {
  modelPath: string;
  productId: string;
  imageAspectRatio: number; // Соотношение сторон изображения (ширина/высота)
}

// Глобальная скорость вращения
const GLOBAL_ROTATION_SPEED = 0.01;

const modelConfigurations: Record<
  string,
  {
    scale: number;
    position: [number, number, number];
    lights: {
      ambient: number;
      directional: { intensity: number; position: [number, number, number] };
    };
  }
> = {
  '1': {
    scale: 3,
    position: [0, 0.6, 0],
    lights: { ambient: 0.8, directional: { intensity: 1, position: [0, 10, 5] } },
  },
  '2': {
    scale: 3.2,
    position: [0, 0.5, 0],
    lights: { ambient: 1, directional: { intensity: 1.2, position: [5, 15, 10] } },
  },
  '3': {
    scale: 3.3,
    position: [0, 0.5, 0],
    lights: { ambient: 0.6, directional: { intensity: 0.9, position: [0, 5, 2] } },
  },
  '4': {
    scale: 0.5,
    position: [0, -0.5, 0],
    lights: { ambient: 1, directional: { intensity: 1.5, position: [2, 8, 3] } },
  },
  '5': {
    scale: 0.5,
    position: [0, -0.5, 0],
    lights: { ambient: 0.1, directional: { intensity: 0.2, position: [1, 7, 4] } },
  },
  '6': {
    scale: 3,
    position: [0, 0.5, 0],
    lights: { ambient: 1, directional: { intensity: 1, position: [0, 10, 5] } },
  },
  '7': {
    scale: 3,
    position: [0, 0.5, 0],
    lights: { ambient: 0.9, directional: { intensity: 1.2, position: [3, 12, 6] } },
  },
};

const Model: FC<{ modelPath: string; autoRotate: boolean; scale: number; position: [number, number, number] }> = ({
  modelPath,
  autoRotate,
  scale,
  position,
}) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef<any>(scene);

  useFrame(() => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += GLOBAL_ROTATION_SPEED; // Используем общую скорость
    }
  });

  return (
    <group ref={modelRef} position={position}>
      <primitive object={scene} scale={scale} />
    </group>
  );
};

const ModelViewer: FC<ModelViewerProps> = ({ modelPath, productId, imageAspectRatio }) => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0, topPadding: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Достаём конфигурацию для текущей модели
  const { scale, position, lights } = modelConfigurations[productId] || {
    scale: 1,
    position: [0, 0, 0],
    lights: { ambient: 1, directional: { intensity: 1, position: [0, 10, 5] } },
  };

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = (width * 500) / 359; // Высота на основе нового соотношения сторон
        setContainerSize({ width, height, topPadding: 0 });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: containerSize.height,
        paddingTop: `${containerSize.topPadding}px`,
        paddingBottom: `${containerSize.topPadding}px`,
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <Canvas>
        <ambientLight intensity={lights.ambient} />
        <hemisphereLight intensity={0.8} groundColor="white" />
        <directionalLight
          position={lights.directional.position}
          intensity={lights.directional.intensity}
          castShadow
        />
        <Environment
          files="/hdr/venice_sunset_1k.hdr" // Явный путь к файлу HDR
          background={false}
        />  
      <Suspense fallback={<LoadingScreen />}>
          <Model
            modelPath={modelPath}
            autoRotate={true}
            scale={scale}
            position={position}
          />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

const LoadingScreen = () => (
  <Html center>
    <div style={{ color: 'white', fontSize: '1.5em' }}>Загрузка 3D модели...</div>
  </Html>
);

export default ModelViewer;