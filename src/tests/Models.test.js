import MovieList from '../js/models/MovieList';
import Genres from '../js/models/Genres'

describe('Models check', () => {
  
  let movies = [{
    id : '14'
  }]
  let movieList = new MovieList();

  movieList.addMovies(movies, [])
  it('movie model check', () => {
      expect.assertions(10)
      expect((movieList.movieList)).toHaveLength(1)
      expect((movieList.movieList[0].genreIds)).toStrictEqual(['other'])
      expect((movieList.movieList[0].releaseDate)).toStrictEqual('Unknown release date')
      expect((movieList.movieList[0].voteAverage)).toStrictEqual('')
      expect((movieList.movieList[0].overview)).toStrictEqual('No overview')
      expect((movieList.movieList[0].title)).toStrictEqual('No Title')

      movieList.movieList[0].toggleExpand()
      expect(movieList.movieList[0].expanded).toStrictEqual(true)
      expect(movieList.movieList[0].loadedDetails).toStrictEqual(false)

      movieList.movieList[0].setDetails([])
      expect(movieList.movieList[0].details).toStrictEqual([])
      expect(movieList.movieList[0].loadedDetails).toStrictEqual(true)
    })

    let moviesNew = [
      {
        id: 14,
        releaseDate : "15-5-2009"
      }
    ];

    it('movieList functions check', () => {

      movieList.clearMovies()

      expect.assertions(6)
      expect(movieList.movieList).toStrictEqual([])

      let cacheReturn = movieList.cacheMovies(moviesNew)
      expect(moviesNew).toStrictEqual(cacheReturn)
      expect(movieList.movieList).toContain(moviesNew[0])

      let searchresult = movieList.findId('14')
      expect(searchresult).toBe(movieList.movieList[0])

      searchresult = movieList.findId('16')
      expect(searchresult).toBeUndefined()

      let movieListaddEmpty = new MovieList();
      movieListaddEmpty.addMovies([], [])
      expect(movieListaddEmpty.movieList).toStrictEqual([])

    })

    it('Genres check', () => { 
      let genres = new Genres()
      genres.addGenres([{id:14,name:"Comedy"},{id:15,name:"Horror"}])
      expect.assertions(2)
      let genre = genres.getGenre("14");
      expect(genre).toBe("Comedy")
      genre = genres.getGenre(100);
      expect(genre).toBe("other")
    })  
})
