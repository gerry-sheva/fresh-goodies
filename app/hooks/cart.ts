import { ShoppingCart } from '@/types/cart'
import { Product } from '@/types/product'
import { create } from 'zustand'

const useCart = create<ShoppingCart>((set) => ({
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
	getTotalPrice: (): number => {
		return useCart
			.getState()
			.items.reduce(
				(totalPrice, value) =>
					totalPrice + value.product.price * value.quantity,
				0
			)
	},
}))

export default useCart
