import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import findProductBrand from '@/Server/Modules/ProductBrand/find'
import removeBrand from '@/Server/Modules/ProductBrand/remove'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: any
	if (req.method === METHOD.GET) {
		response = await findProductBrand(req)
	}
	
	if (req.method === METHOD.DELETE) {
		response = await removeBrand(req)
	}

	if (response) {
		return res.status(STATUS_CODE.OK).json({ ok: response?.ok ?? false, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'internal' })
}