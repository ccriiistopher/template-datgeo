import { CircularProgress } from "@mui/material";
import React from "react";

type Props = {
  loading: boolean;
};

export function Loader({ loading }: Props) {
  return (
    loading && (
      <div className="absolute w-full h-full z-50 bg-opacity-50 bg-black top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <CircularProgress />
      </div>
    )
  );
}
