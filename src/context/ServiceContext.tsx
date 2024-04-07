import { ReactNode, createContext, useContext } from "react";
import { IAssetService, useAssetService } from "../services/useAssetService";
import { IScopeService, useScopeService } from "../services/useScopeService";

interface IServiceContext {
  assetService: IAssetService;
  scopeService: IScopeService;
}

interface IServiceProvider {
  children: ReactNode;
}

const ServiceContext = createContext<IServiceContext>({} as IServiceContext);

export const useServices = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }: IServiceProvider) => {
  const assetService = useAssetService();
  const scopeService = useScopeService();

  return (
    <ServiceContext.Provider value={{ assetService, scopeService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;
