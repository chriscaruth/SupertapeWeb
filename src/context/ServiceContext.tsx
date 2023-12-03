import { ReactNode, createContext, useContext } from 'react';
import { IAssetService, useAssetService } from '../services/useAssetService';

interface IServiceContext {
    assetService: IAssetService;
}

interface IServiceProvider {
    children: ReactNode;
}

const ServiceContext = createContext<IServiceContext>({} as IServiceContext);

export const useServices = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }: IServiceProvider) => {
    const assetService = useAssetService();

    return (
        <ServiceContext.Provider value={{ assetService }}>
            {children}
        </ServiceContext.Provider>
    );
};

export default ServiceProvider;