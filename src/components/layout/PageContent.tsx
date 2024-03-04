import clsx from "clsx";
import { ReactElement } from "react";

interface IPageContent {
  children: ReactElement;
  className?: string;
}

export const PageContent = ({ children, className }: IPageContent) => {
  return (
    <div className={clsx(className ? className : "container mx-auto p-8")}>
      {children}
    </div>
  );
};
