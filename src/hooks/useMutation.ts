import { mutate } from "@aboulman/swr";
import { useCallback, useContext } from "react";
import { RequireContext } from "../context/RequireContext";
import { UseApiFetcher } from "../types/UseApi";

export function useMutation<T>(key: any, fetcher: UseApiFetcher<T>) {
  const { ccConstants, $RestClient, miRestClient } = useContext(RequireContext);

  const mutateCallback = useCallback(
    (url?: string, data?: any, params?: any): any => async () => {
      const remoteData = await fetcher({ ccConstants, $RestClient, miRestClient, url, params, data });
      mutate(key, remoteData);
    },
    // eslint-disable-next-line
    [key],
  );

  if (key) {
    // mutateCallback
    return mutateCallback;
  }

  return (url?: string, data?: any, params?: any): any =>
    fetcher({ ccConstants, $RestClient, miRestClient, url, params, data });
}
