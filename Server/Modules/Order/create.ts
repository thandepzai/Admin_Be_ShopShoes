import { NextApiRequest } from 'next'
import { OrderProduct, Order, OrderCustomerInfo, OrderPayment } from '@prisma/client'
import { STATUS_CODE } from '@/const/app-const'

import { prisma } from '@/services/prisma'
import { removeMark } from '@/ultis/dataConvert'

function generateRandomString() {
	const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const numbers = '0123456789'

	const randomChar = (charset: string) => charset[Math.floor(Math.random() * charset.length)]

	let randomString = randomChar(uppercaseLetters) + randomChar(uppercaseLetters)

	for (let i = 0; i < 8; i++) {
		randomString += randomChar(numbers)
	}

	return randomString
}

interface BodyProps {
	items: OrderProduct[]
	customerInfo: OrderCustomerInfo
	paymentInfo: OrderPayment
}

export default async function createOrder(req: NextApiRequest) {
	const { items, customerInfo, paymentInfo } = JSON.parse(req.body) as BodyProps
	console.log(
		'🚀 ~ file: create.ts:31 ~ createOrder ~ items, customerInfo, paymentInfo:',
		items,
		customerInfo,
		paymentInfo
	)

	try {
		const checkStocking = await Promise.all(
			items.map(async item => {
				const sizeProduct = await prisma.sizeProduct.findUnique({
					where: { id: item.sizeProductId }
				})
				if (sizeProduct && sizeProduct?.quantity >= item.quantity) {
					return { sizeProduct, status: true }
				} else return { sizeProduct, status: false }
			})
		)

		const isAllStocking = checkStocking.every(item => item.status)

		let newCode = ''
		while (1) {
			const randomCode = generateRandomString()
			const checkRandomCode = await prisma.order.findUnique({ where: { code: randomCode } })
			if (!checkRandomCode) {
				newCode = randomCode
				break
			}
		}

		if (isAllStocking) {
			const codeOrder =
				paymentInfo.method === 'online' && paymentInfo.note ? paymentInfo.note.toString() : newCode

			const order = await prisma.order.create({
				data: {
					status: 'WAITING',
					code: codeOrder,
					orderProduct: {
						create: items.map(item => item)
					},
					orderCustomerInfo: {
						create: customerInfo
					},
					orderPayment: {
						create: paymentInfo
					}
				}
			})

			const codeProduct: (string | undefined)[] = []
			await Promise.all(
				items.map(async item => {
					await prisma.sizeProduct.update({
						where: { id: item.sizeProductId },
						data: { quantity: { decrement: item.quantity } }
					})

					const product = await prisma.sizeProduct.findUnique({
						where: { id: item.sizeProductId },
						select: {
							Product: true
						}
					})

					if (codeProduct.indexOf(product?.Product.code) === -1) {
						codeProduct.push(product?.Product.code)
					}
				})
			)

			const filteredOrders = await prisma.order.findUnique({
				where: {
					id: order.id
				},
				include: {
					orderCustomerInfo: true,
					orderPayment: true
				}
			})

			const dataResponse = {
				...filteredOrders,
				codeProduct
			}
			return {
				ok: true,
				data: dataResponse,
				msg: 'Tạo Đơn hàng thành công'
			}
		} else if (paymentInfo.method === 'online') {
			const order = await prisma.order.create({
				data: {
					status: 'REFUND',
					code: paymentInfo.note?.toString() ?? '',
					orderProduct: {
						create: items.map(item => ({ sizeProductId: item.sizeProductId, quantity: 0 }))
					},
					orderCustomerInfo: {
						create: customerInfo
					},
					orderPayment: {
						create: paymentInfo
					}
				}
			})
			return {
				ok: false,
				data: order,
				msg: `Sản phẩm không đủ số lượng vui lòng kiểm tra lại`
			}
		}

		return {
			ok: false,
			data: false,
			msg: `Sản phẩm không đủ số lượng`
		}
	} catch (error) {
		console.log('🚀 ~ file: create.ts:43 ~ createProduct ~ error:', error)
		return null
	}
}
