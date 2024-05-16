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
import { CartButton } from './CartButton'
import { useBoundedStore } from '../hooks/useZustand'
import { CardCounter } from './Counter'
import { CartDrawer, ProductDrawer } from './Drawer'

const Products: React.FC = () => {
	const { products, categories, productGroup } = useProduct()
	const [activeCategory, setActiveCategory] = useState<string>('')
	const [isProductDrawerShown, setIsProductDrawerShown] =
		useState<boolean>(false)
	const [isCartDrawerShown, setIsCartDrawerShown] = useState<boolean>(false)
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
						setIsDrawerShown={setIsProductDrawerShown}
						product={product}
						key={product.id}
					/>
				))}
			</div>
			<CartButton />
			<ProductDrawer
				isProductDrawerShown={isProductDrawerShown}
				setIsProductDrawerShown={setIsProductDrawerShown}
				setIsCartDrawerShown={setIsCartDrawerShown}
				handleCyclingActiveProduct={handleCyclingActiveProduct}
			/>
			<CartDrawer
				isCartDrawerShowm={isCartDrawerShown}
				setIsCartDrawerShown={setIsCartDrawerShown}
			/>
		</section>
	)
}

export default Products

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
				<CardCounter
					quantity={quantity}
					setQuantity={setQuantity}
				/>
			</CardFooter>
		</Card>
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
