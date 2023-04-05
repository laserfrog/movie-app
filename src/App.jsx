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
  const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [moviesBackUp, setBackup] = useState([])
  const [sort, setSort] = useState('release_date')
  const [asc, setAsc] = useState(true)

  const navigate = useNavigate()

  const handleMovieClick = (movie) => {
    console.log(movie.title)
    navigate(`/movie/${movie.id}`)

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


  useEffect(() => {
    const handleSort = () => {
      console.log(sort)
      switch (sort) {
        case 'average_rating':
          setMovies([...movies].sort((a, b) => b.average_rating - a.average_rating))
          console.log('should be sorting')
          break;

        case 'title':
          console.log('this should be title????');
          setMovies([...movies].sort((a, b) => {
            let fa = a.title.toLowerCase(),
              fb = b.title.toLowerCase()

            if (fa < fb) {
              return -1
            }
            if (fa > fb) {
              return 1
            }
            return 0
          }))
          break

        case 'release_date':
          setMovies([...movies].sort((a, b) => {
            let fa = b.release_date,
              fb = a.release_date

            if (fa < fb) {
              return -1
            }
            if (fa > fb) {
              return 1
            }
            return 0
          }))
          break

        default:
          setMovies(moviesBackUp)

          break;
      }
    }
    handleSort()
  }, [sort])

  const handleAsc = () => {
    setAsc(!asc)
    setMovies([...movies].reverse())
  }

  return (
    <div className="App">
      hiii
      <div className='arrange'>
        <Select
          label={'Sort By'}
          options={[
            { label: 'Release Date', value: 'release_date' },
            { label: 'Rating', value: 'average_rating' },
            { label: 'Title', value: 'title' },
          ]
          }
          asc={asc}
          onClick={handleAsc}
          onChange={(event) => setSort(event.target.value)} />
      </div>
      <div className='cards'>
        {movies.map(movie => (<MovieCard key={movie.id} title={movie.title} image={movie.poster_path} date={movie.release_date} average_rating={movie.average_rating} doAthing={() => handleMovieClick(movie)} />))}
      </div>
    </div>
  )
}

export default App

