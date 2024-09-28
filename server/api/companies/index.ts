import { eq, or, ilike, asc } from "drizzle-orm";
import { db } from "~/server/db/db";
import { Companies } from "~/server/db/schema";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event).query;
  console.log(query);

  try {
    let results;
    if (typeof query !== "string" || query.trim() === "") {
      results = await db
        .select()
        .from(Companies)
        .orderBy(asc(Companies.rank))
        .limit(100);
    } else {
      console.log("Query:", query);
      results = await db
        .select()
        .from(Companies)
        .where(
          or(
            ilike(Companies.company, `%${query}%`),
            ilike(Companies.ticker, `%${query}%`),
          ),
        )
        .orderBy(asc(Companies.rank))
        .limit(100);
    }
    return results;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
