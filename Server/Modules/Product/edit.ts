import { NextApiRequest } from 'next'
import { SizeProduct } from '@prisma/client'
import { prisma } from '@/services/prisma'

interface BodyProps {
	id: string
	name: string
	productBrandId: string
	images: string[]
	description: string
	code: string
	seo: string
	keywords: string
	sizeProduct: SizeProduct[]
}
export default async function editProduct(req: NextApiRequest) {
	const { id, name, images, description, productBrandId, code, seo, keywords, sizeProduct } = JSON.parse(req.body) as BodyProps
	
	try {
		await prisma.product.update({
			where: { id: Number(id) },
			data: {
				name,
				code,
				seo,
				keywords,
				productBrandId: Number(productBrandId),
				images: JSON.stringify(images),
				description
			}
		})

		await Promise.all(
			sizeProduct.map(async item => {
				const { size, price, quantity } = item
				if (item?.id) {
					await prisma.sizeProduct.update({
						where: { id: item.id },
						data: { size, price, quantity }
					})
					return
				} else {
					await prisma.sizeProduct.create({
						data: { size, price, productId: Number(id), quantity }
					})
					return
				}
			})
		)

		return {
			ok: true,
			data: 'OK',
			msg: 'Chỉnh sửa sản phẩm thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: edit.ts:40 ~ createProduct ~ error:', error)
		return null
	}
}
