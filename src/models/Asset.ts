import { AssetType } from "./enums/AssetType";
import { AssetStatus } from "./enums/AssetStatus";

export interface Asset {
  id: string;
  streetAddress: string;
  unit: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  assetType: AssetType;
  status: AssetStatus;
  assetMapURL: string;
}
