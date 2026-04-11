import { NextRequest, NextResponse } from "next/server";
import { authorizeAdminRequest } from "@/lib/admin-auth";
import { getDefaultEditableSections } from "@/lib/portfolio-content";
import { editableSectionKeys, type EditableSectionKey } from "@/lib/portfolio-sections";
import { createServiceRoleClient } from "@/lib/supabase/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PortfolioSectionRow = {
  section_key: EditableSectionKey;
  content: unknown;
};

export async function GET(request: NextRequest) {
  const { admin, response } = await authorizeAdminRequest(request);

  if (response) {
    return response;
  }

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("portfolio_sections")
      .select("section_key, content")
      .in("section_key", editableSectionKeys)
      .returns<PortfolioSectionRow[]>();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const sections = getDefaultEditableSections();

    for (const row of data ?? []) {
      if (editableSectionKeys.includes(row.section_key)) {
        (sections[row.section_key] as unknown) = row.content;
      }
    }

    return NextResponse.json({
      user: admin,
      sections,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
