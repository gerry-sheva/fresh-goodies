import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer'
import Image from 'next/image'
import { useState } from 'react'
import { useBoundedStore } from '../hooks/useZustand'
import { CartCounter, DrawerCounter } from './Counter'
import { DrawerCartButton } from './CartButton'
import { Product } from '@/types/product'
import { CartItem } from '@/types/cart'
import { Button } from '@/components/ui/button'
import { Heart, X } from 'lucide-react'

interface ProductDrawerProps {
	isProductDrawerShown: boolean
	setIsProductDrawerShown: React.Dispatch<React.SetStateAction<boolean>>
	setIsCartDrawerShown: React.Dispatch<React.SetStateAction<boolean>>
	handleCyclingActiveProduct: (next: boolean) => void
}

interface CartDrawerProps {
	isCartDrawerShowm: boolean
	setIsCartDrawerShown: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({
	isProductDrawerShown,
	setIsProductDrawerShown,
	setIsCartDrawerShown,
	handleCyclingActiveProduct,
}) => {
	const [quantity, setQuantity] = useState<number>(1000)
	const activeProduct = useBoundedStore((state) => state.activeProduct)
	const items = useBoundedStore((state) => state.items)
	const favoriteProducts = useBoundedStore((state) => state.favoriteProducts)
	const addItem = useBoundedStore((state) => state.addItem)
	const addToFavorite = useBoundedStore((state) => state.addToFavorite)
	const removeFromFavorite = useBoundedStore(
		(state) => state.removeFromFavorite
	)

	const isInCart: boolean | undefined =
		items.find((item) => item.product.id === activeProduct?.id) && true

	const isFavorite: boolean | undefined =
		favoriteProducts.find((item) => item.productId === activeProduct?.id) &&
		true

	const handleCartDrawer = () => {
		setIsProductDrawerShown(false)
		setIsCartDrawerShown(true)
	}

	const handleAddToCart = () => {
		addItem(activeProduct as Product, quantity)
	}

	const handleFavorite = (id: number): void => {
		if (isFavorite) {
			removeFromFavorite(id)
		} else {
			addToFavorite(id)
		}
	}

	return (
		<Drawer
			open={isProductDrawerShown}
			onOpenChange={setIsProductDrawerShown}
			onClose={() => setQuantity(1000)}
		>
			<DrawerContent className="h-[90vh]">
				<DrawerHeader className="flex flex-col items-start">
					<Image
						src={'/products/cucumber.png'}
						width={450}
						height={300}
						alt="product image"
						onClick={handleCartDrawer}
					/>
					<DrawerTitle onClick={() => handleCyclingActiveProduct(true)}>
						{activeProduct?.name}
					</DrawerTitle>
				</DrawerHeader>
				<div className="flex flex-col px-4">
					<DrawerDescription onClick={() => handleCyclingActiveProduct(false)}>
						in {activeProduct?.metadata.weight}{' '}
						{activeProduct?.metadata.unit === 'g' ? 'grams' : 'kilos'}
					</DrawerDescription>
					<div className="flex items-center justify-around h-20 border-[1px] rounded-xl">
						<div className="flex flex-col items-center justify-center">
							<p>{activeProduct?.metadata.calorie}</p>
							<p>calorie</p>
						</div>
						<div className="flex flex-col items-center justify-center">
							<p>{activeProduct?.metadata.proteins}</p>
							<p>proteins</p>
						</div>
						<div className="flex flex-col items-center justify-center">
							<p>{activeProduct?.metadata.fats}</p>
							<p>fats</p>
						</div>
						<div className="flex flex-col items-center justify-center">
							<p>{activeProduct?.metadata.carbs}</p>
							<p>carbs</p>
						</div>
					</div>
					<div className="flex items-center ">
						<DrawerCounter
							quantity={quantity}
							setQuantity={setQuantity}
						/>
						<div
							className="rounded-full w-10"
							onClick={() => handleFavorite(activeProduct?.id as number)}
						>
							<Heart
								className={`${isFavorite && 'text-red-500 fill-red-500'}`}
							/>
						</div>
					</div>
					<DrawerCartButton
						price={activeProduct?.price as number}
						quantity={quantity}
						isInCart={isInCart}
						handleCartDrawer={handleCartDrawer}
						handleAddToCart={handleAddToCart}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
export const CartDrawer: React.FC<CartDrawerProps> = ({
	isCartDrawerShowm,
	setIsCartDrawerShown,
}) => {
	const items = useBoundedStore((state) => state.items)
	const removeItem = useBoundedStore((state) => state.removeItem)

	const totalPrice = items.reduce(
		(acc, value) => acc + value.product.price * value.quantity,
		0
	)

	const handleRemoveItem = (id: number) => {
		removeItem(id)
		console.log(items.length)
		if (items.length - 1 === 0) {
			setIsCartDrawerShown(false)
		}
	}

	return (
		<Drawer
			open={isCartDrawerShowm}
			onOpenChange={setIsCartDrawerShown}
		>
			<DrawerContent className="h-[90vh] flex flex-col justify-around">
				<DrawerHeader className="flex flex-col items-start">
					<DrawerTitle>Cart</DrawerTitle>
					<DrawerDescription>Before free shipping $4.20</DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-col px-4 h-3/5">
					{items.map((item, index) => (
						<Item
							key={index}
							item={item}
							handleRemoveItem={handleRemoveItem}
						/>
					))}
				</div>
				<Button className="flex justify-between">
					<p>Print cart</p>
					<p>{totalPrice.toFixed(2)}</p>
				</Button>
			</DrawerContent>
		</Drawer>
	)
}

interface ItemProps {
	item: CartItem
	handleRemoveItem: (id: number) => void
}

const Item: React.FC<ItemProps> = ({ item, handleRemoveItem }) => {
	const [quantity, setQuantity] = useState(item.quantity)
	const updateItemQuantity = useBoundedStore(
		(state) => state.updateItemQuantity
	)
	const handleIncrement = () => {
		const newQuantity = quantity + 100
		setQuantity(newQuantity)
		updateItemQuantity(item.product.id, newQuantity)
	}
	const handleDecrement = () => {
		if (quantity > 100) {
			const newQuantity = quantity - 100
			setQuantity(newQuantity)
			updateItemQuantity(item.product.id, newQuantity)
		}
	}

	return (
		<div className="h-24 flex flex-col justify-between px-4">
			<div className="flex justify-between">
				<p>{item.product.name}</p>
				<X onClick={() => handleRemoveItem(item.product.id)} />
			</div>
			<div className="flex justify-between gap-10">
				<CartCounter
					handleIncrement={handleIncrement}
					handleDecrement={handleDecrement}
					quantity={quantity}
				/>
				<p>{(item.product.price * quantity).toFixed(2)}</p>
			</div>
		</div>
	)
}
