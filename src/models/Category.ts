import { ScopeItem } from "./ScopeItem";

export interface Category {
  name: string;
  description: string;
  parentCategory?: Category;
}

export interface CategoryMap {
  name: string;
  subcategories: CategoryMap[];
  scopeItems: ScopeItem[];
}
