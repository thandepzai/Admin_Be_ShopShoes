'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { STORAGE_KEY } from '../../../const/app-const'
import { useUser } from '@/hooks'
import { AUTH_ROUTER } from '@/@App/Pages/Auth/configs/router'
import { authService } from '@/@App/Pages/Auth/services/authServices'
import { useRequest } from 'ahooks'
import { Spin } from 'antd'
import { useRouter } from 'next/router'
interface Props {
	children: ReactNode
}

export const useUserInfo = () => {
	const router = useRouter()
	const currentPath = router.pathname
	const { update, reset } = useUser()
	const { loading: authLoading, run: fetchAuth } = useRequest(authService.me, {
		manual: true,
		onSuccess: res => {
			update(res?.data)
			if (currentPath === '/auth/login') {
				if (res?.data?.roles?.includes('admin')) {
					return router.push('/admin/dashboard')
				}
				return router.push('/')
			}
		},
		onError: () => {
			router.push(AUTH_ROUTER.LOGIN)
			reset()
			sessionStorage.clear()
		}
	})
	return { authLoading, fetchAuth }
}

const AuthProvider: React.FC<Props> = ({ children }) => {
	const router = useRouter()
	const { token } = useUser()
	const { authLoading, fetchAuth } = useUserInfo()
	const [offHome, setOffHome] = useState(true)
	const currentPath = router.pathname

	useEffect(() => {
		const localToken = typeof window !== 'undefined' ? window.sessionStorage.getItem(STORAGE_KEY.LOCAL_USER) : null
		if ((currentPath !== '/' && offHome) || localToken) {
			setOffHome(false)
		}
	}, [currentPath])

	useEffect(() => {
		const localToken = typeof window !== 'undefined' ? window.sessionStorage.getItem(STORAGE_KEY.LOCAL_USER) : null
		if (token === '' && localToken) {
			fetchAuth()
		} else {
			router.push(AUTH_ROUTER.LOGIN)
		}
	}, [token])

	return (
		<>
			{authLoading || offHome ? (
				<div className="items-center justify-center w-[100vw] h-[100vh] flex">
					<Spin />
				</div>
			) : (
				children
			)}
		</>
	)
}

export default React.memo(AuthProvider)
