import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
export default async function searchOrder(req: NextApiRequest) {
	const { label, page = 1, pageSize = 10 } = req.query
	const lowercaseLabel = label?.toString()?.toLowerCase() ?? ''
	console.log("🚀 ~ file: search.ts:8 ~ searchRole ~ lowercaseLabel:", lowercaseLabel)

	try {
		const filteredOrders = await prisma.order.findMany({
			include: {
				orderCustomerInfo: {
					select: {
						name: true,
						phone: true,
					},
				}
			},
			orderBy: {
				id: 'asc',
			},
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		})
		console.log('🚀 ~ file: search.ts:21 ~ searchRole ~ filteredOrders:', filteredOrders)

		const totalCount = await prisma.order.count({})

		return {
			ok: true,
			data: {
				dataTable: filteredOrders,
				paging: {
					page: Number(page),
					pageSize: Number(pageSize)
				},
				totalCount
			},
			msg: 'OK'
		}
	} catch (error) {
		console.log("🚀 ~ file: search.ts:47 ~ searchOrder ~ error:", error)
		return null
	}
}