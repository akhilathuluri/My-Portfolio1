import { createServiceRoleClient } from "./supabase/service";

export async function checkStrictRateLimit(ip: string, limit: number = 10, windowMs: number = 24 * 60 * 60 * 1000): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const supabase = createServiceRoleClient();
    const now = new Date();

    // Fetch the current record
    const { data: record, error: fetchError } = await supabase
      .from("api_rate_limits")
      .select("*")
      .eq("ip_address", ip)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // Ignore "Row not found" error
      console.error("Rate limit fetch error:", fetchError);
      return { allowed: true, remaining: 1 }; // Default to allow if DB fails
    }

    if (!record) {
      // First time this IP is seen, insert a new record
      const resetAt = new Date(now.getTime() + windowMs);
      await supabase.from("api_rate_limits").insert({
        ip_address: ip,
        usage_count: 1,
        reset_at: resetAt.toISOString(),
      });
      return { allowed: true, remaining: limit - 1 };
    }

    const resetTime = new Date(record.reset_at);

    if (now > resetTime) {
      // Time window expired, reset the count
      const newResetAt = new Date(now.getTime() + windowMs);
      await supabase
        .from("api_rate_limits")
        .update({
          usage_count: 1,
          reset_at: newResetAt.toISOString(),
        })
        .eq("ip_address", ip);
      return { allowed: true, remaining: limit - 1 };
    }

    // Still within the time window
    if (record.usage_count >= limit) {
      return { allowed: false, remaining: 0 };
    }

    // Increment the count
    await supabase
      .from("api_rate_limits")
      .update({
        usage_count: record.usage_count + 1,
      })
      .eq("ip_address", ip);

    return { allowed: true, remaining: limit - record.usage_count - 1 };
  } catch (error) {
    console.error("Rate limit check error:", error);
    // Fail open in case of DB connection issues
    return { allowed: true, remaining: 1 };
  }
}
