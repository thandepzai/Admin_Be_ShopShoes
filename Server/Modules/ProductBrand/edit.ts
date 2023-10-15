import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

interface BodyProps {
	id: string
	name: string
	images: string[]
	description: string
}
export default async function editProductBrand(req: NextApiRequest) {
	const { id, name, images, description } = JSON.parse(req.body) as BodyProps
	console.log("🚀 ~ file: edit.ts:12 ~ editProductBrand ~ id, name, images, description:", id, name, images, description)
	try {
		await prisma.productBrand.update({
			where: { id: Number(id) },
			data: {
				name,
				images: JSON.stringify(images),
				description
			}
		})

		return {
			ok: true,
			data: 'OK',
			msg: 'Chỉnh sửa hãng sản phẩm thành công'
		}
	} catch (error) {
		console.log('🚀 ~ file: edit.ts:40 ~ createProduct ~ error:', error)
		return null
	}
}
