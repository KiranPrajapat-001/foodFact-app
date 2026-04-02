import FoodCard from './FoodCard'
import { useSelector } from 'react-redux'

function FoodList({ products = [] }) {
  // dispatch not used in FoodList
  const savedItems = useSelector(state => state.saved.items);
  const savedCodes = new Set(savedItems.map(item => item.code));
  
  if (!products.length) return <p className="loading">No results found</p>

  return (
    <div className="food-list">
      {products.map((item) => (
        <FoodCard
          key={item.code}
          product={item}
          isSaved={savedCodes.has(item.code)}
        />
      ))}
    </div>
  )
}

export default FoodList
