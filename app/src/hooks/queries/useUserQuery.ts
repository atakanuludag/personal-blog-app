"use client";

// ** third party
import { useQuery } from "@tanstack/react-query";

// ** services
import UserService from "@/services/UserService";

// ** config
import { QUERY_NAMES } from "@/config";

export default function useUserQuery() {
  const service = UserService;
  const queryName = QUERY_NAMES.USER;

  const useUserProfileQuery = (token: string) =>
    useQuery({
      queryKey: [queryName, token],
      queryFn: service.getProfile,
    });

  return {
    useUserProfileQuery,
  };
}
