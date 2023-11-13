import { NextApiRequest } from 'next'
import { SizeProduct } from '@prisma/client'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
import { removeMark } from '@/ultis/dataConvert'

interface BodyProps {
	name: string
	productBrandId: string
	images: string[]
	description: string
	code: string
	seo: string
	keywords: string
	sizeProduct: SizeProduct[]
}
export default async function createProduct(req: NextApiRequest) {
	const { name, code, productBrandId, keywords, images, description, sizeProduct, seo } = JSON.parse(
		req.body
	) as BodyProps
	const minPrice = Math.min(...sizeProduct.map(s => s.price))
	try {
		await prisma.product.create({
			data: {
				name,
				code,
				seo,
				keywords,
				productBrandId: Number(productBrandId),
				images: JSON.stringify(images),
				description,
				minPrice,
				sizeProduct: {
					create: sizeProduct.map(item => item)
				}
			}
		})

		return {
			ok: true,
			data: true,
			msg: 'Tạo sản phẩm thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: create.ts:43 ~ createProduct ~ error:', error)
		return null
	}
}
