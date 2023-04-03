import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import Select from './components/select'

const MovieCard = ({ title, image, date, average_rating, doAthing }) => {

  return (
    <div className='movieCard'>
      <h2>{title}</h2>
      <input className='movieImage' type='image' src={image} alt="poster" onClick={doAthing} />
      <h3>{date}</h3>
      <p>{average_rating}</p>
    </div>
  )

}

function App() {
  const [count, setCount] = useState(0)
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [moviesBackUp, setBackup] = useState([])
  const [sort, setSort] = useState('default')

  const navigate = useNavigate()

  const handleMovieClick = (movie) => {
    console.log(movie.title)
    navigate(`/movie/${movie.id}`)

  }



  const handleSort = () => {
    console.log(sort)
    switch (sort) {
      case 'rating':
        setMovies([...movies].sort((a, b) => b.average_rating - a.average_rating))
        console.log('should be sorting')
        break;

      default:
        setMovies(moviesBackUp)
        console.log('should be set to default')
        break;
    }
  }


  const getMovies = async () => {
    const url = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
    try {
      const response = await fetch(url)
      const moviesArray = await response.json()
      setMovies(moviesArray.movies)
      setBackup(moviesArray.movies)

    }

    catch (error) {
      setError(error.message)
    }

  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      hiii
      <div className='arrange'>
        <Select
          label={'Sort By'}
          options={[
            { label: 'Default', value: 'default' },
            { label: 'Rating', value: 'rating' },
          ]
          } value={sort}
          onChange={(event) => setSort(event.target.value)} onClick={handleSort} />
      </div>
      <div className='cards'>
        {movies.map(movie => (<MovieCard key={movie.id} title={movie.title} image={movie.poster_path} date={movie.release_date} average_rating={movie.average_rating} doAthing={() => handleMovieClick(movie)} />))}
      </div>
    </div>
  )
}

export default App

