import { Button } from '@/components/ui/button'
import React from 'react'

export const CartButton: React.FC = () => {
	return <Button className="fixed w-10/12 bottom-0">Cart</Button>
}

interface DrawerCartButtonProps {
	price: number
	quantity: number
}

export const DrawerCartButton: React.FC<DrawerCartButtonProps> = ({
	price,
	quantity,
}) => {
	return (
		<Button className="flex justify-between h-14 rounded-full">
			<p>To cart</p>
			<p>${(price * quantity).toFixed(1)}</p>
		</Button>
	)
}
