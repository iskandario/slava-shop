/// <reference types="@react-three/fiber" />

import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      primitive: any;
      ambientLight: any;
      hemisphereLight: any;
      directionalLight: any;
    }
  }
}
