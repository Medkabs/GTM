declare module "three/examples/jsm/geometries/TextGeometry.js" {
    import { BufferGeometry, Font } from "three";
    export class TextGeometry extends BufferGeometry {
      constructor(text: string, parameters?: {
        font?: Font;
        size?: number;
        height?: number;
        curveSegments?: number;
        bevelEnabled?: boolean;
        bevelThickness?: number;
        bevelSize?: number;
        bevelOffset?: number;
        bevelSegments?: number;
      });
    }
  }
  
  declare module "three/examples/jsm/controls/OrbitControls.js" {
    import { Camera, MOUSE, Vector3, EventDispatcher } from "three";
    export class OrbitControls extends EventDispatcher {
      constructor(object: Camera, domElement?: HTMLElement);
      object: Camera;
      domElement: HTMLElement | undefined;
      enabled: boolean;
      target: Vector3;
      minDistance: number;
      maxDistance: number;
      minZoom: number;
      maxZoom: number;
      update(): void;
      reset(): void;
      dispose(): void;
    }
  }
  