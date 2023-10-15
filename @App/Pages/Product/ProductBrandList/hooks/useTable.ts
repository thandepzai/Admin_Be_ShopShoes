import { useRequest } from 'ahooks'
import { productBrandServices } from '../../services/productServices'
import { useEffect } from 'react'
interface PagingParam {
	current: number
	pageSize: number
}

interface Item {
	name: {
		last: string
	}
	email: string
	phone: string
	gender: 'male' | 'female'
}

interface Result {
	total: number
	list: any[]
}
export const useTable = () => {
	const getTableData = async ({ current, pageSize }: PagingParam, formData: Object): Promise<Result> => {
		const data = await productBrandServices.search({ params: { page: current, pageSize: pageSize, ...formData } })
		return {
			list: data?.data?.dataTable ?? [],
			total: data?.data?.totalCount
		}
	}
	return { getTableData }
}
