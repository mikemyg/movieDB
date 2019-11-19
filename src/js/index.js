import * as api from './api'
import MovieList from './models/MovieList';
import * as expandMovieView from './views/expandMovieView'
import { elements } from './views/base';
import * as movieView from './views/movieView';
import * as watchVideo from './components/watchVideo'
import * as loader from './components/loader'
import GenreList from './models/Genres';
import { lessString } from './helpers/functions'

// Global state of the app

const state = {
  genreList: {},
  isNowPlaying: true,
  nowPlayingPage: {
    current: 1,
    limit: -1
  },
  searchPage: {
    current: 1,
    limit: -1
  },
  movieList: [],
  nowPlaying: [],
};

// on load set nowPlaying
window.addEventListener('load', async function() {  

  state.genreList = new GenreList();
  await api.getGenres()
          .then(data => {
            if (data.genres){
              state.genreList.addGenres(data.genres);
            }else{
              state.genreList = []
            }
          })

  elements.searchInput.value = '';
  state.movieList = new MovieList();

  loader.renderLoader(elements.movieList);
  api.getNowPlaying(state.nowPlayingPage.current)
    .then(data => {
      loader.clearLoader();
      state.nowPlayingPage.current++;
      state.nowPlayingPage.limit = data.total_pages;
      let movies = []
      try{
        movies = state.movieList.addMovies(data.results, state.genreList);     
      }catch{
        console.log("something went wrong on loading")
      }
      state.nowPlaying = movies;
      movieView.renderMovies(movies, false);
      renderHandlers()
    });
});

//on search type set search results
const searchController = async () => {
    resetMovieList();
    state.query = elements.searchInput.value
    if (state.query) {
      state.searchPage.current = 1;
      state.searchPage.limit = -1;
      state.isNowPlaying = false;
      state.movieList = new MovieList();
      loader.renderLoader(elements.movieList);
      api.getSearchResults(state.searchPage.current, state.query)
        .then(data => {
          loader.clearLoader();
          state.searchPage.limit = data.total_pages;
          let movies = [];
          try{
            movies = state.movieList.addMovies(data.results, state.genreList);   
          }catch{
            console.log("something went wrong on searching")
          }
          movieView.renderMovies(movies, true);
          renderHandlers()
        });
    }else{
      state.isNowPlaying = true;
      elements.searchInput.value = '';
      const newMovies = state.movieList.cacheMovies(state.nowPlaying);
      movieView.renderMovies(newMovies, false);
      renderHandlers()
    }
}

elements.searchInput.addEventListener('input', function() {
    searchController();
});

//reset movieList
const resetMovieList = () => {
  state.movieList.clearMovies();
  movieView.clearMovies();
}

// load more as scrolling
const loadMore = () => {
  if (state.isNowPlaying) {
    loadMoreNowPlaying()
  }else{
    loadMoreSearch()
  }
}


const loadMoreNowPlaying = () => {
  if (state.nowPlayingPage.limit >= state.nowPlayingPage.current){
    api.getNowPlaying(state.nowPlayingPage.current)
    .then(data => {
      state.nowPlayingPage.current++;
      let newMovies = []
      try{
        newMovies = state.movieList.addMovies(data.results, state.genreList);
      }catch{
        console.log("something went wrong")
      }
      state.nowPlaying.push(...newMovies);
      movieView.renderMovies(newMovies, false);
      renderHandlers()
    });
  }
}

const loadMoreSearch = () => {
  state.searchPage.current++;
  if (state.searchPage.limit >= state.searchPage.current){
    api.getSearchResults(state.searchPage.current, state.query)
      .then(data => {
        let movies = []
        try {
          movies = state.movieList.addMovies(data.results, state.genreList);    
        }catch{
          console.log("something went wrong")
        }
        movieView.renderMovies(movies, true);
        renderHandlers()
      });
  }
}

// Detect when scrolled to bottom.
window.addEventListener('scroll', function(){
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      loadMore();
  }
  if (window.scrollY > 200) {
    elements.scroll.style.display = 'flex';
  }else{
    elements.scroll.style.display = 'none';
  }
});

