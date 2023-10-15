import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'

interface BodyProps {
	orderId: string
	status: string
}
export default async function doneOrder(req: NextApiRequest) {
	const { orderId, status } = JSON.parse(req.body) as BodyProps

	try {
		const existingOrder = await prisma.order.findUnique({
			where: { id: Number(orderId) }
		})

		if (existingOrder?.status === 'DONE') {
			return {
				ok: false,
				data: null,
				msg: `Đơn hàng  ${orderId} đã hoàn thành rồi`
			}
		}
		
		await prisma.orderShipping.update({
			where: { orderId: Number(orderId) },
			data: {
				status: 'Thành Công'
			}
		})

		await prisma.order.update({
			where: { id: Number(orderId) },
			data: { status }
		})

		const updateOrder = await prisma.order.findUnique({
			where: { id: Number(orderId) },
			select:{
				status: true,
				orderShipping: true,
			}
		})
		return {
			ok: true,
			data: updateOrder,
			msg: `Xác nhận hoàn thành đơn hàng`
		}
	} catch (error) {
		console.log('🚀 ~ file: done.ts:50 ~ doneOrder ~ error:', error)
		return null
	}
}
