import { ReactElement } from "react";

interface IPageHeader {
    children: ReactElement;
}

export const PageHeader = ({ children } : IPageHeader) => {
    return (
        <div className="border-b-1 border-b-slate-200 p-8">
            {children}
        </div>
    )
}