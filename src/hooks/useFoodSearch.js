import { useState } from 'react'
import axios from 'axios'

function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchFood = async (query) => {
    const normalized = (query || '').trim()
    if (!normalized) {
      setResults([])
      setError('Please enter a search term.')
      return
    }

    setLoading(true)
    setError(null)

    try {
        const response = await axios.get(
          `/mealdb/api/json/v1/1/search.php?s=${normalized}`
        )

      const meals = response.data.meals || []
      const filtered = meals
        .filter(m => m.strMeal)
        .map(m => ({
          product_name: m.strMeal,
          image_small_url: m.strMealThumb,
          code: m.idMeal
        }))
        .slice(0, 10)

      if (filtered.length === 0) {
        setError('No meals found matching your search. Try different terms.')
        setResults([])
      } else {
        setResults(filtered)
      }
    } catch (err) {
      console.error('Meal search failed', err)
      if (err.response) {
        setError(`Server error: ${err.response.status}`)
      } else if (err.request) {
        setError('Network error. Check connection.')
      } else {
        setError('Something went wrong.')
      }
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, searchFood }
}

export default useFoodSearch