import { eq } from "drizzle-orm";
import { defineEventHandler, createError } from "h3";
import { db } from "~/server/db/db";
import { Companies } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing company ID",
    });
  }

  const company = await db
    .select()
    .from(Companies)
    .where(eq(Companies.id, id))
    .limit(1);

  if (!company || company.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Company not found",
    });
  }

  return company[0];
});