//now playing route button controller
elements.nowPlayingBtn.addEventListener("click", function(){
  state.isNowPlaying = true;
  resetMovieList();  
  elements.searchInput.value = '';
  const newMovies = state.movieList.cacheMovies(state.nowPlaying);
  movieView.renderMovies(newMovies, false);
  renderHandlers()
});

//Go top button controller
elements.scroll.addEventListener("click", function(){
  window.scrollTo({top: 0, behavior: 'smooth'});
  
})


//expand controllers
const expandHandler = () => {
  let expanders = document.querySelectorAll('.js-expand')
  expanders.forEach(element => {
    element.addEventListener("click", expandHandlerFunc);
  });
}

const expandHandlerFunc = (e) => {
    let movie = state.movieList.findId(e.target.id)
    if (movie.loadedDetails){
      expandController(movie)
      watchTrailerHandler();
      reviewShowMoreController();
    }else{
      const parent = document.querySelector(`#card${e.target.id}`).nextElementSibling;
      loader.renderLoader(parent)
      expandLoader(e.target.id)
      api.getMovieDetails(e.target.id)    
      .then( res => {
        loader.clearLoader();
        movie.setDetails(res)
        expandController(movie)
        watchTrailerHandler();
        reviewShowMoreController();
      })
     }
}

const expandController = async movie => {
  movie.toggleExpand()
  expandMovieView.prepareExpandContent(movie)
  let target = document.querySelector(`#card${movie.id}`)
  let arrow = document.querySelector(`#arrow${movie.id}`)
  var content = target.nextElementSibling;
  if (!movie.expanded){
    content.style.maxHeight = null;
    arrow.classList.add('arrow-rotate')
  } else {
    arrow.classList.remove('arrow-rotate')
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

const expandLoader = id => {
  let target = document.querySelector(`#card${id}`).nextElementSibling
  let arrow = document.querySelector(`#arrow${id}`)
  arrow.classList.remove('arrow-rotate')
  target.style.maxHeight = target.scrollHeight + "px";
}

//expanded -> trailer button controller
const watchTrailerHandler = () => {
  let watchTarget = document.querySelectorAll('.js-watch')
  watchTarget.forEach( element => {
    element.addEventListener('click', watchTrailerHandlerFunc)
  });
}

const watchTrailerHandlerFunc = (e) => {
    let video = document.querySelector(`#video${e.target.id}`)
    let card = e.target.id.replace("watch", "card");
    let expander = document.querySelector(`#${card}`)
    let content = expander.nextElementSibling;
    if (!video){
      watchVideo.renderVideo(e.target.name, e.target.id)
      content.style.maxHeight = content.scrollHeight+'px';
    }else{
      watchVideo.clearVideo(video)
      content.style.maxHeight = content.scrollHeight+'px';
    }
}

//expand -> showMore controller 
const reviewShowMoreController = () => {
  let reviewTarget = document.querySelectorAll('.review-show-more');
  reviewTarget.forEach(rev => {
    rev.addEventListener('click', reviewShowMoreControllerFunc)
  })
}

const reviewShowMoreControllerFunc = (e) => {
    const [item , id, index] = [...e.target.id.split('-')]
    const targetShowBtn = document.querySelector(`#${item}-${id}-${index}`)
    const targetReview = document.querySelector(`#rtxt-${id}-${index}`)
    
    if (targetShowBtn.textContent === 'Show more'){
      const movie = state.movieList.findId(id)
      targetReview.innerHTML = movie.details.reviews.results[index].content;
      const expander = document.querySelector(`#card${id}`)
      const content = expander.nextElementSibling;
      content.style.maxHeight = content.scrollHeight + "px";
      targetShowBtn.innerHTML = 'Show less'
    }else{
      targetReview.innerHTML = lessString(targetReview.textContent)
      targetShowBtn.innerHTML = 'Show more'
    }
}

const renderHandlers = () => {
  watchTrailerHandler();
  reviewShowMoreController();
  expandHandler();
}
