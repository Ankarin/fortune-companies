import { or, ilike, asc } from "drizzle-orm";
import { db } from "~/server/db/db";
import { Companies } from "~/server/db/schema";
import { defineEventHandler, getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.search as string | undefined;

  try {
    let results;
    if (!search || search.trim() === "") {
      results = await db
        .select()
        .from(Companies)
        .orderBy(asc(Companies.rank))
        .limit(100);
    } else {
      results = await db
        .select()
        .from(Companies)
        .where(
          or(
            ilike(Companies.company, `%${search}%`),
            ilike(Companies.ticker, `%${search}%`),
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
