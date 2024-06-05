import { PageHeader } from "../../components/layout/PageHeader";
import { PageContent } from "../../components/layout/PageContent";
import { useServices } from "../../context/ServiceContext";
import { useParams } from "react-router-dom";
import { ScopesList } from "../../components/scopes/ScopesList";
import { Viewer } from "./3D/Viewer";
import clsx from "clsx";
import { useAsset3D } from "../../context/Asset3DContext";
import { useEffect } from "react";
import { transformScopeItems } from "../../utilities/utils";
import { CategoryMap } from "../../models/Category";

export const AssetsEdit = () => {
  const { assetId } = useParams();

  if (!assetId) {
    return;
  }

  const { assetService, scopeService } = useServices();
  const { setScopeItems, setScopeItemsCategoryMap } = useAsset3D();

  const { data: asset } = assetService.getAssetByIdQuery(assetId);
  const { data: scopes } = scopeService.getScopesByAssetId(assetId);

  // This is starting to become messy. We should reevaluate the payload from the API.
  // It probably makes more sense to have the API return in the category mapping format.
  useEffect(() => {
    const map = new Map<string, CategoryMap[]>();
    scopes?.forEach((scope) => {
      const scopeItemsCategoryMap = transformScopeItems(scope.scopeItems); // This seems to be working for rendering
      map.set(scope.id, scopeItemsCategoryMap);
    });

    setScopeItemsCategoryMap(map);
    setScopeItems(scopes ?? []);
  }, [scopes]);

  return (
    <div className="flex flex-col h-screen">
      <PageHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {asset?.streetAddress} {asset?.city}, {asset?.state}{" "}
            {asset?.zipCode}
          </h1>
        </div>
      </PageHeader>
      <PageContent className="flex-grow overflow-auto">
        <div className="flex flex-row h-full">
          <div
            className={clsx(
              "p-4 overflow-auto",
              asset?.assetMapURL ? "flex-none w-[400px]" : "w-full"
            )}
          >
            <ScopesList scopes={scopes} />
          </div>
          {asset?.assetMapURL && (
            <div className="flex-grow">
              <Viewer assetUrl={asset?.assetMapURL} />
            </div>
          )}
        </div>
      </PageContent>
    </div>
  );
};
