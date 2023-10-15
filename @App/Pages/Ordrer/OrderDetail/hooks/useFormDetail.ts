import { useRouter } from 'next/router'
import { orderServicesStatus } from '../../services/orderServices'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { ORDER_ROUTER } from '../../configs/router'
import { useEffect, useState } from 'react'

export const useFormDetail = () => {
	const [statusSave, setStatusSave] = useState('')
	const [shippingSave, setShippingSave] = useState()
	const { loading: loadingSaveOrder, run: saveOrder } = useRequest(orderServicesStatus.update, {
		manual: true,
		onSuccess: data => {
			message.success('Cập nhật đơn hàng thành công')
			setStatusSave(data?.data?.status)
			if(data?.data?.status === 'SHIPPING' || data?.data?.status === 'DONE') {
				setShippingSave(data?.data?.orderShipping)
			}
		},
		onError: error => {
			message.success('Cập nhật đơn hàng thất bại')
		}
	})

	return { loadingSaveOrder, saveOrder, statusSave, shippingSave }
}
