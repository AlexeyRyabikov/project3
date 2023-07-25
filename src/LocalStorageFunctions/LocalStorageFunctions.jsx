import { FetchMovieInfoById } from "../FetchFunctions/FetchFunctions";

const setFilmToStorage = function (filmID, grade) {
  const storageContains = localStorage.getItem("RatedFilms");
  let parsedContaining;
  if (storageContains === null) {
    parsedContaining = {};
  } else {
    parsedContaining = JSON.parse(storageContains);
  }
  parsedContaining[filmID] = grade;
  localStorage.setItem("RatedFilms", JSON.stringify(parsedContaining));
};
const getRatedFilms = function () {
  const needArray = [];
  const LocalStorageObject = JSON.parse(localStorage.getItem("RatedFilms"));
  for (let i = 0; i < Object.keys(LocalStorageObject).length; i += 1) {
    needArray[i] = FetchMovieInfoById(Object.keys(LocalStorageObject)[i]);
  }
  Promise.all(needArray).then((results) => {
    let pageLength = results.length;
    const pageMass = [];
    while (pageLength > 20) {
      pageMass.push(20);
      pageLength -= 20;
    }
    pageMass.push(pageLength);
    if (pageMass[this.state.paginationValue - 1] === undefined) {
      return;
    }
    for (let i = 0; i < pageMass[this.state.paginationValue - 1]; i += 1) {
      results[i].genre_ids = results[i].genres.map((el) => el.id);
    }
    this.setState({ received: results, loading: false });
  });
};
const getRates = function () {
  return JSON.parse(localStorage.getItem("RatedFilms"));
};
export { setFilmToStorage, getRatedFilms, getRates };
