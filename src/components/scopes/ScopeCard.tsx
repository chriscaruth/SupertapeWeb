import { Scope } from "../../models/Scope";
import { ScopeItemsList } from "./ScopeItemsList";

interface ScopeProps {
  scope: Scope;
}

export const ScopeCard = ({ scope }: ScopeProps) => {
  return (
    <div>
      <ScopeItemsList scopeItems={scope.scopeItems} />
    </div>
  );
};
