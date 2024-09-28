import { defineEventHandler } from 'h3'
import { sampleCompanies } from '../../data/sampleCompanies'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing company ID',
        })
    }

    const company = sampleCompanies.find((c) => c.id === parseInt(id))

    if (!company) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Company not found',
        })
    }
    return company
})
