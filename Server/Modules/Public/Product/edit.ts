import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

interface BodyProps {
	pid: string
}

export default async function editProductPublic(req: NextApiRequest) {
	const { pid } = JSON.parse(req.body) as BodyProps
	console.log('🚀 ~ file: edit.ts:10 ~ editProductPublic ~ pid:', pid)

	try {
		const updateViewProduct = await prisma.product.update({
			where: { id: Number(pid) },
			data: {
				view: {
					increment: 1
				}
			}
		})

		return {
			ok: true,
			data: updateViewProduct,
			msg: 'OK'
		}
	} catch (error) {
		console.log('🚀 ~ file: search.ts:44 ~ searchProductPublic ~ error:', error)
		return null
	}
}
