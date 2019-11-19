export default class Movie {
  constructor(movie, genreNames) {
    this.id = movie.id;
    this.posterPath = movie.poster_path ? movie.poster_path : '';
    this.title = movie.title ? movie.title : 'No Title';
    this.releaseDate = movie.release_date ? movie.release_date : 'Unknown release date';
    this.genreIds = genreNames ? genreNames : [];
    this.voteAverage = movie.vote_average ? movie.vote_average : '';
    this.overview = movie.overview ? movie.overview : 'No overview';
    this.expanded = false;
    this.loadedDetails = false;
    this.details = {};
  }

  //toggle expander
  toggleExpand() {
    this.expanded = !this.expanded;
  }

  //check if details are loaded to expand
  loadedDetails() {
    return this.loadedDetails;
  }

  //set details to the movie
  setDetails(details) {
    this.loadedDetails = true;
    this.details = details;
  }
}
