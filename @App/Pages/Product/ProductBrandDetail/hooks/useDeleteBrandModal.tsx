import { useState } from 'react'
import { Button, Modal } from 'antd'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { useDeleteBrand } from './useDeleteBrand'

export const useDeleteBrandModal = () => {
	const { id } = useCoreContext()
	const { loadingDeleteBrand, deleteBrand } = useDeleteBrand()
	const [openDeleteBrandModal, setOpenDeleteBrandModal] = useState(false)

	const handleChangeDeleteBrandModal = () => {
		setOpenDeleteBrandModal(!openDeleteBrandModal)
	}

	const renderDeleteBrandModal = () => {
		return (
			openDeleteBrandModal && (
				<Modal
					open={openDeleteBrandModal}
					onCancel={handleChangeDeleteBrandModal}
					footer={null}
					title="Khi xóa hãng này sẽ xóa tất cả sản phẩm của hãng này"
				>
					<div className="flex justify-between gap-5 py-5">
						<Button loading={loadingDeleteBrand} onClick={() => deleteBrand(id)} block type="primary" danger>
							Xác nhận
						</Button>
						<Button onClick={handleChangeDeleteBrandModal} block type="primary">
							Hủy
						</Button>
					</div>
				</Modal>
			)
		)
	}

	return { handleChangeDeleteBrandModal, renderDeleteBrandModal }
}
