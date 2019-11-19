import { elements } from './base';
import { imageUrl } from '../config'

//render a movie
export const renderMovie = movie => {
  let genresHTML = renderGenres(movie.genreIds)  
  const markup = `<li id="card${movie.id}" class="card">
                    <div class="image-container"><img id="${movie.id}" class="image js-expand" src="${imageUrl}${movie.posterPath}" onerror="this.src='assets/no-image.png';" /></div>
                    <div class="card-details">
                        <div class="card-upper">
                            <h4 class="card-header">${movie.title}</h4>
                            <p class="card-date text">${movie.releaseDate}</p>
                            <div class="genres-container">${genresHTML}</div>
                            <p class="vote text">${movie.voteAverage}</p>
                            <p class="card-text text">${movie.overview}</p>
                        </div>
                        <div id="${movie.id}" class="link-btn js-expand">More Details<div id="arrow${movie.id}" class="arrow-up arrow-rotate js-expand"></div></div>
                      </div>
                    </li>
                    <li class=content><li>`;

  elements.movieList.insertAdjacentHTML('beforeend', markup);

};

//render genres from list
const renderGenres = (genres) => {
  let genresHTML = '';
  genres.forEach((genre, i) => {
    if(i !== genres.length-1){
      genresHTML  = genresHTML.concat(`<p class="genre text">${genre}, </p>`)
    }else{
      genresHTML  = genresHTML.concat(`<p class="genre text">${genre}</p>`)
    }
  });
  return genresHTML;
}

//manage movie list
export const renderMovies = (movies, isSearch) => {
  elements.headerNotFound.style.display = "none"
  renderHeader(isSearch);
  if (movies.length !== 0){
    movies.forEach(movie => {
      renderMovie(movie);
    }); 
  }else{
    displayNotFound();
  }
}

//clear dom when changing state
export const clearMovies = () => {
  while (elements.movieList.firstChild) {
    elements.movieList.removeChild(elements.movieList.firstChild);
  }
};

//not found block 
const displayNotFound = () => {
  elements.headerNotFound.style.display = "block"
}

//render header
const renderHeader = (isSearch) => {
  let markup = '';
  const btn = elements.nowPlayingBtn;
  const header = elements.pageHeader;
  if (isSearch) {
    btn.disabled = false;
    header.innerHTML = 'Search Results'
  }else{
    btn.disabled = true;
    header.innerHTML = 'Now Playing'
  }
  elements.movieList.insertAdjacentHTML('beforeend', markup);
};