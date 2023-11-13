import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

export default async function removeBrand(req: NextApiRequest) {
	const id = req.query.id as string
	
	try {
		await prisma.productBrand.update({
			where: { id: Number(id) },
			data: {
        deleted: 1
			}
		})

		await prisma.product.updateMany({
			where: { 
				productBrandId: Number(id)
			 },
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
		console.log('🚀 ~ file: edit.ts:40 ~ createBrand ~ error:', error)
		return null
	}
}