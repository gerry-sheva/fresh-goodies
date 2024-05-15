import { create } from 'zustand'
import { Item } from '../types'

interface Cart {
	[key: string]: Item
}

interface State {
	cart: Cart
	totalPrice: number
	updateCart: (itemName: string, item: Item, priceDiff: number) => void
	// addToCart: (itemName: string, item: Item) => void
}

const useCart = create<State>((set) => ({
	cart: {},
	totalPrice: 0,
	updateCart: (itemName: string, item: Item, priceDiff: number) =>
		set((state) => ({
			totalPrice: state.totalPrice + item.price - priceDiff,
			cart: {
				...state.cart,
				[itemName]: item,
			},
		})),
	// addToCart: (itemName: string, item: Item, priceDiff: number) =>
	// 	set((state) => ({
	// 		totalPrice: state.totalPrice + item.price - priceDiff,
	// 		cart: {
	// 			...state.cart,
	// 			[itemName]: item,
	// 		},
	// 	})),
	// subtractFromCart: (itemName: string, item: Item, priceDiff: number) =>
	// 	set((state) => ({
	// 		totalPrice: state.totalPrice + item.price - priceDiff,
	// 		cart: {
	// 			...state.cart,
	// 			[itemName]: item,
	// 		},
	// 	})),
}))

export default useCart
