import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'
export default async function findProductPublic(req: NextApiRequest) {
	const { id } = req.query

	try {
		const product = await prisma.product.findUnique({
			where: { id: Number(id) },
			include: {
				sizeProduct: {
					orderBy: {
						size: 'asc'
					},
					where: {
						quantity: {
							gt: 0
						}
					}
				}
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
