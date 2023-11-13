import { CoreProvider } from '@/@App/@Core/provider/CoreProvider'
import { trainProductsSuggest } from './hooks/useTrainProduct'
import { useFormDashboard } from './hooks/useGetData'
import { Spin } from 'antd'

const DashboardProvider: React.FC<any> = ({ children, ...restProps }) => {
	const { loadingTrainProducts, trainProducts } = trainProductsSuggest()
	const { dataDashboard } = useFormDashboard()
	console.log('🚀 ~ file: DashboardProvider.tsx:9 ~ dataDashboard:', dataDashboard)

	const data = {
		loadingTrainProducts,
		trainProducts,
		dataDashboard,
		...restProps
	}
	return (
		<CoreProvider {...data}>
			{dataDashboard === undefined ? (
				<div className="flex items-center justify-center w-full h-screen">
					<Spin />
				</div>
			) : (
				<>{children}</>
			)}
		</CoreProvider>
	)
}

export default DashboardProvider
