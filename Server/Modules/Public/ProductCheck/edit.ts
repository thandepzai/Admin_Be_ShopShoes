import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

interface BodyProps {
	listCodeProduct: []
}

export default async function searchProductRemove(req: NextApiRequest) {
	const { listCodeProduct } = JSON.parse(req.body) as BodyProps

	const listCodeResponse: string[] = []
	const promises = await Promise.all(
		listCodeProduct.map(async (item: string) => {
			const isDelete = await prisma.product.findFirst({
				where: {
					code: item,
					deleted: 1
				}
			})
			if (isDelete !== null) listCodeResponse.push(item)
			return isDelete
		})
	)

	return {
		ok: true,
		data: {
			dataTable: listCodeResponse
		},
		msg: 'OK'
	}
}
