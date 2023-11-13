import { useRequest } from 'ahooks'
import { trainProductsServices } from '../services/trainProductsServices'
import { message } from 'antd'

export const trainProductsSuggest = ()  => {
	const { loading: loadingTrainProducts, run: trainProducts } = useRequest(trainProductsServices.save, {
		manual: true,
		onSuccess: data => {
			console.log("🚀 ~ file: useTrainProduct.ts:10 ~ trainProductsSuggest ~ data:", data)
			message.success(data.msg)
		},
		onError: error => {
			console.log("🚀 ~ file: useTrainProduct.ts:13 ~ trainProductsSuggest ~ error:", error)
			message.success('Train DB thất bại')
		}
	})
	return {loadingTrainProducts, trainProducts}
}

