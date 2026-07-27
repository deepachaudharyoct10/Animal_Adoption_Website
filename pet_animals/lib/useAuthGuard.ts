"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "./apiClient";

export function useAuthGuard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    // Client-only auth check: intentionally patches state after mount to avoid
    // an SSR/client hydration mismatch (localStorage isn't available on the server).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [router]);

  return ready;
}
