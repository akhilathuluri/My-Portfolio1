export const editableSectionKeys = ["about", "expertise", "experience", "projects", "blog"] as const;

export type EditableSectionKey = (typeof editableSectionKeys)[number];
export type PortfolioData = typeof import("@/lib/data").portfolioData;
export type EditableSections = Pick<PortfolioData, EditableSectionKey>;
