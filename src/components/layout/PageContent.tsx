import { ReactElement } from "react";

interface IPageContent {
    children: ReactElement;
}

export const PageContent = ({ children } : IPageContent) => {
    return (
        <div className="container mx-auto p-8">
            {children}
        </div>
    )
}