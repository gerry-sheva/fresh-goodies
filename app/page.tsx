import NavBar from './components/NavBar'
import CartButton from './components/CartButton'
import Products from './components/Products'

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col px-4">
			<NavBar />
			<Products />
			<CartButton />
		</main>
	)
}
