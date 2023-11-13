import { useRouter } from 'next/router'
import { productServices } from '../../services/productServices'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { PRODUCT_ROUTER } from '../../configs/router'

export const useDeleteProduct = () => {
	const router = useRouter()
	const { loading: loadingDeleteProduct, run: deleteProduct } = useRequest(productServices.remove, {
		manual: true,
		onSuccess: data => {
			message.success('Xóa sản phẩm thành công')
			router.push(PRODUCT_ROUTER.LIST)
		},
		onError: error => {
			message.success('Xóa sản phẩm thất bại')
		}
	})

	return { loadingDeleteProduct, deleteProduct }
}
