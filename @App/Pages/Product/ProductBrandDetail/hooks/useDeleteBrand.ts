import { useRouter } from 'next/router'
import { productBrandServices } from '../../services/productServices'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { PRODUCT_BRAND_ROUTER } from '../../configs/router'

export const useDeleteBrand = () => {
	const router = useRouter()
	const { loading: loadingDeleteBrand, run: deleteBrand } = useRequest(productBrandServices.remove, {
		manual: true,
		onSuccess: data => {
			message.success('Xóa sản phẩm thành công')
			router.push(PRODUCT_BRAND_ROUTER.LIST)
		},
		onError: error => {
			message.success('Xóa sản phẩm thất bại')
		}
	})

	return { loadingDeleteBrand, deleteBrand }
}
