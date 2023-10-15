import { Image, Table } from 'antd'

export default (data: any) => {
	const { order } = data

	const columns = [
		{
			title: 'ID',
			dataIndex: ['SizeProduct', 'id']
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: ['SizeProduct', 'Product', 'name']
		},
		{
			title: 'Ảnh',
			dataIndex: ['SizeProduct','Product', 'images'],
			render: (images: string) => {
				const arr = JSON.parse(images) as string[]
				return (
					<div className="flex w-[120px]  flex-col gap-2">
						<Image className="rounded-md aspect-square" src={arr[0]} />
					</div>
				)
			}
		},
		{
			title: 'Size',
			dataIndex: ['SizeProduct', 'size']
		},
		{
			title: 'Số lượng',
			dataIndex: ['quantity']
		},
		{
			title: 'Đơn giá',
			dataIndex: ['SizeProduct', 'price']
		}
	]
	return <>{order ? <Table columns={columns}  rowKey="id" dataSource={order} /> : <></>}</>
}
