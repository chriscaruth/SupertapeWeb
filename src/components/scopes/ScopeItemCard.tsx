import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  cn,
  Chip,
} from "@nextui-org/react";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { useAsset3D } from "../../context/Asset3DContext";
import { ScopeItem } from "../../models/ScopeItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ScopeItemProps {
  scopeItem: ScopeItem;
}

export const ScopeItemCard = ({ scopeItem }: ScopeItemProps) => {
  const { setFocusedScopeItem } = useAsset3D();
  return (
    <div
      key={scopeItem.id}
      onClick={() => setFocusedScopeItem(scopeItem)}
      className="mb-2 cursor-pointer bg-gray-50 rounded-md border border-gray-50 p-2 hover:bg-gray-100 transition-colors duration-200 ease-in-out hover:border-gray-200"
    >
      <div className="flex flex-row gap-4">
        {scopeItem.cameraEntity && (
          <div className="flex flex-col gap-2">
            <div className="relative">
              <div className="absolute right-1 top-3">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      className="text-white"
                      size="sm"
                      isIconOnly
                      variant="light"
                    >
                      <FontAwesomeIcon
                        className="w-4 h-4"
                        icon={faWandMagicSparkles}
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="faded"
                    aria-label="Dropdown menu with description"
                  >
                    <DropdownSection title="Actions" showDivider>
                      {scopeItem.id ==
                      "8a1cd81a-d176-7351-a146-91dc507adb4a" ? (
                        <DropdownItem
                          key="new"
                          description="Schedule HVAC Inspection"
                        >
                          Scheudule
                        </DropdownItem>
                      ) : (
                        <DropdownItem
                          key="new"
                          description="Pick a new refrigerator"
                        >
                          Replace
                        </DropdownItem>
                      )}
                      {scopeItem.id ==
                      "8a1cd81a-d176-7351-a146-91dc507adb4a" ? (
                        <DropdownItem
                          key="new"
                          description="Add to renovation scope"
                        >
                          Clean
                        </DropdownItem>
                      ) : (
                        <DropdownItem
                          key="copy"
                          description="Add to renovation scope"
                        >
                          Repair
                        </DropdownItem>
                      )}
                    </DropdownSection>
                    <DropdownSection>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        description="Ignore Recommenation"
                      >
                        Ignore
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <img
              className="rounded-md"
              src={scopeItem.cameraEntity?.imageUrl}
            />
            {scopeItem.id == "8a1cd81a-d176-7351-a146-91dc507adb4a" ? (
              <Chip size="sm" color="danger">
                Safety Hazard
              </Chip>
            ) : (
              <Chip size="sm" color="warning">
                Recommended
              </Chip>
            )}
            <div className="rounded-md">{scopeItem.description}</div>
          </div>
        )}
      </div>
    </div>
  );
};
