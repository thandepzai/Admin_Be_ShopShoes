'use client'
import React from 'react'
import { Avatar } from 'antd'
import { useUser } from '@/hooks'
import { useRouter } from 'next/router'
import { AUTH_ROUTER } from '../Pages/Auth/configs/router'

export default function AppHeader(): JSX.Element {
	const router = useRouter()
	const { user } = useUser()
	const nameUser = user?.name?.toString().toUpperCase() ?? ''
	const handleLogOut = () => {
		router.push(AUTH_ROUTER.LOGIN)
		sessionStorage.clear()
	}
	return (
		<div className="flex items-center bg-blue-500 gap-4 p-4 justify-between">
			<div className="flex items-center  text-white">
				<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
				<div className="ml-2 text-xl text-white font-bold">{nameUser}</div>
			</div>
			<div>
				<button
					className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded border-none cursor-pointer"
					onClick={handleLogOut}
				>
					Đăng Xuất
				</button>
			</div>
		</div>
	)
}
