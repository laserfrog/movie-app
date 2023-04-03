import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


const Movie = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState({})

    const getMovie = async () => {
        const url = `https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`
        try {
            const response = await fetch(url)
            const movie = await response.json()
            console.log(movie.movie);
            setMovie(movie.movie)

        }

        catch (error) {

        }

    }

    useEffect(() => {
        getMovie()
    }, [])

    return (
        <div>
            <img className="movieImage" src={movie.poster_path} />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <Link to={'/'}>Go back</Link>
        </div>
    )
}

export default Movie