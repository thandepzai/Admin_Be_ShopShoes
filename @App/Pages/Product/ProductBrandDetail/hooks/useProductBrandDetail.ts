import { useRequest } from 'ahooks'
import { productBrandServices } from '../../services/productServices'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useProductBrandDetail = () => {
	const router = useRouter()
	const id = router.query.id as string
	const [productBrand, setProductBrand] = useState<any>(null)
	const { loading: loadingFetchProductBrand, runAsync: fetchProductBrand } = useRequest(productBrandServices.find, { manual: true })

	useEffect(() => {
		const getProductBrand = async (id: string) => {
			const productBrand = await fetchProductBrand(id)
			setProductBrand(productBrand)
			if (!productBrand) {
				router.push('/404')
			}
		}
		if (id && id?.toString() !== 'new') {
			getProductBrand(id)
		}
	}, [id])

	return { productBrand: productBrand?.data, loadingFetchProductBrand }
}
