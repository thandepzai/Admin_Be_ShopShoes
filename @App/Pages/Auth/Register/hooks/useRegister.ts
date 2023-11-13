import { useRequest } from 'ahooks'
import { authService } from '../../services/authServices'
import { useRouter } from 'next/router'
import { message } from 'antd'
import { AUTH_ROUTER } from '../../configs/router'
import { internalErrorMsg } from '@/ultis/msg'
export const useRegister = () => {
	const router = useRouter()

	const { loading, run } = useRequest(authService.register, {
		manual: true,
		onSuccess: data => {
			console.log('🚀 ~ file: useRegister.ts:14 ~ useRegister ~ data:', data)
			message.success(data?.msg)
			router.push(AUTH_ROUTER.LOGIN)
		},
		onError: (err: any) => {
			console.log('🚀 ~ file: useRegister.ts:18 ~ useRegister ~ err:', err)
			if (err.error.data.msg) {
				message.error(err.error.data.msg)
			} else {
				internalErrorMsg()
			}
		}
	})

	const handleSubmit = (data: any) => {
		return run(data)
	}
	return { loading, handleSubmit }
}
