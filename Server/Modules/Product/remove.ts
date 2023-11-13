import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

export default async function removeProduct(req: NextApiRequest) {
	const id = req.query.id as string
	
	try {
		await prisma.product.update({
			where: { id: Number(id) },
			data: {
        deleted: 1
			}
		})

		return {
			ok: true,
			data: 'OK',
			msg: 'Xóa sản phẩm thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: edit.ts:40 ~ createProduct ~ error:', error)
		return null
	}
}