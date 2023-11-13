import { BaseService } from '@/@App/@Core/service/BaseService'
import { DASHBOARD_API } from '../../configs/api'

class DashboardProduct extends BaseService {}
export const dashboardProductsServices = new DashboardProduct(DASHBOARD_API.endpoint)
