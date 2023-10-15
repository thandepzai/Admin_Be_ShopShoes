import { NavItemProps } from '@/@App/Layout/AppNav/navList'
import { PRODUCT_ROUTER, PRODUCT_BRAND_ROUTER } from './router'
import { CodeSandboxOutlined, UnorderedListOutlined } from '@ant-design/icons'

export const productNavItems: NavItemProps[] = [
	{
		role: 'product',
		key: 'product',
		label: 'Quản lý sản phẩm',
		icon: <CodeSandboxOutlined />,
		children: [
			{
				role: 'product',
				key: 'product-list',
				label: 'Danh sách sản phẩm',
				route: PRODUCT_ROUTER.LIST,
				icon: <UnorderedListOutlined />
			},
			{
				role: 'product',
				key: 'product-brand',
				label: 'Danh sách hãng',
				route: PRODUCT_BRAND_ROUTER.LIST,
				icon: <UnorderedListOutlined />
			}
		]
	}
]
