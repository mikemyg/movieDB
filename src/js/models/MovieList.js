import Movie from './Movie';

export default class MovieList {
  constructor() {
    this.movieList = [];
  }

  //fill the movie list
  addMovies(movies, genres) {  
    const newMovies = movies.map((movie) => {
      let genreNames;
      if (genres.length !== 0){
        genreNames = movie.genre_ids.map( id => {
          return genres.getGenre(id)
        })
      }else{
        genreNames = ["other"]
      }
      const newMovie = new Movie(movie, genreNames);
      this.movieList.push(newMovie);

      return newMovie
    });

    return newMovies;
  }

  //set again cached movie list
  cacheMovies(movies) {
    this.movieList = this.movieList.concat(movies)
    return this.movieList;
  }

  //clear the list
  clearMovies() {
    this.movieList = [];
  }

  //find item by id in array
  findId(searchId) {
    let movie = this.movieList.find( ({ id }) => id.toString() === searchId)
    return movie;
  }
}
