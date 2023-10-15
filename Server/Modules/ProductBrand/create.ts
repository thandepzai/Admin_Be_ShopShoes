import { NextApiRequest } from 'next'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
import { removeMark } from '@/ultis/dataConvert'

interface BodyProps {
	name: string
	images: string[]
	description: string
}
export default async function createProductBrand(req: NextApiRequest) {
	const { name, images, description } = JSON.parse(req.body) as BodyProps
	try {
		await prisma.productBrand.create({
			data: {
				name,
				images: JSON.stringify(images),
				description
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
