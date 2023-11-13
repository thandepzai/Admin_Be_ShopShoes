import { useState } from 'react'
import { Button, Input } from 'antd'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'

export default function renderUseSearch() {
	const [name, setName] = useState('')
	const { getProduct } = useCoreContext()

	return (
		<div className="flex pb-4 w-1/2">
			<Input type="text" placeholder="Nhập tên sản phẩm" onBlur={e => setName(e.target.value)} />
			<Button type="primary" className="ml-4" onClick={() => getProduct({params: {name}})}>
				Tìm Kiếm
			</Button>
		</div>
	)
}
