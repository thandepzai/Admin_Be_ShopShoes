import { BaseService } from '@/@App/@Core/service/BaseService'
import { PRODUCT_API, PRODUCT_BRAND_API } from '../configs/api'

class Product extends BaseService {}
export const productServices = new Product(PRODUCT_API.endpoint)

class ProductBrand extends BaseService {}
export const productBrandServices = new Product(PRODUCT_BRAND_API.endpoint)
