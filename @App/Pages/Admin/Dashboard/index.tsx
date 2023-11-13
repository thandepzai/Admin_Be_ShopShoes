import DashboardProvider from './DashboardProvider'
import BarChart from './components/BarChart'
import ButtonDashBoard from './components/Button'
import ListCartData from './components/ListCartData'
import RecentOrders from './components/RecentOrders'

const DashboardAdmin = () => {
	return (
		<DashboardProvider>
			<ButtonDashBoard />
			<ListCartData />
			<div className="py-4 grid md:grid-cols-3 grid-cols-1 gap-4">
				<BarChart />
				<RecentOrders />
			</div>
		</DashboardProvider>
	)
}
export default DashboardAdmin
