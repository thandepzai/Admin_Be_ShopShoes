import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'
export default async function searchOrders(req: NextApiRequest) {
	const { value } = req.query
	console.log('🚀 ~ file: searchPublic.ts:6 ~ searchOrders ~ req.query:', req.query)
	const stringValue = value?.toString() ?? ''
	if (stringValue !== '') {
		let findOrder = {}
		const checkIsCode = () => {
			return /[a-zA-Z]/.test(stringValue)
		}
		if (checkIsCode()) {
			findOrder = {
				code: stringValue
			}
		} else {
			findOrder = {
				orderCustomerInfo: {
					phone: stringValue
				}
			}
		}

		try {
			const filteredOrders = await prisma.order.findMany({
				where: findOrder,
				include: {
					orderCustomerInfo: true,
					orderPayment: true
				},
				orderBy: {
					id: 'asc'
				}
			})
			console.log('🚀 ~ file: search.ts:21 ~ searchRole ~ filteredOrders:', filteredOrders)

			return {
				ok: true,
				data: {
					dataTable: filteredOrders
				},
				msg: 'OK'
			}
		} catch (error) {
			console.log('🚀 ~ file: search.ts:47 ~ searchOrder ~ error:', error)
			return null
		}
	}
	return null
}
