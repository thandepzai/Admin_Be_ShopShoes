import { Button, Col, Divider, Form, Input, Row, Select } from 'antd'
import { CoreCard } from '@/@App/@Core/components'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { useFormDetail } from '../hooks/useFormDetail'
import Table from './Table'
import { buttonStatus } from '@/const/order-const'
import { useCallback } from 'react'

const FormDetail = () => {
	const [form] = Form.useForm()
	const { orderForm, id, loadingSaveOrder, saveOrder, statusSave, shippingSave } = useCoreContext()

	if (orderForm) {
		const { order, customer, payment, shipping } = orderForm
		const status = (statusSave.length ? statusSave : order?.status) as
			| 'WAITING'
			| 'CONFIRM'
			| 'SHIPPING'
			| 'CANCELED'
			| 'DONE'
		const shippingStatus = (shippingSave ? shippingSave : shipping)
		
		const FormShipping = () => {
			return (
				<>
					<Form
						form={form}
						name="newPost"
						className="w-2/4"
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						onFinish={values => {
							saveOrder({ ...values, orderId: id, status: 'SHIPPING' })
						}}
					>
						<Form.Item
							name="name"
							label={<label className="textTheme">Tên</label>}
							rules={[
								{
									required: true,
									message: 'Vui lòng điền!'
								}
							]}
						>
							<Input placeholder="Tên" />
						</Form.Item>
						<Form.Item name="code" label={<label className="textTheme">Code</label>}>
							<Input placeholder="Code" />
						</Form.Item>
						<Form.Item name="note" label={<label className="textTheme">Note</label>}>
							<Input placeholder="Note" />
						</Form.Item>
						<Form.Item wrapperCol={{ span: 24 }}>
							<Button loading={loadingSaveOrder} block type="primary" htmlType="submit">
								Giao hàng
							</Button>
						</Form.Item>
					</Form>
				</>
			)
		}

		const RenderButton = useCallback(() => {
			return (
				<>
					{status === 'CONFIRM' ? (
						<FormShipping />
					) : (
						<>
							{buttonStatus[status].map(item => {
								return (
									<Button
										className="ml-4 mb-4"
										type="primary"
										color="success"
										loading={loadingSaveOrder}
										style={{ backgroundColor: item.color }}
										onClick={() => {
											saveOrder({ orderId: id, status: item.status })
										}}
									>
										{item.title}
									</Button>
								)
							})}
						</>
					)}
				</>
			)
		}, [statusSave])

		const RenderShipping = useCallback(() => {
			if (shippingStatus !== null) {
				return (
					<Col xxl={8}>
						<CoreCard>
							<p style={{ width: '100%' }} className="text-[18px] py-2 font-bold text-blue-500">
								Thông tin giao hàng
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-300">
								Tên hãng: {shippingStatus?.name}
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-300">
								Code: {shippingStatus?.code}
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
								Trạng thái: {shippingStatus?.status}
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
								Note: {shippingStatus?.note}
							</p>
						</CoreCard>
					</Col>
				)
			}
			return <></>
		}, [shippingSave])

		return (
			<div>
				<Divider className="textTheme">Thông tin đơn hàng mã: {order?.code}</Divider>
				<Row gutter={[16, 16]}>
					{status !== 'CANCELED' && status !== 'DONE' ? (
						<Col xxl={24}>
							<CoreCard>
								<p style={{ width: '100%' }} className="text-[20px] p-4 font-bold text-blue-500">
									Thay đổi trạng thái đơn hàng
								</p>
								<RenderButton />
							</CoreCard>
						</Col>
					) : (
						<></>
					)}
					<Col xxl={24}>
						<CoreCard>
							<p
								style={{ width: '100%' }}
								className="text-center text-[20px] py-4 font-bold text-blue-500"
							>
								Danh sách sản phẩm
							</p>
							<Table order={orderForm?.listProduct} />
						</CoreCard>
					</Col>
					<Col xxl={8}>
						<CoreCard>
							<p style={{ width: '100%' }} className="text-[18px] py-2 font-bold text-blue-500">
								Thông tin đơn hàng
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-300">
								Id: {id}
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-300">
								Code: {order.code}
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
								Trạng thái: {order?.status}
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
								Tổng tiền: {orderForm?.totalCount} VNĐ
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
								Phương thức: {payment?.method}
							</p>
						</CoreCard>
					</Col>
					<Col xxl={8}>
						<CoreCard>
							<p style={{ width: '100%' }} className="text-[18px] py-2 font-bold text-blue-500">
								Thông tin khách hàng
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-300">
								Họ Tên: {customer?.name}
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
								Địa Chỉ: {customer?.address}
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
								Email: {customer?.email}
							</p>
							<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
								SĐT: {customer?.phone}
							</p>
						</CoreCard>
					</Col>
					<RenderShipping />
				</Row>
			</div>
		)
	}
	return <></>
}

export default FormDetail
