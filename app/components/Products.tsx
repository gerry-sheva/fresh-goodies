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

const Products: React.FC = () => {
	const { products, categories, productGroup } = useProduct()
	const [activeCategory, setActiveCategory] = useState<string>('Roots')

	const displayedProducts =
		activeCategory && productGroup ? productGroup[activeCategory] : products

	return (
		<section>
			<CategoryFilter
				categories={categories}
				setActiveCategory={setActiveCategory}
			/>
			<div className="grid grid-cols-2">
				{displayedProducts.map((product) => (
					<ProductCard
						{...product}
						key={product.id}
					/>
				))}
			</div>
			<CartButton />
		</section>
	)
}

export default Products

const ProductDrawer: React.FC<React.PropsWithChildren<Product>> = ({
	children,
	...product
}) => {
	console.log(children)
	return (
		<Drawer>
			<DrawerTrigger>{children}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{product.name}</DrawerTitle>
					<DrawerDescription>This action cannot be undone.</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<Button>Submit</Button>
					<DrawerClose>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

const ProductCard: React.FC<Product> = (product) => {
	const [quantity, setQuantity] = useState<number>(1000)
	return (
		<Card className="col-span-1">
			<ProductDrawer {...product}>
				<CardHeader>
					<Image
						src={'/products/cucumber.png'}
						width={150}
						height={120}
						alt="product image"
					/>
				</CardHeader>
				<CardContent>
					<CardTitle>${product.price * quantity}</CardTitle>
					<CardDescription>{product.name}</CardDescription>
				</CardContent>
			</ProductDrawer>
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
