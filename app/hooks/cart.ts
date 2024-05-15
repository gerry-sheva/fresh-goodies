import { ShoppingCart } from '@/types/cart'
import { Product } from '@/types/product'
import { create } from 'zustand'

const useCart = create<ShoppingCart>((set) => ({
	items: [],
	addItem: (product: Product, quantity: number): void => {},
	removeItem: (productId: number): void => {},
	updateItemQuantity: (productId: number, quantity: number): void => {},
	getTotalPrice: (): number => {
		return 0
	},
}))

export default useCart
