import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

export default async function findProductBrand(req: NextApiRequest) {
	const id = req.query.id as string
	try {
		const brand = await prisma.productBrand.findUnique({
			where: { id: Number(id) }
		})

		return {
			ok: true,
			data: brand,
			msg: 'ok'
		}
	} catch (error) {
		console.log("🚀 ~ file: find.ts:19 ~ findBrand ~ error:", error)
		return null
	}
}
