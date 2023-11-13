import React from 'react'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'

interface ProductPopular {
	id: Number
	quantity: Number
	images: string
	name: string
}

const RecentOrders = () => {
	const { dataDashboard } = useCoreContext()
	const { listProductPopular } = dataDashboard
	return (
		<div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-y-auto">
			<h1>Sản phẩm bán chạy</h1>
			<ul>
				{listProductPopular.map((item: ProductPopular, key: number) => {
					const arr = JSON.parse(item.images) as string[]
					return (
						<li
							key={key}
							className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
						>
							<div className="rounded-lg">
								<img className="rounded-md aspect-square w-10 h-10" src={arr[0]} />
							</div>
							<div className="pl-4 w-3/4">
								<p className="text-gray-800 font-bold">{item.name}</p>
								<p className="text-gray-400 text-sm">{`${item.quantity} Đôi`}</p>
							</div>
							<p className="lg:flex md:hidden absolute right-6 text-sm">{`Top ${key + 1}`}</p>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default RecentOrders
