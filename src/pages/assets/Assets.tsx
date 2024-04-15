import { PageHeader } from "../../components/layout/PageHeader";
import { SearchableTable } from "../../components/entities/SearchableTable";
import { PageContent } from "../../components/layout/PageContent";
import { useServices } from "../../context/ServiceContext";

export const Assets = () => {
  return (
    <>
      <PageHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Assets</h1>
        </div>
      </PageHeader>
      <PageContent>
        <>
          <SearchableTable />
        </>
      </PageContent>
    </>
  );
};
