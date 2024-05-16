import { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

interface CardCounterProps {
	quantity: number
	setQuantity: React.Dispatch<React.SetStateAction<number>>
}

interface DrawerCounterProps {
	quantity: number
	setQuantity: React.Dispatch<React.SetStateAction<number>>
}

export const CardCounter: React.FC<CardCounterProps> = ({
	quantity,
	setQuantity,
}) => {
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

export const DrawerCounter: React.FC<DrawerCounterProps> = ({
	quantity,
	setQuantity,
}) => {
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
		<div className="w-full flex justify-between items-center h-14 px-4 bg-gray-50 rounded-full">
			<div onClick={handleDecrement}>
				<FaMinus />
			</div>
			<p>{quantity}g</p>
			<div onClick={handleIncrement}>
				<FaPlus />
			</div>
		</div>
	)
}
