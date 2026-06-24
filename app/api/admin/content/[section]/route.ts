import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { authorizeAdminRequest } from "@/lib/admin-auth";
import { editableSectionKeys, type EditableSectionKey } from "@/lib/portfolio-sections";
import { createServiceRoleClient } from "@/lib/supabase/service";
import type { Database, Json } from "@/lib/supabase/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isEditableSection(value: string): value is EditableSectionKey {
  return editableSectionKeys.includes(value as EditableSectionKey);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { response } = await authorizeAdminRequest(request);

  if (response) {
    return response;
  }

  const resolvedParams = await params;
  const section = resolvedParams.section;

  if (!isEditableSection(section)) {
    return NextResponse.json({ error: "Invalid section." }, { status: 400 });
  }

  const body = (await request.json().catch(() => null)) as { content?: unknown } | null;

  if (!body || body.content === undefined) {
    return NextResponse.json({ error: "Missing content payload." }, { status: 400 });
  }

  try {
    const supabase = createServiceRoleClient();
    const payload: Database["public"]["Tables"]["portfolio_sections"]["Insert"] = {
      section_key: section,
      content: body.content as Json,
    };

    const { error } = await supabase.from("portfolio_sections").upsert(
      payload,
      {
        onConflict: "section_key",
      }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
