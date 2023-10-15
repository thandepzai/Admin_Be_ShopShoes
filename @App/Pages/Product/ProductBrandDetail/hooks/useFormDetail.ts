import { useRouter } from 'next/router'
import { productBrandServices } from '../../services/productServices'
import { useRequest } from 'ahooks'
import { message } from 'antd'
import { PRODUCT_BRAND_ROUTER } from '../../configs/router'

export const useFormDetail = (id: string) => {
	const router = useRouter()
	const { loading: loadingSaveProductBrand, run: saveProductBrand } = useRequest(productBrandServices.save, {
		manual: true,
		onSuccess: data => {
			if (id === 'new') {
				message.success('Thêm hãng sản phẩm thành công')
			} else {
				message.success('Cập nhật hãng sản phẩm thành công')
			}
			router.push(PRODUCT_BRAND_ROUTER.LIST)
		},
		onError: error => {
			if (id === 'new') {
				message.error('Thêm hãng sản phẩm thất bại')
			} else {
				message.error('Cập nhật hãng phẩm thất bại')
			}
		}
	})

	return { loadingSaveProductBrand, saveProductBrand }
}
