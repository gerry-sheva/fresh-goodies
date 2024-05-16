import { Button } from '@/components/ui/button'
import React from 'react'
import { useBoundedStore } from '../hooks/useZustand'
import { Product } from '@/types/product'

interface CartButtonProps {
	setIsCartDrawerShown: React.Dispatch<React.SetStateAction<boolean>>
}

export const CartButton: React.FC<CartButtonProps> = ({
	setIsCartDrawerShown,
}) => {
	const homeCartItem = useBoundedStore((state) => state.homeCartItem)
	const addItem = useBoundedStore((state) => state.addItem)
	const items = useBoundedStore((state) => state.items)
	const removeHomeCartItem = useBoundedStore(
		(state) => state.removeHomeCartItem
	)

	const isInCart =
		items.find((item) => item.product.id === homeCartItem?.product.id) && true

	const handleAddToCart = () => {
		if (!isInCart) {
			addItem(
				homeCartItem?.product as Product,
				homeCartItem?.quantity as number
			)
		} else {
			setIsCartDrawerShown(true)
		}
	}
	return (
		<Button
			className="fixed w-10/12 bottom-0"
			onClick={handleAddToCart}
		>
			{isInCart ? 'Go to cart' : 'Add to cart'}
		</Button>
	)
}

interface DrawerCartButtonProps {
	price: number
	quantity: number
	isInCart: boolean | undefined
	handleCartDrawer: () => void
	handleAddToCart: () => void
}

export const DrawerCartButton: React.FC<DrawerCartButtonProps> = ({
	price,
	quantity,
	isInCart,
	handleCartDrawer,
	handleAddToCart,
}) => {
	const handleClick = () => {
		if (isInCart) {
			handleCartDrawer()
		} else {
			handleAddToCart()
		}
	}
	return (
		<Button
			className="flex justify-between h-14 rounded-full"
			onClick={handleClick}
		>
			{isInCart ? (
				<p>Go to cart</p>
			) : (
				<>
					<p>To cart</p>
					<p>${(price * quantity).toFixed(1)}</p>
				</>
			)}
		</Button>
	)
}
