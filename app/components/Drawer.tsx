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
import Image from 'next/image'
import { useState } from 'react'
import { useBoundedStore } from '../hooks/useZustand'
import { DrawerCounter } from './Counter'
import { DrawerCartButton } from './CartButton'

interface ProductDrawerProps {
	isDrawerShown: boolean
	setIsDrawerShown: React.Dispatch<React.SetStateAction<boolean>>
	handleCyclingActiveProduct: (next: boolean) => void
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({
	isDrawerShown,
	setIsDrawerShown,
	handleCyclingActiveProduct,
}) => {
	const [quantity, setQuantity] = useState<number>(1000)
	const activeProduct = useBoundedStore((state) => state.activeProduct)
	return (
		<Drawer
			open={isDrawerShown}
			onOpenChange={setIsDrawerShown}
		>
			<DrawerContent className="h-[90vh]">
				<DrawerHeader className="flex flex-col items-start">
					<Image
						src={'/products/cucumber.png'}
						width={450}
						height={300}
						alt="product image"
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
					<DrawerCounter
						quantity={quantity}
						setQuantity={setQuantity}
					/>
					<DrawerCartButton
						price={activeProduct?.price as number}
						quantity={quantity}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
export const CartDrawer = () => {}
