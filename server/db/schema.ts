import {
  pgTable,
  pgSchema,
  serial,
  text,
  bigint,
  uuid,
  doublePrecision,
  integer,
} from "drizzle-orm/pg-core";

const Companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  rank: bigint("Rank", { mode: "number" }),
  company: text("Company"),
  ticker: text("Ticker"),
  sector: text("Sector"),
  industry: text("Industry"),
  profitable: text("Profitable"),
  founderIsCeo: text("Founder_is_CEO"),
  femaleCeo: text("FemaleCEO"),
  growthInJobs: text("Growth_in_Jobs"),
  changeInRank: doublePrecision("Change_in_Rank"),
  gainedInRank: text("Gained_in_Rank"),
  droppedInRank: text("Dropped_in_Rank"),
  newcomerToTheFortune500: text("Newcomer_to_the_Fortune500"),
  global500: text("Global500"),
  worldsMostAdmiredCompanies: text("Worlds_Most_Admired_Companies"),
  bestCompaniesToWorkFor: text("Best_Companies_to_Work_For"),
  numberOfEmployees: bigint("Number_of_employees", { mode: "number" }),
  marketCapMarch28M: doublePrecision("MarketCap_March28_M"),
  revenuesM: doublePrecision("Revenues_M"),
  revenuePercentChange: doublePrecision("RevenuePercentChange"),
  profitsM: doublePrecision("Profits_M"),
  profitsPercentChange: doublePrecision("ProfitsPercentChange"),
  assetsM: doublePrecision("Assets_M"),
  ceo: text("CEO"),
  country: text("Country"),
  headquartersCity: text("HeadquartersCity"),
  headquartersState: text("HeadquartersState"),
  website: text("Website"),
  companyType: text("CompanyType"),
  footnote: text("Footnote"),
  marketCapUpdatedM: doublePrecision("MarketCap_Updated_M"),
  updated: text("Updated"),
});

type Company = typeof Companies.$inferSelect;

type CompanyShort = Pick<
  Company,
  | "id"
  | "ceo"
  | "company"
  | "companyType"
  | "industry"
  | "headquartersState"
  | "headquartersCity"
  | "marketCapMarch28M"
  | "numberOfEmployees"
  | "profitable"
  | "profitsM"
  | "revenuesM"
  | "sector"
  | "ticker"
  | "website"
  | "rank"
>;

export { Companies, Company, CompanyShort };
