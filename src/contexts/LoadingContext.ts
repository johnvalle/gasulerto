import React, { SetStateAction } from "react";

export const LoadingContext = React.createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}>({ isLoading: false, setIsLoading: () => {} });
