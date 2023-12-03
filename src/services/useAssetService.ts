import { useQuery, useMutation, UseQueryResult, UseMutationResult } from 'react-query';
import { useHttpClient } from './useHttpClient';
import { Asset } from '../models/Asset';

export interface IAssetService {
    getAssetsQuery: UseQueryResult<Asset[], unknown>;
    addAssetMutation: UseMutationResult<Asset, unknown, Asset, unknown>;
}

export const useAssetService = (): IAssetService => {
    const httpClient = useHttpClient(import.meta.env.VITE_SUPERTAPE_API_BASEURL);

    const getAssetsQuery = useQuery<Asset[], unknown>('assets', async () => {
        const response = await httpClient.get('/assets');
        return response.data;
    });

    const addAssetMutation = useMutation<Asset, unknown, Asset, unknown>(async (newAsset) => {
        const response = await httpClient.post('/assets', newAsset);
        return response.data;
    });

    return {
        getAssetsQuery,
        addAssetMutation
    };
};
