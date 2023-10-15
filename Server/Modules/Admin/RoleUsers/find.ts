import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

export default async function findProduct(req: NextApiRequest) {
	const id = req.query.id as string
	try {
		const product = await prisma.product.findUnique({
			where: { id: Number(id) }
		})

		return {
			ok: true,
			data: product,
			msg: 'ok'
		}
	} catch (error) {
		console.log('🚀 ~ file: find.ts:26 ~ createProduct ~ error:', error)
		return null
	}
}
