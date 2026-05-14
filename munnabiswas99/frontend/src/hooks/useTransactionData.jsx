import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useTransactionData = () => {
  const axiosSecure = useAxiosSecure();
  const { data: transactionData = [], refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/transactions");
      return res.data;
    },
  });
  return {
    transactionData,
    refetch,
  };
};

export default useTransactionData;
