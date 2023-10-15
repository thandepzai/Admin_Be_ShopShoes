import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
export default async function findProductPublic(req: NextApiRequest) {
	const { id } = req.query

	try {
		const product = await prisma.product.findUnique({
			where: { id: Number(id) },
			include: {
				sizeProduct: true
			}
		})

		return {
			ok: true,
			data: { product },
			msg: 'OK'
		}
	} catch (error) {
		console.log('🚀 ~ file: search.ts:61 ~ createProduct ~ error:', error)
		return null
	}
}
