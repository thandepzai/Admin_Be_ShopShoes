import { useAntdTable } from 'ahooks'
import { Button, Image, Table, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'
import { EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { PRODUCT_BRAND_ROUTER } from '../../configs/router'

export default () => {
	const router = useRouter()
	const { getTableData } = useTable()
	const { tableProps, run } = useAntdTable(getTableData)

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Tên hãng',
			dataIndex: 'name'
		},
		{
			title: 'Ảnh',
			dataIndex: 'images',
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
			title: 'Giới Thiệu',
			dataIndex: 'description'
		},
		{
			title: 'Hành động',
			dataIndex: '',
			render: (data: any) => {
				console.log(data)
				return (
					<div className="flex flex-col gap-2">
						<Tooltip placement="topLeft" title={'Chỉnh sửa'}>
							<Button
								onClick={() => router.push(PRODUCT_BRAND_ROUTER.DETAIL(data?.id))}
								type="primary"
								color="success"
							>
								<EditOutlined />
							</Button>
						</Tooltip>
					</div>
				)
			}
		}
	]

	return <Table columns={columns} rowKey="id" {...tableProps} />
}
