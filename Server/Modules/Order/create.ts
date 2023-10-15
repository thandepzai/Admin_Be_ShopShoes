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
	const { items, customerInfo, paymentInfo } = req.body as BodyProps
	console.log('🚀 ~ file: create.ts:16 ~ createOrder ~ items:', items)

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
			const checkRandomCode = await prisma.order.findUnique({ where: {code: randomCode}})
			if (!checkRandomCode){
				newCode = randomCode
				break
			}
		}

		if (isAllStocking) {
			const order = await prisma.order.create({
				data: {
					status: 'WAITING',
					code: newCode,
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
			await Promise.all(
				items.map(async item => {
					await prisma.sizeProduct.update({
						where: { id: item.sizeProductId },
						data: { quantity: { decrement: item.quantity } }
					})
				})
			)
			return {
				ok: true,
				data: order,
				msg: 'Tạo Đơn hàng thành công'
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
