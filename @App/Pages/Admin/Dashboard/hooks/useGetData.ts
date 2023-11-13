import { dashboardProductsServices } from '../services/dashboardServices'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
export const useFormDashboard = () => {
	const { data: data, run: searchProduct } = useRequest(dashboardProductsServices.search, {
		manual: true
	})
	useEffect(() => {
		searchProduct({})
	}, [])
	return { dataDashboard: data?.data }
}
