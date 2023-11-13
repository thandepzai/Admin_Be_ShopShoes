interface itemButton {
	color: string
	title: string
	status: 'CONFIRM' | 'CANCELED' | 'DONE' | 'SHIPPING' | 'REFUND'
}

export const buttonStatus = {
	WAITING: [
		{ color: 'blue', title: 'Xác nhận đơn hàng', status: 'CONFIRM' } as itemButton,
		{ color: 'red', title: 'Hủy đơn hàng', status: 'CANCELED' } as itemButton
	],
	CONFIRM: [
		{ color: 'blue', title: 'Giao hàng', status: 'SHIPPING' } as itemButton,
		{ color: 'red', title: 'Hủy đơn hàng', status: 'CANCELED' } as itemButton
	],
	SHIPPING: [
		{ color: 'blue', title: 'Thành công', status: 'DONE' } as itemButton,
		{ color: 'red', title: 'Hủy đơn hàng', status: 'CANCELED' } as itemButton
	],
	CANCELED: [],
	DONE: [
		{ color: 'blue', title: 'Thành công', status: 'DONE' } as itemButton,
		{ color: 'red', title: 'Hủy đơn hàng', status: 'CANCELED' } as itemButton
	],
	REFUND: [{ color: 'blue', title: 'Xác nhận hoàn tiền', status: 'CANCELED' } as itemButton]
}
