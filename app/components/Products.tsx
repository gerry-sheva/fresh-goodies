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
	return (
		<section>
			<div className="grid grid-cols-2">
				{products.map((product) => (
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
		if (quantity > 0) {
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
