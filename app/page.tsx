import Image from 'next/image'
import NavBar from './components/NavBar'
import CartButton from './components/CartButton'

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col px-4">
			<NavBar />
			<section className="grid grid-cols-2 gap-2]"></section>
			<CartButton />
		</main>
	)
}
