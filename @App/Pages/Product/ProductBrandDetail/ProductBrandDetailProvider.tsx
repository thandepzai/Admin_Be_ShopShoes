import { CoreProvider } from '@/@App/@Core/provider/CoreProvider'

const ProductBrandDetailProvider: React.FC<any> = ({ children, ...restProps }) => {
	const data = {
		...restProps
	}
	return <CoreProvider {...data}>{children}</CoreProvider>
}

export default ProductBrandDetailProvider
