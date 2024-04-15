import { ScopeItem } from "../../models/ScopeItem";

interface ScopeItemProps {
  scopeItem: ScopeItem;
}

export const ScopeItemCard = ({ scopeItem }: ScopeItemProps) => {
  return (
    <div
      key={scopeItem.id}
      className="my-2 px-4 py-12 border border-gray-500 cursor-pointer"
    >
      <div className="flex flex-row gap-4">
        {scopeItem.cameraEntity && (
          <div>
            <img src={scopeItem.cameraEntity?.imageUrl} />
          </div>
        )}
      </div>
    </div>
  );
};
