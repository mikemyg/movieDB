export const elements = {
  searchInput: document.querySelector('.search-field'),
  movieList: document.querySelector('.movie-list'),
  nowPlaying: document.querySelector('.results'),
  nowPlayingBtn: document.querySelector('#now-playing-btn'),
  scroll: document.querySelector('.scroll-up'),
  pageHeader: document.querySelector('.page-header'),
  headerNotFound:  document.querySelector('.hd-not-found'),
};

export const getExpandElement = id => {
  let expandContent = document.querySelector(`#card${id}`).nextElementSibling
  return expandContent;
} 
