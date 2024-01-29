import { useInfiniteQuery } from "react-query";

import { authorizationAxiosInstance } from "../../../axios/Axios";

export const useGetAllEventApi= () => {

  const LIMIT=10;
  const fetchData = async ({ pageParam }) => {
    const offset = pageParam || 0;
    try {
      const res = await authorizationAxiosInstance.get(
        `/events?page=${offset}&limit=${LIMIT}`
      );

      const { total_events, events } = res.data;

      return {
        page: Math.floor(offset / LIMIT) + 1, // Calculate the page number based on offset and limit
        pageSize: LIMIT,
        totalItems: total_events,
        totalPages: Math.ceil(total_events / LIMIT),
        items: events,
      };
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };



const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isLoading,
  isSuccess,
  refetch,
} = useInfiniteQuery("all-events", fetchData, {
  getNextPageParam: (lastPage, pages) => {
    return pages.length+1
  },
});



  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isSuccess,
    refetch,

  };
};
