// src/types/react-three-jsx.d.ts

import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: any;
      group: any;
      ambientLight: any;
      hemisphereLight: any;
      directionalLight: any;
    }
  }
}
