import { unstable_noStore as noStore } from "next/cache";
import { portfolioData } from "@/lib/data";
import {
  editableSectionKeys,
  type EditableSectionKey,
  type EditableSections,
  type PortfolioData,
} from "@/lib/portfolio-sections";
import { createServiceRoleClient } from "@/lib/supabase/service";

type PortfolioSectionRow = {
  section_key: EditableSectionKey;
  content: unknown;
};

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function getDefaultEditableSections(): EditableSections {
  return {
    about: deepClone(portfolioData.about),
    expertise: deepClone(portfolioData.expertise),
    experience: deepClone(portfolioData.experience),
    projects: deepClone(portfolioData.projects),
    blog: deepClone(portfolioData.blog),
  };
}

export async function getPortfolioData(): Promise<PortfolioData> {
  noStore();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return deepClone(portfolioData);
  }

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("portfolio_sections")
      .select("section_key, content")
      .in("section_key", editableSectionKeys)
      .returns<PortfolioSectionRow[]>();

    if (error || !data) {
      return deepClone(portfolioData);
    }

    const merged = deepClone(portfolioData);

    for (const row of data) {
      if (editableSectionKeys.includes(row.section_key)) {
        (merged[row.section_key] as unknown) = row.content;
      }
    }

    return merged;
  } catch {
    return deepClone(portfolioData);
  }
}
