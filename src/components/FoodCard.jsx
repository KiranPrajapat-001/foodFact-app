import { useNavigate } from 'react-router-dom'

function FoodCard({ product, isSaved = false }) {
  const navigate = useNavigate()

  const {
    product_name,
    brands,
    nutriments,
    image_small_url,
    code
  } = product

  const energy = nutriments?.energy_kcal || nutriments?.energy || 'N/A'

  return (
    <div className="food-card-small">
      <div 
        onClick={() => navigate(`/product/${code}`)} 
        className="food-card-click"
      >
        <img
          src={image_small_url || 'https://via.placeholder.com/120x100?text=?'}
          alt={product_name}
          className="food-img-small"
        />
        <div className="food-info-small">
          <h4 className="food-name-small">{product_name || 'Unknown Product'}</h4>
          <div className="food-card-meta">
            <span>{brands || 'No brand'}</span>
            <span>{energy} kcal</span>
          </div>
          <div style={{ display: 'flex', gap: '7px', alignItems: 'center', marginTop: '4px' }}>
            <span className="recipe-tag">🍳</span>
            {isSaved && <span className="saved-dot">★</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
