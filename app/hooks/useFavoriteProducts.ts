import { config } from '@/constants/url'
import { FavoriteProduct } from '@/types/product'
import { useEffect, useState } from 'react'

const useFavoriteProducts = () => {
	const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>(
		[]
	)

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(
				config.BASE_URL + config.endpoints.favoriteProducts
			)
			const data = await res.json()

			setFavoriteProducts(data)
		}
		fetchData()
	}, [])

	return favoriteProducts
}

export default useFavoriteProducts
