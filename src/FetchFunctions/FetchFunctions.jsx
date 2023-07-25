const options = {
  method: "GET",
  mode: "cors",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWY1OGJiMWQ4NTE5OGRmMTQ3YWZiZTA3NTUzMzdjMiIsInN1YiI6IjY0N2ExZGZjZTMyM2YzMDBjNDI5NmEyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.em_tCx3-GCvH6kJHLsrqYgTnvxUcDn7IaUuZ9GSuIS0",
  },
};
const fetch = require("node-fetch");

const FetchFilmInfo = function (searchtext, pagenumber = 1) {
  if (searchtext) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchtext}&include_adult=true&language=en-US&page=${this.state.paginationValue}`;
    fetch(url, options)
      .then((result) => result.json())
      .then((result) => {
        this.setState({ received: result.results, loading: false });
      });
  }
};

const FetchGenres = function () {
  const genreIdsUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  return fetch(genreIdsUrl, options)
    .then((result) => result.json())
    .then((result) => result.genres)
    .catch(() => this.setState({ error: true }));
};

const CreateGuestSession = function () {
  const url = "https://api.themoviedb.org/3/authentication/guest_session/new";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWY1OGJiMWQ4NTE5OGRmMTQ3YWZiZTA3NTUzMzdjMiIsInN1YiI6IjY0N2ExZGZjZTMyM2YzMDBjNDI5NmEyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.em_tCx3-GCvH6kJHLsrqYgTnvxUcDn7IaUuZ9GSuIS0",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      this.setState(() => ({ GuestSessionID: json.guest_session_id }));
    })

    .catch((err) => console.error(`error:${err}`));
};

const SetGrade = function (filmID, newGrade, GuestSessionID = "7f37b12ef80b0046861534590ca62273") {
  const url = `https://api.themoviedb.org/3/movie/${filmID}/rating?guest_session_id=${GuestSessionID}`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWY1OGJiMWQ4NTE5OGRmMTQ3YWZiZTA3NTUzMzdjMiIsInN1YiI6IjY0N2ExZGZjZTMyM2YzMDBjNDI5NmEyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.em_tCx3-GCvH6kJHLsrqYgTnvxUcDn7IaUuZ9GSuIS0",
    },
    body: JSON.stringify({ value: newGrade }),
  };
  fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error(`error:${err}`));
};
const FetchGraded = function (GuestSessionID = "7f37b12ef80b0046861534590ca62273") {
  const url = `https://api.themoviedb.org/3/guest_session/${GuestSessionID}5b92d080907945e1622478a40f3d7b00/rated/movies?language=en-US&page=1&sort_by=created_at.asc`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWY1OGJiMWQ4NTE5OGRmMTQ3YWZiZTA3NTUzMzdjMiIsInN1YiI6IjY0N2ExZGZjZTMyM2YzMDBjNDI5NmEyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.em_tCx3-GCvH6kJHLsrqYgTnvxUcDn7IaUuZ9GSuIS0",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(`error:${err}`));
};
const FetchMovieInfoById = function (filmID) {
  const url = `https://api.themoviedb.org/3/movie/${filmID}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWY1OGJiMWQ4NTE5OGRmMTQ3YWZiZTA3NTUzMzdjMiIsInN1YiI6IjY0N2ExZGZjZTMyM2YzMDBjNDI5NmEyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.em_tCx3-GCvH6kJHLsrqYgTnvxUcDn7IaUuZ9GSuIS0",
    },
  };
  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error(`error:${err}`));
};

export { FetchFilmInfo, FetchGenres, CreateGuestSession, SetGrade, FetchGraded, FetchMovieInfoById };
