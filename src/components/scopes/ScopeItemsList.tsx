import { useAsset3D } from "../../context/Asset3DContext";
import { CategoryMap } from "../../models/Category";
import { Scope } from "../../models/Scope";
import { ScopeItemCard } from "./ScopeItemCard";

interface ScopeItemsListProps {
  scope: Scope;
}

export const ScopeItemsList = ({ scope }: ScopeItemsListProps) => {
  const {
    state: { scopeItemsCategoryMap },
  } = useAsset3D();

  const mappedScopeItems = scopeItemsCategoryMap.get(scope.id);

  const renderScopeItemsByCategory = (
    categoryMap: CategoryMap,
    level: number = 0,
    prefix: string = "1"
  ) => {
    {
      return (
        <div key={categoryMap.name}>
          <h3 className="py-1 font-semibold">
            {prefix} {categoryMap.name}
          </h3>
          {categoryMap.scopeItems.map((scopeItem) => (
            <ScopeItemCard key={scopeItem.id} scopeItem={scopeItem} />
          ))}
          {categoryMap.subcategories &&
            categoryMap.subcategories.map((subcategory, idx) =>
              renderScopeItemsByCategory(
                subcategory,
                level + 1,
                `${prefix}.${idx + 1}`
              )
            )}
        </div>
      );
    }
  };

  return (
    <div className="border border-gray-100 rounded-md">
      {mappedScopeItems?.map((categoryMap, idx) =>
        renderScopeItemsByCategory(categoryMap, 0, `${idx + 1}`)
      )}
    </div>
  );
};
