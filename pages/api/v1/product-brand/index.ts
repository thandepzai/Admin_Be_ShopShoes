import { NextApiRequest, NextApiResponse } from 'next'
import { METHOD, STATUS_CODE } from '@/const/app-const'
import createProductBrand from '@/Server/Modules/ProductBrand/create'
import editProductBrand from '@/Server/Modules/ProductBrand/edit'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let response: any
	if (req.method === METHOD.POST) {
		response = await createProductBrand(req)
	}

	if (req.method === METHOD.PUT) {
		response = await editProductBrand(req)
	}

	if (response) {
		return res.status(STATUS_CODE.OK).json({ ok: response?.ok ?? false, data: response.data, msg: response.msg })
	}
	return res.status(STATUS_CODE.INTERNAL).json({ ok: false, data: null, msg: 'internal' })
}
