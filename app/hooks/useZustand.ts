import { ShoppingCart } from '@/types/cart'
import { Product } from '@/types/product'
import { StateCreator, create } from 'zustand'

const createCartSlice: StateCreator<ShoppingCart> = (set) => ({
	items: [],
	addItem: (product: Product, quantity: number): void => {
		set((state) => ({ items: [...state.items, { product, quantity }] }))
	},
	removeItem: (productId: number): void => {
		set((state) => ({
			items: state.items.filter((item) => item.product.id != productId),
		}))
	},
	updateItemQuantity: (productId: number, quantity: number): void => {
		set((state) => ({
			items: state.items.map((item) =>
				item.product.id === productId ? { ...item, quantity } : item
			),
		}))
	},
	// getTotalPrice: (): number => {
	// 	return useCart
	// 		.getState()
	// 		.items.reduce(
	// 			(totalPrice, value) =>
	// 				totalPrice + value.product.price * value.quantity,
	// 			0
	// 		)
	// },
})

interface ActiveProduct {
	activeProduct?: Product
	setActiveProduct: (product: Product) => void
}

const createActiveProductSlice: StateCreator<ActiveProduct> = (set) => ({
	activeProduct: undefined,
	setActiveProduct: (product) => {
		set(() => ({ activeProduct: product }))
	},
})

export const useBoundedStore = create<ActiveProduct & ShoppingCart>((...a) => ({
	...createActiveProductSlice(...a),
	...createCartSlice(...a),
}))
