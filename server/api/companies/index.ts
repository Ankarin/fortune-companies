import { or, ilike, asc, count } from "drizzle-orm";
import { db } from "~/server/db/db";
import { Companies } from "~/server/db/schema";
import { defineEventHandler, getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.search as string | undefined;
  const page = parseInt(query.page as string) || 1;
  const pageSize = 50;
  const offset = (page - 1) * pageSize;

  try {
    let results;
    let totalCount;

    const selectedFields = {
      id: Companies.id,
      ceo: Companies.ceo,
      company: Companies.company,
      companyType: Companies.companyType,
      industry: Companies.industry,
      headquartersState: Companies.headquartersState,
      headquartersCity: Companies.headquartersCity,
      marketCapMarch28M: Companies.marketCapMarch28M,
      numberOfEmployees: Companies.numberOfEmployees,
      profitable: Companies.profitable,
      profitsM: Companies.profitsM,
      revenuesM: Companies.revenuesM,
      sector: Companies.sector,
      ticker: Companies.ticker,
      website: Companies.website,
      rank: Companies.rank,
    };

    if (!search || search.trim() === "") {
      results = await db
        .select(selectedFields)
        .from(Companies)
        .orderBy(asc(Companies.rank))
        .limit(pageSize)
        .offset(offset);

      totalCount = await db.select({ count: count() }).from(Companies);
    } else {
      const searchCondition = or(
        ilike(Companies.company, `%${search}%`),
        ilike(Companies.ticker, `%${search}%`),
      );

      results = await db
        .select(selectedFields)
        .from(Companies)
        .where(searchCondition)
        .orderBy(asc(Companies.rank))
        .limit(pageSize)
        .offset(offset);

      totalCount = await db
        .select({ count: count() })
        .from(Companies)
        .where(searchCondition);
    }

    return {
      companies: results,
      total: totalCount[0].count,
      nextPage: results.length === pageSize ? page + 1 : null,
    };
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
