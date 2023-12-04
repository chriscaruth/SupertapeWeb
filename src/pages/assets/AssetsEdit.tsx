import { PageHeader } from "../../components/layout/PageHeader";
import { PageContent } from "../../components/layout/PageContent";
import { useNavigate, useParams } from "react-router-dom";
import { useServices } from "../../context/ServiceContext";
import { RouteName } from "../../routing/router";

export const AssetsEdit = () => {
    const { assetId } = useParams();
    const { assetService } = useServices();
    const { data, isLoading, error } = assetService.getAssetByIdQuery(assetId || "");

    return (
        <>
            <PageHeader>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Assets Edit</h1>
                </div>
            </PageHeader>
            <PageContent>
                <>
                    <div>
                        Display and edit asset
                    </div>
                    <div>
                        Create New Scope
                    </div>
                    <div>
                        {data?.id}
                    </div>
                </>
            </PageContent>
        </>
    );
}