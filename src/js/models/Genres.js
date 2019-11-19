export default class GenreList {

  constructor() {
    this.genreList = {};
  }

  //fill the genre list
  addGenres(genres) {  
    genres.forEach(genre => {
        this.genreList[genre.id] = genre.name;
    });
  }

  //get genre by id in the object
  getGenre(id){
    if (this.genreList.hasOwnProperty(id)){
        return this.genreList[id]
    }else{
        return 'other'
    }
  }

}
