import { Button } from 'antd'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'

const ButtonDashBoard = () => {
	const { loadingTrainProducts, trainProducts } = useCoreContext()

	return (
		<div className="flex justify-between my-4">
			<Button type="primary" loading={loadingTrainProducts} onClick={() => trainProducts()}>
				Cập nhật bộ gợi ý
			</Button>
		</div>
	)
}
export default ButtonDashBoard
