import { CameraEntity } from "./CameraEntity";
import { Category } from "./Category";
import { SpatialEntity } from "./SpatialEntity";

export interface ScopeItem {
  id: string;
  description: string;
  category?: Category;
  summary: string;
  cameraEntity?: CameraEntity;
  spatialEntity?: SpatialEntity;
}
