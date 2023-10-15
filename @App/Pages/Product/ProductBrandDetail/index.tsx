import FormDetail from './component/Form'
import ProductBrandDetailProvider from './ProductBrandDetailProvider'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { useProductBrandDetail } from './hooks/useProductBrandDetail'

const ProductBrandDetail = () => {
	const router = useRouter()
	const { id } = router.query
	const { loadingFetchProductBrand, productBrand } = useProductBrandDetail()

	return (
		<ProductBrandDetailProvider productBrand={productBrand} id={id}>
			{loadingFetchProductBrand ? (
				<div className="flex items-center justify-center w-full h-[]">
					<Spin />
				</div>
			) : (
				<FormDetail />
			)}
		</ProductBrandDetailProvider>
	)
}

export default ProductBrandDetail
