import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

export default async function searchProductBrand(req: NextApiRequest) {
	const { label, page = 1, pageSize = 10 } = req.query
	const lowercaseName = label ? label.toString().toLowerCase() : ''

	try {
		const filteredProductBrands = await prisma.productBrand.findMany({
			where: {
				name: {
					contains: lowercaseName,
					mode: 'insensitive'
				},
				deleted: 0
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		})

		const totalCount = await prisma.productBrand.count({
			where: {
				name: {
					contains: lowercaseName,
					mode: 'insensitive'
				},
				deleted: 0
			}
		})

		return {
			ok: true,
			data: {
				dataTable: filteredProductBrands,
				paging: {
					page: Number(page),
					pageSize: Number(pageSize)
				},
				totalCount
			},
			msg: 'OK'
		}
	} catch (error) {
		console.log("🚀 ~ file: search.ts:43 ~ searchProductBrand ~ error:", error)
		return null
	}
}
