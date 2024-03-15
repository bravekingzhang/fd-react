import useSWR from "swr";
import { httpClient } from "@/utils/request";
import { TodoItem } from "./types";
export const useFetchTodos = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    `/api/todos`,
    (url) => httpClient.get<TodoItem[]>(url)
  );
  return {
    todos: data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};
