import React, { Suspense, FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface ModelViewerProps {
  modelPath: string;
}

const Model: FC<{ modelPath: string }> = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.5} />;
};

const ModelViewer: FC<ModelViewerProps> = ({ modelPath }) => (
  <div style={{ width: '100%', height: '100%' }}>
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <Suspense fallback={<div>Загрузка 3D модели...</div>}>
        <Model modelPath={modelPath} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  </div>
);

export default ModelViewer;