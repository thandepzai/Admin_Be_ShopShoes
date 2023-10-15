import { useRequest } from 'ahooks'
import { orderServices } from '../../services/orderServices'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks'
import { useRouter } from 'next/router'
import { Order } from '@prisma/client'

export const useOrderDetail = () => {
	const router = useRouter()
	const id = router.query.id as string
	const [orderForm, setOrderForm] = useState<any>(null)
	const { loading: loadingFetchOrder, runAsync: fetchOrder } = useRequest(orderServices.find, { manual: true })

	const getOrder = async (id: string) => {
		const orderForm = await fetchOrder(id)
		setOrderForm(orderForm)
		if (!orderForm) {
			router.push('/404')
		}
	}
	useEffect(() => {
		getOrder(id)
	}, [id])

	return { orderForm: orderForm?.data, loadingFetchOrder, getOrder }
}
