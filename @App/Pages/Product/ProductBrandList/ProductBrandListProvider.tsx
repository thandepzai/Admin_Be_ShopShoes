import { CoreProvider } from '@/@App/@Core/provider/CoreProvider'

const ProductListProvider: React.FC<any> = ({ children, ...restProps }) => {
	const data = {
		...restProps
	}
	return <CoreProvider {...data}>{children}</CoreProvider>
}

export default ProductListProvider
