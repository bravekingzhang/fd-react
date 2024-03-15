import useSWR from "swr";
import { httpClient } from "@/utils/request";
import { NewItem } from "./types";

export const useFetchHotNews = (type: string) => {
  const { data, error, isLoading, isValidating } = useSWR(
    `/ggapi/new?type=${type}`,
    (url) =>
      httpClient.get<{ list: NewItem[] }>(url, {
        successCode: 200,
      })
  );
  return {
    hotNews: data?.list,
    error,
    isLoading,
    isValidating,
  };
};
