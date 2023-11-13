import { useState } from 'react'
import { Button, Modal } from 'antd'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { useDeleteProduct } from './useDeleteProduct'

export const useDeleteProductModal = () => {
	const { id } = useCoreContext()
	const { loadingDeleteProduct, deleteProduct } = useDeleteProduct()
	const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false)

	const handleChangeDeleteProductModal = () => {
		setOpenDeleteProductModal(!openDeleteProductModal)
	}

	const renderDeleteProductModal = () => {
		return (
			openDeleteProductModal && (
				<Modal
					open={openDeleteProductModal}
					onCancel={handleChangeDeleteProductModal}
					footer={null}
					title="Bạn có chắc chắn muốn xóa sản phẩm này"
				>
					<div className="flex justify-between gap-5 py-5">
						<Button loading={loadingDeleteProduct} onClick={() => deleteProduct(id)} block type="primary" danger>
							Xác nhận
						</Button>
						<Button onClick={handleChangeDeleteProductModal} block type="primary">
							Hủy
						</Button>
					</div>
				</Modal>
			)
		)
	}

	return { handleChangeDeleteProductModal, renderDeleteProductModal }
}
