import axios from "axios"

export const getProducts = async (id = "") => {
  try {
    const url = id
      ? `https://fakestoreapi.com/products/${id}`
      : "https://fakestoreapi.com/products"

    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error("Failed to fetch ", error)
    return []
}
}