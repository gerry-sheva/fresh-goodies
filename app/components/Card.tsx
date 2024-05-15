'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { useState } from 'react'
import { Item } from '../types'
import useCart from '../hooks/cart'

interface ProductCardProps {
	itemName: string
	pricePerUnit: number
}

const ProductCard: React.FC<ProductCardProps> = ({
	itemName,
	pricePerUnit,
}) => {
	const [itemQuantity, setItemQuantity] = useState<Item>({
		amount: 1000,
		price: pricePerUnit * 1000,
	})

	const updateCart = useCart((state) => state.updateCart)

	const handleSetItemQuantity = (item: Item, priceDiff: number) => {
		setItemQuantity(item)
		updateCart(itemName, item, priceDiff)
	}
	return (
		<Card>
			<CardHeader>
				<Image
					src={'/products/cucumber.png'}
					width={145}
					height={115}
					alt="product image"
				/>
			</CardHeader>
			<CardContent>
				<CardDescription>${itemQuantity.price}</CardDescription>
				<CardTitle className="text-xs">{itemName}</CardTitle>
			</CardContent>
			<CardFooter>
				<Counter
					item={itemQuantity}
					handleSetItemQuantity={handleSetItemQuantity}
					price={pricePerUnit}
					itemName={itemName}
				/>
			</CardFooter>
		</Card>
	)
}

export default ProductCard

interface CounterProps {
	item: Item
	handleSetItemQuantity: (item: Item, priceDiff: number) => void
	price: number
	itemName: string
}

const Counter: React.FC<CounterProps> = ({
	item,
	handleSetItemQuantity,
	price,
}) => {
	const [amount, setAmount] = useState<number>(item.amount)
	const [totalPrice, setTotalPrice] = useState<number>(0)

	const handleIncrement = () => {
		const newAmount = amount + 100
		const newTotalPrice = newAmount * price
		const priceDiff = totalPrice
		setAmount(newAmount)
		setTotalPrice(newTotalPrice)
		handleSetItemQuantity(
			{ amount: newAmount, price: newTotalPrice },
			priceDiff
		)
		console.log('Price diff: ', priceDiff)
		console.log('NEW TOTAL PRICE: ', newTotalPrice)
	}

	const handleDecrement = () => {
		if (amount > 1000) {
			const newAmount = amount - 100
			const newTotalPrice = newAmount * price
			const priceDiff = totalPrice
			setAmount(newAmount)
			setTotalPrice(newTotalPrice)
			handleSetItemQuantity(
				{ amount: newAmount, price: newTotalPrice },
				priceDiff
			)
			console.log(priceDiff)
			console.log(newTotalPrice)
		}
	}

	const handlePrint = () => {
		console.log(item)
	}
	return (
		<div className="flex bg-red-50">
			<div onClick={handleDecrement}>-</div>
			<p onClick={handlePrint}>{amount}</p>
			<div onClick={handleIncrement}>+</div>
		</div>
	)
}
