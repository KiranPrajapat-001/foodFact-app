import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
// import { red } from '@mui/material/colors'
import "./homepage.css"
function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch()
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (query) => {
    setHasSearched(true)
    searchFood(query)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h1" gutterBottom fontWeight={800} sx={{ textAlign: 'center', my: 4 }}>
        🥗 FoodFacts
      </Typography>
      <Typography className='search_heading' variant="h4"  gutterBottom fontWeight={800}>
        
             Search Nutrition Info
          
      
      </Typography>

      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {!loading && hasSearched && results.length === 0 && !error && (
        <div className="no-results">
          <h4>No results found</h4>
          <p>Try search keywords like: milk, apple, cereal</p>
        </div>
      )}

      <FoodList products={results} />
    </Container>
  )
}

export default HomePage
