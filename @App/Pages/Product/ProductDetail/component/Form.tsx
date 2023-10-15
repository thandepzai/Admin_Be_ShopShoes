import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Spin } from 'antd'
import { GiftOutlined, PlusOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import { CoreCard, CoreSelectWithApi, FileUpload } from '@/@App/@Core/components'
import clsx from 'clsx'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { useFormDetail } from '../hooks/useFormDetail'
import { productBrandServices } from '../../services/productServices'
const InputRichText = dynamic(() => import('@/@App/@Core/components/input/InputRichText'), {
	ssr: false,
	loading: () => (
		<div className="w-full">
			<Spin />
		</div>
	)
})

const { TextArea } = Input

const FormDetail = () => {
	const [form] = Form.useForm()
	const { product, id } = useCoreContext()
	console.log('🚀 ~ file: Form.tsx:23 ~ FormDetail ~ product:', product)

	const initImages = (product?.images ? JSON.parse(product?.images) : []) as string[]

	const { getFieldError, getFieldsValue } = form
	const { loadingSaveProduct, saveProduct } = useFormDetail(id)

	return (
		<div>
			<Divider className="textTheme"> {id === 'new' ? 'Thêm sản phẩm' : product?.name}</Divider>
			{id && (
				<Form
					form={form}
					name="newPost"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					onFinish={values => {
						saveProduct({ ...values, overView: values?.overView?.map((item: any) => item.name) })
					}}
					autoComplete="off"
					initialValues={{
						id: id !== 'new' && id,
						images: initImages,
						name: product?.name,
						sizeProduct: product?.sizeProduct,
						description: product?.description,
						seo: product?.seo,
						code: product?.code,
						keywords: product?.keywords,
						idProductBrand: product?.idProductBrand
					}}
				>
					<CoreCard className="my-5">
						<FileUpload
							formName="images"
							label={'Ảnh sản phẩm'}
							initValue={initImages}
							maxItem={10}
							form={form}
						/>
					</CoreCard>
					<Row gutter={[16, 16]}>
						<Col lg={12}>
							<CoreCard>
								<p style={{ width: '100%' }} className="text-[16px] py-4 font-600 text-blue-500">
									Thông tin cơ bản
								</p>
								<div className="p-4 bg-gray-100">
									<Form.Item className="hidden" name="id"></Form.Item>
									<Form.Item
										name="productBrandId"
										label={<label className="textTheme">Hãng sản phẩm</label>}
										rules={[
											{
												required: true,
												message: 'Vui lòng điền!'
											}
										]}
									>
										<CoreSelectWithApi
											apiService={productBrandServices.search}
											name="productBrand"
											customRender={(option: any) => <>{`${option?.id} --  ${option?.name}`}</>}
										/>
									</Form.Item>
									<Form.Item
										name="name"
										label={<label className="textTheme">Tên sản phẩm</label>}
										rules={[
											{
												required: true,
												message: 'Vui lòng điền!'
											}
										]}
									>
										<Input placeholder="Tên sản phẩm" />
									</Form.Item>
									<Form.Item
										name="code"
										label={<label className="textTheme">Mã sản phẩm</label>}
										rules={[
											{
												required: true,
												message: 'Vui lòng điền!'
											}
										]}
									>
										<Input placeholder="Tên sản phẩm" />
									</Form.Item>
									<Form.Item
										name="seo"
										label="Nội dung SEO"
										rules={[
											{
												required: true,
												message: 'Vui lòng điền!'
											},
											{
												max: 120,
												message: 'Tối đa 120 kí tự'
											}
										]}
									>
										<TextArea placeholder="Tên sản phẩm" />
									</Form.Item>
									<Form.Item
										name="keywords"
										label="Từ khoá SEO"
										rules={[
											{
												required: true,
												message: 'Vui lòng điền!'
											},
											{
												max: 120,
												message: 'Tối đa 120 kí tự'
											}
										]}
									>
										<TextArea placeholder="Từ khoá SEO, cách nhau bởi dấu phảy" />
									</Form.Item>
								</div>
							</CoreCard>
						</Col>

						<Col lg={12}>
							<CoreCard>
								<Form.List name="sizeProduct">
									{(fields, { add, remove }) => (
										<>
											<div className="flex items-baseline gap-4">
												<span className="text-[16px] py-4 font-600 text-blue-500">
													Size sản phẩm ({fields.length})
												</span>
												<Form.Item>
													<Button
														type="primary"
														onClick={() => add()}
														icon={<PlusOutlined />}
													>
														Thêm size
													</Button>
												</Form.Item>
											</div>

											<div className="h-[426px] overflow-y-scroll p-4 bg-gray-100 rounded-md">
												{fields.length === 0 && (
													<p
														className={clsx('text-center', {
															'text-red-500': getFieldError('classifications')
														})}
													>
														Chưa có size nào!
													</p>
												)}
												{fields.map(({ key, name, ...restField }) => (
													<Row align="middle" key={key} gutter={[16, 0]}>
														<Col span={20}>
															<p className="py-2 textTheme ">Size thứ {key + 1}</p>
															<Form.Item
																{...restField}
																name={[name, 'size']}
																label="Số Size"
																rules={[
																	{ required: true, message: 'Không để trống ?' }
																]}
															>
																<Input
																	style={{ width: '100%' }}
																	placeholder="Số size"
																/>
															</Form.Item>
															<Form.Item
																{...restField}
																name={[name, 'price']}
																label="Giá"
																rules={[{ required: true, message: 'Không để trống' }]}
															>
																<InputNumber
																	style={{ width: '100%' }}
																	placeholder="Giá"
																	formatter={value =>
																		`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
																	}
																/>
															</Form.Item>
															<Form.Item
																{...restField}
																name={[name, 'quantity']}
																label="Số lượng"
																rules={[
																	{
																		required: true,
																		message: 'Không để trống'
																	}
																]}
															>
																<InputNumber
																	style={{ width: '100%' }}
																	placeholder="Số lượng"
																	min={0}
																	formatter={value =>
																		`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
																	}
																/>
															</Form.Item>
														</Col>
														<Col span={4}>
															<Button danger type="primary" onClick={() => remove(name)}>
																Xoá
															</Button>
														</Col>
														<Divider></Divider>
													</Row>
												))}
											</div>
										</>
									)}
								</Form.List>
							</CoreCard>
						</Col>
						<Col span={24}>
							<Form.Item
								name="description"
								label={<label className="textTheme">Nôi dung mô tả sản phẩm</label>}
								rules={[
									{
										required: true,
										message: 'Nội dung không được để trống!'
									},
									{ min: 8, message: 'Nội dung không được để trống!' }
								]}
							>
								<InputRichText form={form} name="description" />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item wrapperCol={{ span: 24 }}>
						<Button loading={loadingSaveProduct} block type="primary" htmlType="submit">
							{product?.id ? 'Sửa sản phẩm' : 'Tạo sản phẩm'}
						</Button>
					</Form.Item>
				</Form>
			)}
		</div>
	)
}

export default FormDetail
