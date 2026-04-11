import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

let serviceClient: ReturnType<typeof createClient<Database>> | null = null;

function getServiceEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  }

  return { url, serviceRoleKey };
}

export function createServiceRoleClient() {
  if (!serviceClient) {
    const { url, serviceRoleKey } = getServiceEnv();

    serviceClient = createClient<Database>(url, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return serviceClient;
}
