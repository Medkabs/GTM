declare module "three/examples/jsm/geometries/TextGeometry" {
  import { BufferGeometry, Font } from "three";
  export class TextGeometry extends BufferGeometry {
    constructor(text: string, parameters?: { font: Font; size?: number; height?: number; bevelEnabled?: boolean; bevelThickness?: number; bevelSize?: number; curveSegments?: number; });
  }
}

declare module "three/examples/jsm/loaders/FontLoader" {
  import { Font } from "three";
  export class FontLoader {
    load(url: string, onLoad?: (font: Font) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
  }
}

declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera, EventDispatcher, MOUSE, TOUCH, Vector3, Renderer } from "three";
  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    enabled: boolean;
    target: Vector3;
    update(): void;
    dispose(): void;
    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };
    touches: { ONE: TOUCH; TWO: TOUCH };
  }
}
