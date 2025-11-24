"use client";

import { ReactNode, useState } from "react";
import { trpc, createTRPCClient } from "@/shared/api/trpc-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function TrpcProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => createTRPCClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
