import { NextApiRequest } from 'next'

import { prisma } from '@/services/prisma'

interface ProductPopular {
	id: number
	quantity: number
	images: string
	name: string
}

export default async function searchDataDashboard(req: NextApiRequest) {
	try {
		//Lấy sản phẩm tháng này
		const currentDate = new Date()
		const currentMonth = currentDate.getMonth() + 1

		const orders = await prisma.order.findMany({
			where: {
				createdAt: {
					gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1),
					lt: new Date(currentDate.getFullYear(), currentMonth, 1)
				},
				status: 'DONE'
			},
			select: {
				orderPayment: {
					select: {
						amount: true
					}
				},
				orderProduct: {
					select: {
						quantity: true,
						SizeProduct: {
							select: {
								Product: true
							}
						}
					}
				}
			}
		})

		// Lẩy tổng doang thu theo tháng
		const totalRevenue = orders.reduce((sum, order) => {
			const orderPayment = order.orderPayment
			if (orderPayment !== null && orderPayment.amount !== null) {
				return sum + orderPayment.amount
			}
			return sum
		}, 0)

		// Lấy tổng số đơn hàng giao thành công
		const totalOrdersDone = await prisma.order.count({
			where: {
				status: 'DONE'
			}
		})

		// Lẩy tổng số đơn hàng đang chờ duyệt
		const totalOrdersWaiting = await prisma.order.count({
			where: {
				status: 'WAITING'
			}
		})

		// Lấy tổng số đơn hàng chờ hoàn tiền
		const totalOrdersRefund = await prisma.order.count({
			where: {
				status: 'REFUND'
			}
		})

		// Lấy danh sách 5 sản phẩm bán chạy nhất
		const listProductPopular = () => {
			const listProduct: ProductPopular[] = []

			orders.forEach(item => {
				const orderProduct = item.orderProduct

				orderProduct.map(value => {
					const productId = value.SizeProduct.Product.id
					const indexProduct = listProduct.findIndex(e => e.id === productId)

					if (indexProduct !== -1) {
						listProduct[indexProduct].quantity += value.quantity
					} else {
						const name = value.SizeProduct.Product.name
						const images = value.SizeProduct.Product.images
						listProduct.push({ id: productId, quantity: value.quantity, images, name })
					}
				})
			})

			listProduct.sort((item1, item2) => item2.quantity - item1.quantity)

			return listProduct.slice(0, 5)
		}

		// Thống kê doanh thu năm
		const listOrderPayment = await prisma.orderPayment.findMany({
			where: {
				createdAt: {
					gte: new Date(currentDate.getFullYear(), 0, 1)
				},
				order: {
					status: 'DONE'
				}
			}
		})

		const revenueStatistics = Array.from({ length: 12 }, (_, i) => ({
			month: i + 1,
			totalAmount: 0
		}))

		listOrderPayment.forEach(orderPayment => {
			const month = orderPayment.createdAt.getMonth()
			revenueStatistics[month].totalAmount += orderPayment.amount
		})

		return {
			ok: true,
			data: {
				totalRevenue,
				totalOrdersDone,
				totalOrdersWaiting,
				totalOrdersRefund,
				revenueStatistics,
				listProductPopular: listProductPopular()
			},
			msg: 'OK'
		}
	} catch (error) {
		console.log('🚀 ~ file: search.ts:146 ~ searchDataDashboard ~ error:', error)
		return null
	}
}
