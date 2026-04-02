import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function DetailPage() {
  const { barcode } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const savedItems = useSelector(state => state.saved.items)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `/mealdb/www/api/json/v1/1/lookup.php?i=${barcode}`
        )

        if (!cancelled) {
          const meal = res.data.meals?.[0]
          if (!meal) {
            setError('❌ Meal not found')
          } else {
            setProduct({
              product_name: meal.strMeal,
              image_url: meal.strMealThumb,
              code: meal.idMeal,
              nutriments: { 
                energy_kcal: 'Recipe calories vary', 
                fat: 'N/A', 
                carbohydrates: 'N/A', 
                proteins: 'N/A',
                salt: 'N/A',
                sugars: 'N/A'
              }
            })
          }
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError('⚠️ Error loading meal details')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const isSaved = savedItems.some(p => p.code === barcode)

  const handleSave = () => {
    if (!product) return

    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product })
    }
  }

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Loading meal details...</Typography>
      </Container>
    )
  }

  if (error || !product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>{error || 'No meal data available'}</Typography>
        <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
          <Box
            component="img"
            src={product.image_url || "https://via.placeholder.com/200"}
            alt={product.product_name}
            sx={{ width: 200, height: 200, objectFit: 'contain', borderRadius: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {product.product_name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              🍳 Recipe Details
            </Typography>
            <Button
              variant={isSaved ? 'outlined' : 'contained'}
              color={isSaved ? 'error' : 'primary'}
              startIcon={isSaved ? '★' : '☆'}
              onClick={handleSave}
              sx={{ mt: 1 }}
            >
              {isSaved ? 'Remove from Saved' : 'Save to My List'}
            </Button>
          </Box>
        </Box>

        <Typography variant="h5" gutterBottom>
          🍽 Nutrition Info
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Recipe calories vary based on portions and preparation. 
            Check individual recipe instructions for detailed nutrition.
          </Typography>
        </Paper>
      </Paper>
    </Container>
  )
}

export default DetailPage
