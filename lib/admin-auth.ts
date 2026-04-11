import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/service";

function getAllowedAdminEmails() {
  const raw = process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "";

  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export type AuthorizedAdmin = {
  id: string;
  email: string;
};

export async function authorizeAdminRequest(request: NextRequest): Promise<{
  admin: AuthorizedAdmin | null;
  response: NextResponse | null;
}> {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return {
      admin: null,
      response: NextResponse.json({ error: "Missing bearer token." }, { status: 401 }),
    };
  }

  const token = authHeader.slice("Bearer ".length).trim();

  if (!token) {
    return {
      admin: null,
      response: NextResponse.json({ error: "Invalid bearer token." }, { status: 401 }),
    };
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user || !data.user.email) {
    return {
      admin: null,
      response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }),
    };
  }

  const allowedEmails = getAllowedAdminEmails();
  const email = data.user.email.toLowerCase();

  // If no allowlist is configured, any authenticated user can access /admin.
  // If ADMIN_EMAILS is configured, only those emails are permitted.
  if (allowedEmails.length > 0 && !allowedEmails.includes(email)) {
    return {
      admin: null,
      response: NextResponse.json(
        { error: `Forbidden. Signed-in user ${data.user.email} is not in ADMIN_EMAILS.` },
        { status: 403 }
      ),
    };
  }

  return {
    admin: {
      id: data.user.id,
      email: data.user.email,
    },
    response: null,
  };
}
