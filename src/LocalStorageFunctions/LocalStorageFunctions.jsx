import { FetchMovieInfoById } from "../FetchFunctions/FetchFunctions";

const setFilmToStorage = function (filmID, grade) {
  const storageContains = localStorage.getItem("RatedFilms");
  let parsedContaining;
  if (storageContains === null) {
    parsedContaining = {};
    // localStorage.setItem("RatedFilms", "{}");
  } else {
    parsedContaining = JSON.parse(storageContains);
  }
  parsedContaining[filmID] = grade;
  localStorage.setItem("RatedFilms", JSON.stringify(parsedContaining));
  console.log(localStorage.getItem("RatedFilms"));
};
const getRatedFilms = function () {
  const needArray = [];
  const LocalStorageObject = JSON.parse(localStorage.getItem("RatedFilms"));
  // Promise.all(iterable)
  console.log(LocalStorageObject);
  // console.log(Object.keys(LocalStorageObject));
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
    console.log(pageMass);
    if (pageMass[this.state.paginationValue - 1] === undefined) {
      return;
    }
    for (let i = 0; i < pageMass[this.state.paginationValue - 1]; i += 1) {
      results[i].genre_ids = results[i].genres.map((el) => el.id);
    }
    this.setState({ received: results, loading: false });
  });
  // .then((results) => {
  //   console.log(results);
  // });
  // .then((results) => {
  //   this.setState({ received: results, loading: false });
  // });
  // setTimeout(() => console.log(needObject), 5000)();
  // }
};
export { setFilmToStorage, getRatedFilms };
