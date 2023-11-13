import CardDataStats from '@/@App/@Core/components/cartData/CardDataStats'
import { GrMoney } from 'react-icons/gr'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsCartCheck, BsCartX } from 'react-icons/bs'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'

const ListCartData: React.FC = () => {
	const { dataDashboard } = useCoreContext()
	const { totalRevenue, totalOrdersWaiting, totalOrdersRefund, totalOrdersDone } = dataDashboard
	const totalCount = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND'
	}).format(totalRevenue)
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
			<CardDataStats title="Tổng doanh thu tháng này" total={totalCount} levelUp>
				<GrMoney className="text-3xl" />
			</CardDataStats>
			<CardDataStats title="Đơn hàng thành công" total={totalOrdersDone} levelUp>
				<AiOutlineShoppingCart className="text-3xl" />
			</CardDataStats>
			<CardDataStats title="Đơn hàng chờ duyệt" total={totalOrdersWaiting} levelUp>
				<BsCartCheck className="text-3xl" />
			</CardDataStats>
			<CardDataStats title="Đơn hàng chưa hoàn tiền" total={totalOrdersRefund} levelDown>
				<BsCartX className="text-3xl" />
			</CardDataStats>
		</div>
	)
}
export default ListCartData
