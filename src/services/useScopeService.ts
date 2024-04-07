import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "react-query";
import { useHttpClient } from "./useHttpClient";
import { Scope } from "../models/Scope";

export interface IScopeService {
  getScopesByAssetId: (assetId: string) => UseQueryResult<Scope[], unknown>;
  //getAssetsQuery: UseQueryResult<Asset[], unknown>;
  //getAssetByIdQuery: (assetId: string) => UseQueryResult<Asset, unknown>;
  //addAssetMutation: UseMutationResult<Asset, unknown, Asset, unknown>;
}

export const useScopeService = (): IScopeService => {
  const httpClient = useHttpClient(import.meta.env.VITE_SUPERTAPE_API_BASEURL);

  const getScopesByAssetId = (assetId: string) =>
    useQuery<Scope[], unknown>(["scopes", assetId], async () => {
      const response = await httpClient.get(`/assets/${assetId}/scopes`);
      return response.data;
    });

  return {
    getScopesByAssetId,
  };
};
