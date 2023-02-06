import { useState } from "react";

const useLoading = (loading: boolean = false) => {
  const [isLoading, setIsLoading] = useState(loading);

  return {
    isLoading,
    setIsLoading
  };
};

export default useLoading;
