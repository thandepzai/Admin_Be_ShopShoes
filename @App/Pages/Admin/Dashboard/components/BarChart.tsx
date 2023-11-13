import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartData {
	labels: string[]
	datasets: any
}

interface RevenueStatistics {
	month: Number
	totalAmount: Number
}

const BarChart = () => {
	const { dataDashboard } = useCoreContext()
	const { revenueStatistics } = dataDashboard

	const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] })

	const [chartOptions, setChartOptions] = useState({})

	useEffect(() => {
		setChartData({
			labels: revenueStatistics.map(({ month }: RevenueStatistics) => `Tháng ${month}`),
			datasets: [
				{
					label: 'Doanh thu (VNĐ)',
					data: revenueStatistics.map(({ totalAmount }: RevenueStatistics) => totalAmount),
					borderColor: 'rgb(53, 162, 235)',
					backgroundColor: 'rgba(53, 162, 235, 0.4)'
				}
			]
		})

		setChartOptions({
			plugins: {
				legend: {
					position: 'top'
				},
				title: {
					display: true,
					text: 'Thống kê doanh thu năm nay'
				}
			},
			maintainAspectRatio: false,
			responsive: true
		})
	}, [])

	return (
		<div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
			<Bar data={chartData} options={chartOptions} />
		</div>
	)
}

export default BarChart
