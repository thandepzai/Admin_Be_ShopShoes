import { Button } from 'antd'
import ProductBrandListProvider from './ProductBrandListProvider'
import Table from './components/Table'
import { useRouter } from 'next/router'
import { PRODUCT_BRAND_ROUTER } from '../configs/router'

const ProductBrandList = () => {
	const router = useRouter()
	return (
		<ProductBrandListProvider>
			<div className="flex justify-between my-4">
				<Button type="primary" onClick={() => router.push(PRODUCT_BRAND_ROUTER.NEW)}>
					Tạo mới
				</Button>
			</div>
			<Table />
		</ProductBrandListProvider>
	)
}

export default ProductBrandList
