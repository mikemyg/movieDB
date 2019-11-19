import { imageUrl } from '../config'
import { getExpandElement } from './base';
import { lessString, sanitizeHTML } from '../helpers/functions'


export const prepareExpandContent = async movie => {

  let target = getExpandElement(movie.id)
  if (target.children.length === 0){
    let HTML = '';
    HTML = HTML.concat('<div class="movie-details">')
    try{
      let watchbtn = renderWatchBtn(movie.id, movie.details.videos.results)
      HTML = HTML.concat(watchbtn)
    }catch{
      console.log("something went wrong with videos")
    }
    try{
      let reviews = renderReviews(movie.details.reviews.results, movie.id)
      HTML = HTML.concat(reviews)  
    }catch{
      console.log("something went wrong with reviews")
    }

    try{
      let similar = renderSimilarMovies(movie.details.similar.results)
      HTML = HTML.concat(similar)
    }catch{
      console.log("something went wrong with similar movies")
    }

    HTML = HTML.concat('</div>')
    target.insertAdjacentHTML('beforeend', HTML);
  }
}

// render trailer btn -> reviews -> similar movies
const renderWatchBtn = (id, videos) =>{
  let video = videos.length > 0 ? videos[0].key : 'no-video'
  let btn = 
  `<button id="watch${id}" name="${video}" class="trailer-btn js-watch">
    watch trailer
  </button>`
  return btn
}

//render reviews
const renderReviews = (data, id) => {
  let reviews = '<div class="text more-header review-header">Reviews: </div><ul class="reviews-container">'

  data.some((element, i) => {
    
    let content = sanitizeHTML(element.content)

    reviews = reviews.concat
        (`<li>
        <p class="text review-author">Review by: ${element.author}</p>
        <div id="rtxt-${id}-${i}" class="text">`)

    if (element.content.length > 500) {
      let newContent = lessString(content);
      reviews = reviews.concat(newContent)
      reviews = reviews.concat(`</div>
        <div id="rbtn-${id}-${i}" class="review-show-more text">Show more</div>
        </li>`)
    }else{
      reviews = reviews.concat(content)
      reviews = reviews.concat(`</div></li>`)
    }
    return i == 1;
  });
  if (data.length == 0){
    reviews = reviews.concat('<p class="text">Not Found</p>')
  }
  reviews = reviews.concat('</ul>')
  return reviews;
}

//render similar movies
const renderSimilarMovies = movies =>{
  let similarMovies = '<div class="text more-header">More Like This</div><ul class="similar-container">';
  movies.some((movie, i) => {
    similarMovies = similarMovies.concat
    (`<li class="similar-movie">
      <div class="similar-image">
        <img src="${imageUrl}${movie.poster_path}" onerror="this.src='assets/no-image.png';"" />
      </div>
      <div class="similar-info-container">
        <div class="text">${movie.title}</div>
        <div class="similar-vote vote">${movie.vote_average}</div>
      </div>
    </li>`)
    return i == 4;
  });
  if (movies.length === 0) {
    similarMovies = similarMovies.concat(`<div class="text text-not-found">Not Found</div>`)
  }
  similarMovies = similarMovies.concat(`</ul>`)
  return similarMovies;
}
