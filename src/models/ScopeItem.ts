import { CameraEntity } from "./CameraEntity";
import { SpatialEntity } from "./SpatialEntity";

export interface ScopeItem {
  id: string;
  description: string;
  summary: string;
  cameraEntity?: CameraEntity;
  spatialEntity?: SpatialEntity;
}
