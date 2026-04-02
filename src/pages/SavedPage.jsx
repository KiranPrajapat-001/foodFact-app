import { useSelector, useDispatch } from 'react-redux'
import FoodList from '../components/FoodList'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function SavedPage() {
  const dispatch = useDispatch()
  const saved = useSelector(state => state.saved.items)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={800}>
        My Saved Items ({saved.length})
      </Typography>
      
      {saved.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center', py: 4 }}>
          No saved items yet. Search and save some foods!
        </Typography>
      ) : (
        <FoodList products={saved} saved={saved} dispatch={dispatch} />
      )}
    </Container>
  )
}

export default SavedPage
