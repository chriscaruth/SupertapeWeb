import { useAsset3D } from "../../context/Asset3DContext";
import { ScopeItem } from "../../models/ScopeItem";

interface ScopeItemProps {
  scopeItem: ScopeItem;
}

export const ScopeItemCard = ({ scopeItem }: ScopeItemProps) => {
  const { setFocusedScopeItem } = useAsset3D();
  return (
    <div
      key={scopeItem.id}
      onClick={() => setFocusedScopeItem(scopeItem)}
      className="mb-2 cursor-pointer"
    >
      <div className="flex flex-row gap-4">
        {scopeItem.cameraEntity && (
          <div>
            <img
              className="rounded-md"
              src={scopeItem.cameraEntity?.imageUrl}
            />
          </div>
        )}
      </div>
    </div>
  );
};
