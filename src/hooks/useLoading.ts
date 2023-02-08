import { useState } from "react";

export const useLoading = (loading: boolean = false) => {
  const [isLoading, setIsLoading] = useState(loading);

  return {
    isLoading,
    setIsLoading
  };
};
