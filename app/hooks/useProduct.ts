import { config } from '@/constants/url'
import { Product } from '@/types/product'
import { useEffect, useState } from 'react'

interface ProductGroup {
	[key: string]: Product[]
}

const useProduct = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [productGroup, setProductGroup] = useState<ProductGroup>()

	useEffect(() => {
		const fetchData = async () => {
			// Retrieve the data from server
			const res = await fetch(config.BASE_URL + config.endpoints.products)
			const data = (await res.json()) as Product[]

			const uniqueCategories = Array.from(
				new Set(data.map((product) => product.category))
			)
			const gropuData: ProductGroup = {}

			uniqueCategories.forEach((category) => {
				const currentCategoryProducts = data.filter(
					(product) => product.category === category
				)
				gropuData[category] = currentCategoryProducts
			})

			setProducts(data)
			setCategories(uniqueCategories)
			setProductGroup(gropuData)
		}
		fetchData()
	}, [])

	return { products, categories, productGroup }
}

export default useProduct
