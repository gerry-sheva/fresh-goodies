import Image from 'next/image'
import NavBar from './components/NavBar'
import ProductCard from './components/Card'
import CartButton from './components/CartButton'

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col px-4">
			<NavBar />
			<section className="grid grid-cols-2 gap-2]">
				<ProductCard
					itemName="Cucumbers"
					pricePerUnit={0.0032}
				/>
				<ProductCard
					itemName="Beets"
					pricePerUnit={0.003}
				/>
			</section>
			<CartButton />
		</main>
	)
}
