'use client'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import useProduct from '../hooks/useProduct'
import { Product } from '@/types/product'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaMinus, FaPlus } from 'react-icons/fa6'

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
		</section>
	)
}

export default Products

const ProductCard: React.FC<Product> = (item) => {
	const [quantity, setQuantity] = useState<number>(1000)
	return (
		<Card className="col-span-1">
			<CardHeader>
				<Image
					src={'/products/cucumber.png'}
					width={150}
					height={120}
					alt="product image"
				/>
			</CardHeader>
			<CardContent>
				<CardTitle>${item.price * quantity}</CardTitle>
				<CardDescription>{item.name}</CardDescription>
			</CardContent>
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
