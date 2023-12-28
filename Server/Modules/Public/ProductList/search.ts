import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'

export default async function searchProductListPublic(req: NextApiRequest) {
	const { page, pageSize, currentPath, sorted } = req.query
	const parts = currentPath ? currentPath.toString().split('/') : []
	const sort = sorted ? sorted.toString() : ''

	let orderBy = {}
	switch (sort) {
		case 'new':
			orderBy = { createdAt: 'desc' }
			break
		case 'cheap':
			orderBy = { minPrice: 'asc' }
			break
		case 'expensive':
			orderBy = { minPrice: 'desc' }
			break
		case 'popular':
			orderBy = { view: 'desc' }
			break
	}

	if (parts[1] === 'danh-muc') {
		const lowercaseBrand = decodeURIComponent(parts[2]).toLowerCase()
		try {
			const filteredProducts = await prisma.product.findMany({
				where: {
					ProductBrand: {
						name: { contains: lowercaseBrand, mode: 'insensitive' }
					},
					deleted: 0
				},
				include: {
					sizeProduct: true
				},
				orderBy,
				skip: (Number(page) - 1) * Number(pageSize),
				take: Number(pageSize)
			})

			const totalCount = await prisma.product.count({
				where: {
					ProductBrand: {
						name: {
							contains: lowercaseBrand,
							mode: 'insensitive'
						}
					}
				}
			})

			return {
				ok: true,
				data: {
					dataTable: filteredProducts,
					paging: {
						page: Number(page),
						pageSize: Number(pageSize)
					},
					totalCount
				},
				msg: 'OK'
			}
		} catch (error) {
			console.log('🚀 ~ file: search.ts:13 ~ searchProductListPublic ~ error:', error)
			return null
		}
	}

	const lowercaseName = decodeURIComponent(parts[2]).toLowerCase()
	try {
		const filteredProducts = await prisma.product.findMany({
			where: {
				name: {
					contains: lowercaseName,
					mode: 'insensitive'
				},
				deleted: 0
			},
			include: {
				sizeProduct: true
			},
			orderBy,
			skip: (Number(page) - 1) * Number(pageSize),
			take: Number(pageSize)
		})

		const totalCount = await prisma.product.count({
			where: {
				name: {
					contains: lowercaseName,
					mode: 'insensitive'
				}
			}
		})

		return {
			ok: true,
			data: {
				dataTable: filteredProducts,
				paging: {
					page: Number(page),
					pageSize: Number(pageSize)
				},
				totalCount
			},
			msg: 'OK'
		}
	} catch (error) {
		console.log('🚀 ~ file: search.ts:44 ~ searchProductPublic ~ error:', error)
		return null
	}
}
