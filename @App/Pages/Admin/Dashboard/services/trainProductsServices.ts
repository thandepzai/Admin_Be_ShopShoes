import { BaseService } from '@/@App/@Core/service/BaseService'
import { TRAIN_PRODUCT_API } from "../../configs/api"

class TrainProducts extends BaseService {}
export const trainProductsServices = new TrainProducts(TRAIN_PRODUCT_API.endpoint)
