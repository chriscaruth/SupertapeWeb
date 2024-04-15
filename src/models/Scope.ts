import { ScopeItem } from "./ScopeItem";
import { ScopeStatus } from "./enums/ScopeStatus";
import { ScopeType } from "./enums/ScopeType";

export interface Scope {
  id: string;
  status: ScopeStatus;
  scopeType: ScopeType;
  scopeItems: ScopeItem[];
  scheduledDateTime: string;
  completedDateTime: string;
}
