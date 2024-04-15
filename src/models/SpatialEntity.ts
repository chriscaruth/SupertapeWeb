import { Transform } from "./Transform";

export interface SpatialEntity extends Transform {
  anchorId: string;
}
