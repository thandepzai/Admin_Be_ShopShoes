import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'

interface BodyProps {
	name: string
	note: string
	orderId: string
	status: string
	code : string
}
export default async function shippingOrder(req: NextApiRequest) {
	const { name, note, orderId, status, code } = JSON.parse(req.body) as BodyProps
	try {
    const existingOrder = await prisma.order.findUnique({
      where: { id: Number(orderId) },
    });

    if (existingOrder?.status === "SHIPPING") {
      return {
        ok: false,
        data: null,
        msg: `Đơn hàng  ${orderId} đã xác nhận giao rồi`,
      };
    }
		await prisma.orderShipping.create({
			data: {
				name,
				note,
				code,
				orderId:  Number(orderId),
				status: 'Đang giao'
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
			msg: `Đơn hàng sang trạng thái giao thành công`
		}
	} catch (error) {
		console.log("🚀 ~ file: shipping.ts:50 ~ shippingOrder ~ error:", error)
		return null
	}
}