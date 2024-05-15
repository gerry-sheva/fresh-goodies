'use client'

import useCart from '../hooks/cart'

const NavBar = () => {
	const totalPrice = useCart((state) => state.totalPrice)
	const cart = useCart((state) => state.cart)

	const handlePrint = () => {
		console.log(cart)
		console.log(totalPrice)
	}
	return (
		<nav
			className="w-screen flex justify-between"
			onClick={handlePrint}
		>
			<h1>Vegetables</h1>
			<div>{totalPrice}</div>
		</nav>
	)
}

export default NavBar
