import { CoreProvider } from '@/@App/@Core/provider/CoreProvider'
import { useFormDetail } from './hooks/useFormDetail'

const OrderDetailProvider: React.FC<any> = ({ children, ...restProps }) => {
	const { loadingSaveOrder, saveOrder, statusSave, shippingSave } = useFormDetail()

	const data = {
		loadingSaveOrder,
		saveOrder,
		statusSave,
		shippingSave,
		...restProps
	}
	return <CoreProvider {...data}>{children}</CoreProvider>
}

export default OrderDetailProvider
