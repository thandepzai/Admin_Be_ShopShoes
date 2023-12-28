import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import statusOrder from '@/Server/Modules/Order/status'

interface BodyRequest {
	id: number
	status: 'CONFIRM' | 'CANCELED' | 'SHIPPING' | 'DONE'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: any
	const { canceledOrder, confirmOrder, doneOrder, shippingOrder } = statusOrder

	if (req.method !== METHOD.PATCH) {
		return res.status(STATUS_CODE.INVALID_METHOD).json({ ok: false, data: null, msg: 'Method not allow' })
	}

	const { status } = JSON.parse(req.body) as BodyRequest

	if (status === 'CANCELED') {
		response = await canceledOrder(req)
	} else if (status === 'CONFIRM') {
		response = await confirmOrder(req)
	} else if (status === 'DONE') {
		response = await doneOrder(req)
	} else {
		response = await shippingOrder(req)
	}

	if (response) {
		return res.status(STATUS_CODE.OK).json({ ok: response?.ok ?? false, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'internal' })
}
