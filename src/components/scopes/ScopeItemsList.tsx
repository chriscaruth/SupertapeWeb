import { ScopeItem } from "../../models/ScopeItem";
import { ScopeItemCard } from "./ScopeItemCard";

interface ScopeItemsListProps {
  scopeItems: ScopeItem[];
}

export const ScopeItemsList = ({ scopeItems }: ScopeItemsListProps) => {
  return (
    <div>
      {scopeItems.map((scopeItem) => (
        <ScopeItemCard key={scopeItem.id} scopeItem={scopeItem} />
      ))}
    </div>
  );
};
