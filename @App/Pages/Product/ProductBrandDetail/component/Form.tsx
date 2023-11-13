import { Button, Col, Divider, Form, Input, Row, Spin } from 'antd'
import dynamic from 'next/dynamic'
import { CoreCard, FileUpload } from '@/@App/@Core/components'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { useFormDetail } from '../hooks/useFormDetail'
import { useDeleteBrandModal } from '../hooks/useDeleteBrandModal' 
const InputRichText = dynamic(() => import('@/@App/@Core/components/input/InputRichText'), {
	ssr: false,
	loading: () => (
		<div className="w-full">
			<Spin />
		</div>
	)
})

const FormDetail = () => {
	const [form] = Form.useForm()
	const { productBrand, id } = useCoreContext()
	console.log('🚀 ~ file: Form.tsx:23 ~ FormDetail ~ productBrand:', productBrand)

	const initImages = (productBrand?.images ? JSON.parse(productBrand?.images) : []) as string[]
	const { loadingSaveProductBrand, saveProductBrand } = useFormDetail(id)
	const { handleChangeDeleteBrandModal, renderDeleteBrandModal } = useDeleteBrandModal()

	return (
		<div>
			<Divider className="textTheme"> {id === 'new' ? 'Thêm hãng sản phẩm' : productBrand?.name}</Divider>
			{id && (
				<Form
					form={form}
					name="newPost"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					onFinish={values => {
						saveProductBrand({ ...values })
					}}
					autoComplete="off"
					initialValues={{
						id: id !== 'new' && id,
						images: initImages,
						name: productBrand?.name,
						description: productBrand?.description
					}}
				>
					<CoreCard className="my-5">
						<div className="p-4 bg-gray-100">
							<Form.Item className="hidden" name="id"></Form.Item>
							<Form.Item
								name="name"
								label={<label className="textTheme">Tên hãng</label>}
								rules={[
									{
										required: true,
										message: 'Vui lòng điền!'
									}
								]}
							>
								<Input placeholder="Tên hãng sản phẩm" />
							</Form.Item>
							<CoreCard className="my-5">
								<FileUpload
									formName="images"
									label={'Ảnh hãng sản phẩm'}
									initValue={initImages}
									maxItem={2}
									form={form}
								/>
							</CoreCard>
							<Form.Item
								name="description"
								label={<label className="textTheme">Nội dung mô tả hãng sản phẩm</label>}
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
						</div>
					</CoreCard>
					<Form.Item wrapperCol={{ span: 24 }}>

						{productBrand?.id ? (
							<div className='flex justify-between gap-5'>
								<Button loading={loadingSaveProductBrand} block type="primary" htmlType="submit">
									Sửa hãng sản phẩm
								</Button>
								<Button  onClick={handleChangeDeleteBrandModal} block type="primary" danger>
									Xóa hãng sản phẩm
								</Button>
							</div>
						) : (
							<Button loading={loadingSaveProductBrand} block type="primary" htmlType="submit">
								Tạo hãng sản phẩm
							</Button>
						)}
					</Form.Item>
				</Form>
			)}
			{renderDeleteBrandModal()}
		</div>
	)
}

export default FormDetail
