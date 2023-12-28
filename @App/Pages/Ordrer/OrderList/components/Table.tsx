'use client'
import { useAntdTable } from 'ahooks'
import { Button, Form, Select, Table, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'
import { EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { ORDER_ROUTER } from '../../configs/router'

export default () => {
	const router = useRouter()
	const [form] = Form.useForm()
	const { getTableData } = useTable()
	const { tableProps, search } = useAntdTable(getTableData, { form })
	const { submit } = search

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Code',
			dataIndex: 'code'
		},
		{
			title: 'Tên khác hàng',
			dataIndex: ['orderCustomerInfo', 'name']
		},
		{
			title: 'Số điện thoại',
			dataIndex: ['orderCustomerInfo', 'phone']
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status'
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
								style={{ width: '25%' }}
								className="flex justify-center items-center"
								type="primary"
								color="success"
								onClick={() => router.push(ORDER_ROUTER.DETAIL(data?.id))}
							>
								<EditOutlined />
							</Button>
						</Tooltip>
					</div>
				)
			}
		}
	]
	return (
		<>
			<Form form={form} className="flex w-1/2">
				<Form.Item name="filterStatus" label="Trạng thái: " className="mr-2 w-1/3">
					<Select placeholder="Chọn trạng thái" onChange={submit}>
						<Select.Option value="WAITING">WAITING</Select.Option>
						<Select.Option value="CONFIRM">CONFIRM</Select.Option>
						<Select.Option value="SHIPPING">SHIPPING</Select.Option>
						<Select.Option value="CANCELED">CANCELED</Select.Option>
						<Select.Option value="DONE">DONE</Select.Option>
						<Select.Option value="REFUND">REFUND</Select.Option>
					</Select>
				</Form.Item>
			</Form>
			<Table columns={columns} rowKey="id" {...tableProps} />
		</>
	)
}
