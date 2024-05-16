'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import useProduct from '../hooks/useProduct'
import { Product } from '@/types/product'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import CartButton from './CartButton'
import { useBoundedStore } from '../hooks/useZustand'

const Products: React.FC = () => {
	const { products, categories, productGroup } = useProduct()
	const [activeCategory, setActiveCategory] = useState<string>('')
	const [isDrawerShown, setIsDrawerShown] = useState<boolean>(false)

	const activeProduct = useBoundedStore((state) => state.activeProduct)
	const setActiveProduct = useBoundedStore((state) => state.setActiveProduct)

	const displayedProducts =
		activeCategory && productGroup ? productGroup[activeCategory] : products

	const handleCyclingActiveProduct = (next: boolean) => {
		const index = displayedProducts.findIndex(
			(product) => product.id === activeProduct?.id
		)
		if (next) {
			if (index === displayedProducts.length - 1) {
				setActiveProduct(displayedProducts[0])
			} else {
				setActiveProduct(displayedProducts[index + 1])
			}
		} else {
			if (index === 0) {
				setActiveProduct(displayedProducts[displayedProducts.length - 1])
			} else {
				setActiveProduct(displayedProducts[index - 1])
			}
		}
	}

	return (
		<section>
			<CategoryFilter
				categories={categories}
				setActiveCategory={setActiveCategory}
			/>
			<div className="grid grid-cols-2">
				{displayedProducts.map((product) => (
					<ProductCard
						setIsDrawerShown={setIsDrawerShown}
						product={product}
						key={product.id}
					/>
				))}
			</div>
			<CartButton />
			<ProductDrawer
				isDrawerShown={isDrawerShown}
				setIsDrawerShown={setIsDrawerShown}
				handleCyclingActiveProduct={handleCyclingActiveProduct}
			/>
		</section>
	)
}

export default Products

interface ProductDrawerProps {
	isDrawerShown: boolean
	setIsDrawerShown: React.Dispatch<React.SetStateAction<boolean>>
	handleCyclingActiveProduct: (next: boolean) => void
}

const ProductDrawer: React.FC<ProductDrawerProps> = ({
	isDrawerShown,
	setIsDrawerShown,
	handleCyclingActiveProduct,
}) => {
	const activeProduct = useBoundedStore((state) => state.activeProduct)
	return (
		<Drawer
			open={isDrawerShown}
			onOpenChange={setIsDrawerShown}
		>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle onClick={() => handleCyclingActiveProduct(true)}>
						{activeProduct?.name}
					</DrawerTitle>
					<DrawerDescription onClick={() => handleCyclingActiveProduct(false)}>
						This action cannot be undone.
					</DrawerDescription>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	)
}

interface ProductCardProps {
	product: Product
	setIsDrawerShown: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductCard: React.FC<ProductCardProps> = ({
	setIsDrawerShown,
	product,
}) => {
	const [quantity, setQuantity] = useState<number>(1000)
	const setActiveProduct = useBoundedStore((state) => state.setActiveProduct)

	const handleOpenDrawer = () => {
		setActiveProduct(product)
		setIsDrawerShown(true)
	}

	return (
		<Card className="col-span-1">
			<div onClick={handleOpenDrawer}>
				<CardHeader>
					<Image
						src={'/products/cucumber.png'}
						width={150}
						height={120}
						alt="product image"
					/>
				</CardHeader>
				<CardContent>
					<CardTitle>${(product.price * quantity).toFixed(1)}</CardTitle>
					<CardDescription>{product.name}</CardDescription>
				</CardContent>
			</div>
			<CardFooter>
				<Counter
					quantity={quantity}
					setQuantity={setQuantity}
				/>
			</CardFooter>
		</Card>
	)
}

interface CounterProps {
	quantity: number
	setQuantity: React.Dispatch<React.SetStateAction<number>>
}

const Counter: React.FC<CounterProps> = ({ quantity, setQuantity }) => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const handleIncrement = () => {
		if (isActive) {
			setQuantity((prev) => prev + 100)
		} else {
			setIsActive(true)
		}
	}

	const handleDecrement = () => {
		if (quantity > 100) {
			setQuantity((prev) => prev - 100)
		}
	}
	return (
		<div className="w-full flex justify-between items-center">
			{isActive && (
				<div onClick={handleDecrement}>
					<FaMinus />
				</div>
			)}
			<p>{quantity}g</p>
			<div onClick={handleIncrement}>
				<FaPlus />
			</div>
		</div>
	)
}

interface CategoryFilterProps {
	categories: string[]
	setActiveCategory: React.Dispatch<React.SetStateAction<string>>
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
	categories,
	setActiveCategory,
}) => {
	return (
		<div className="flex flex-nowrap text-nowrap overflow-x-scroll gap-4">
			<div onClick={() => setActiveCategory('')}>All</div>
			{categories.map((category, index) => (
				<div
					key={index}
					onClick={() => setActiveCategory(category)}
				>
					{category}
				</div>
			))}
		</div>
	)
}
