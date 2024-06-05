import { Accordion, AccordionItem } from "@nextui-org/react";
import { Scope } from "../../models/Scope";
import { ScopeCard } from "./ScopeCard";
import { CheckCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ScopeStatus } from "../../models/enums/ScopeStatus";
import clsx from "clsx";
import { formatDate } from "../../utilities/utils";
import { useAsset3D } from "../../context/Asset3DContext";

export interface ScopeListProps {
  scopes: Scope[] | undefined;
}

export const ScopesList = ({ scopes }: ScopeListProps) => {
  const { setSelectedScope } = useAsset3D();

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small",
    subtitle: "text-xs",
  };

  const scopeStatusStartIcon = (status: ScopeStatus) => {
    const statusClassNames = "w-5 h-5";
    switch (status) {
      case ScopeStatus.Scheduled:
        return (
          <CalendarDaysIcon
            className={clsx("text-yellow-500", statusClassNames)}
          />
        );
      case ScopeStatus.Completed:
        return (
          <CheckCircleIcon
            className={clsx("text-green-500", statusClassNames)}
          />
        );
    }
  };

  const scopeSubtitle = (scope: Scope) => {
    switch (scope.status) {
      case ScopeStatus.Scheduled:
        return `Scheduled for ${formatDate(scope.scheduledDateTime)}`;
      case ScopeStatus.Completed:
        return `Completed on ${formatDate(scope.completedDateTime)}`;
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-xl font-bold mb-2">Scopes</h2>
      {scopes && scopes.length > 0 && (
        <Accordion
          showDivider={false}
          className="flex flex-col gap-1 w-full px-0"
          itemClasses={itemClasses}
        >
          {scopes?.map((scope) => (
            <AccordionItem
              key={scope.id}
              title={scope.scopeType}
              subtitle={scopeSubtitle(scope)}
              startContent={scopeStatusStartIcon(scope.status)}
              onPress={() => setSelectedScope(scope)}
            >
              <ScopeCard key={scope.id} scope={scope} />
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
