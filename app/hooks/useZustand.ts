import { CartItem, ShoppingCart } from '@/types/cart'
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
})

type Favorite = {
	productId: number
}

interface FavoriteSlice {
	favoriteProducts: Favorite[]
	addToFavorite: (id: number) => void
	removeFromFavorite: (id: number) => void
}

const createFavoriteSlice: StateCreator<FavoriteSlice> = (set) => ({
	favoriteProducts: [],
	addToFavorite: (id) => {
		set((state) => ({
			favoriteProducts: [...state.favoriteProducts, { productId: id }],
		}))
	},
	removeFromFavorite: (id) => {
		set((state) => ({
			favoriteProducts: state.favoriteProducts.filter(
				(product) => product.productId != id
			),
		}))
	},
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

interface HomeCartItem {
	homeCartItem?: CartItem
	updateHomeCartItem: (item: CartItem) => void
	removeHomeCartItem: () => void
}

const createHomeCartItem: StateCreator<HomeCartItem> = (set) => ({
	homeCartItem: undefined,
	updateHomeCartItem: (item) => set((state) => ({ homeCartItem: item })),
	removeHomeCartItem: () => set(() => ({ homeCartItem: undefined })),
})

export const useBoundedStore = create<
	ActiveProduct & ShoppingCart & FavoriteSlice & HomeCartItem
>((...a) => ({
	...createActiveProductSlice(...a),
	...createCartSlice(...a),
	...createFavoriteSlice(...a),
	...createHomeCartItem(...a),
}))
