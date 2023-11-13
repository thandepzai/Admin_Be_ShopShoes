import { NextApiRequest, NextApiResponse } from 'next'
import { STATUS_CODE } from '@/const/app-const'
import statusOrder from '@/Server/Modules/Order/status'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: any
	const { canceledOrder } = statusOrder

	response = await canceledOrder(req)

	if (response) {
		return res.status(STATUS_CODE.OK).json({ ok: response?.ok ?? false, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'internal' })
}
