'use client'
import NavBar from './components/NavBar'
import CartButton from './components/CartButton'
import ProductCard from './components/Card'
import useProduct from './hooks/useProduct'

export default function Home() {
	const { products, categories, productGroup } = useProduct()
	return (
		<main className="flex min-h-screen flex-col px-4">
			<NavBar />
			<section className="grid grid-cols-2 gap-2]">
				<ProductCard />
			</section>
			<CartButton />
		</main>
	)
}
