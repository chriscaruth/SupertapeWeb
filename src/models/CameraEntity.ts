import { Transform } from "./Transform";

export interface CameraEntity extends Transform {
  cameraId: string;
  imageUrl: string;
}
