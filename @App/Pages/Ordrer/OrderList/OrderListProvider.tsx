import { CoreProvider } from '@/@App/@Core/provider/CoreProvider'
import { useRouter } from 'next/router'

const OrderListProvider: React.FC<any> = ({ children, ...restProps }) => {

	const data = {
		...restProps
	}
	return <CoreProvider {...data}>{children}</CoreProvider>
}

export default OrderListProvider
