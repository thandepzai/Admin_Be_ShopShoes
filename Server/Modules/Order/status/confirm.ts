import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'

interface BodyProps {
	orderId: string
	status: string
}
export default async function confirmOrder(req: NextApiRequest) {
	const { orderId, status } = JSON.parse(req.body) as BodyProps
	try {
    const existingOrder = await prisma.order.findUnique({
      where: { id: Number(orderId) },
    });

    if (existingOrder?.status === "CONFIRM") {
      return {
        ok: false,
        data: null,
        msg: `Đơn hàng  ${orderId} đã được xác nhận rồi`,
      };
    }

		const updateOrder = await prisma.order.update({
			where: { id: Number(orderId) },
			data: { status }
		})

		return {
			ok: true,
			data: updateOrder,
			msg: `Xác nhận đơn hàng thành công`
		}
	} catch (error) {
		console.log("🚀 ~ file: confirm.ts:50 ~ confirmOrder ~ error:", error)
		return null
	}
}