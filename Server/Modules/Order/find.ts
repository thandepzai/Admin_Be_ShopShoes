import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'

export default async function findOrder(req: NextApiRequest) {
	let id = req.query.id as string
	const checkIsCode = () => {
		return /[a-zA-Z]/.test(id)
	}
	if (checkIsCode()) {
		const getIdOrder = await prisma.order.findUnique({
			where: { code: id },
			select: {
				id: true
			}
		})
		id = String(getIdOrder?.id)
	}

	try {
		const order = await prisma.order.findUnique({
			where: { id: Number(id) },
			select: {
				id: true,
				status: true,
				note: true,
				code: true
			}
		})
		const listProduct = await prisma.orderProduct.findMany({
			where: { orderId: Number(id) },
			select: {
				id: true,
				quantity: true,
				SizeProduct: {
					select: {
						id: true,
						size: true,
						price: true,
						Product: {
							select: {
								id: true,
								name: true,
								images: true
							}
						}
					}
				}
			}
		})

		let totalCount = 0
		listProduct.forEach(product => {
			totalCount += product.quantity * product.SizeProduct.price
		})

		const customer = await prisma.orderCustomerInfo.findUnique({
			where: { orderId: Number(id) }
		})

		const payment = await prisma.orderPayment.findUnique({
			where: { orderId: Number(id) }
		})

		const shipping = await prisma.orderShipping.findUnique({
			where: { orderId: Number(id) }
		})

		return {
			ok: true,
			data: { listProduct, order, customer, payment, totalCount, shipping },
			msg: 'ok'
		}
	} catch (error) {
		console.log('🚀 ~ file: find.ts:22 ~ findOrder ~ error:', error)
		return null
	}
}
