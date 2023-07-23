import { Component, Fragment, useCallback } from "react";
import { Col, Row, Input, Pagination, Alert, Tag } from "antd";
import staticMethods from "antd/es/message";
import { debounce } from "lodash";
import { Offline, Online } from "react-detect-offline";

import { GenresConsumer } from "../FilmContext/FilmContext";
import FilmCard from "../FilmCard/FilmCard";
import {
  FetchFilmInfo,
  FetchGenres,
  CreateGuestSession,
  SetGrade,
  FetchGraded,
  FetchMovieInfoById,
} from "../FetchFunctions/FetchFunctions";
import { getRatedFilms, setFilmToStorage, getRates } from "../LocalStorageFunctions/LocalStorageFunctions";

const arrayOfProps = [];
const fetch = require("node-fetch");

class FilmPage extends Component {
  constructor() {
    // localStorage.clear();
    // console.log(localStorage.getItem("RatedFilms"));
    super();
    this.handlechange = (e) => {
      this.setState({ searchValue: e.target.value, loading: true });
      this.getCardsFunction().call(this, e.target.value);
    };
    this.debouncedFetch = debounce(this.handlechange, 500);
    this.Ratings = JSON.parse(localStorage.getItem("RatedFilms"));
    this.state = {
      // genreTags: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
      received: arrayOfProps,
      // genreIds: {},
      loading: true,
      searchValue: "",
      paginationValue: 1,
      error: false,
      // GuestSessionID: "7f37b12ef80b0046861534590ca62273",
    };
    // const keyIndex = 0;
    // console.log(this.state.GuestSessionID);
    // FetchGenres.call(this);
    // FetchGraded();
    // getRatedFilms.call(this);
    // FetchMovieInfoById(502356);
    // CreateGuestSession.call(this);
    // SetGrade.call(this, 988078, 6, "7f37b12ef80b0046861534590ca62273");
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchValue === "") {
  //     this.Rows = this.generateRows(0);
  //   }
  // }
  componentDidMount() {
    this.setState({ loading: true });
    this.getCardsFunction().call(this);
  }

  getCardsFunction(Rated = this.props.RatedFilms) {
    // console.log(JSON.parse(localStorage.getItem("RatedFilms")));
    if (Rated) {
      return getRatedFilms;
    }
    return FetchFilmInfo;
  }

  MakeGenreTags(genreIds, i = 1) {
    return genreIds.then((res) => {
      const needArr = this.state.received[i].genre_ids.map((el) => {
        const genre = res.find((el1) => el1.id === el);
        return <Tag key={genre.id}>{genre.name}</Tag>;
      });
      return needArr;
    });
  }

  // testFunc() {
  //   console.log(this.state.loading);
  // }

  // if(this.props.)
  generateRows(j) {
    const res = [];
    const { Ratings } = this;
    for (let i = j; i < this.state.received.length; i += 1) {
      const { id } = this.state.received[i];
      // //   genreIds={this.fuck}
      let mark;
      if (Object.keys(Ratings).find((key) => key === id.toString())) {
        mark = Ratings[id];
      }
      // //     mark = Ratings[id];
      //   }
      // console.log(this.state.received[i].id);
      res.push(
        <Col key={this.state.received[i].id}>
          <GenresConsumer>
            {(value) => (
              <FilmCard
                // fuck={console.log(this.state.genreTags)}
                mark={mark}
                genreIds={this.MakeGenreTags(value, i)}
                filminfo={this.state.received[i]}
                loading={this.state.loading}
              />
            )}
          </GenresConsumer>
        </Col>
      );
    }
    return res;
  }

  // generateNumber() {
  //   this.keyIndex += 1;
  //   return this.keyIndex;
  // }

  render() {
    let Rows;
    // this.getCardsFunction(this.props.RatedFilms);
    if (this.state.searchValue !== "" || this.props.RatedFilms) {
      Rows = this.generateRows(0);
    } else {
      Rows = [];
    }
    return (
      <>
        <div className="inputWraper">
          <Input
            placeholder="Type to search"
            className="filmInput"
            onChange={(e) => {
              this.setState({ searchValue: e.target.value, loading: true });
              this.debouncedFetch(e);
              // console.log(this.handleChange);
              // this.testFunc();
            }}
            value={this.state.searchValue}
          />
          ;
        </div>
        <div className="cardWraper">
          <Row gutter={[20, 20]} justify="center">
            {Rows}
          </Row>
        </div>
        <div className="PaginationWraper">
          <Pagination
            defaultCurrent={1}
            total={50}
            onChange={(e) => {
              this.setState(() => ({ paginationValue: e, loading: true }));
              this.getCardsFunction().call(this);
            }}
            value={this.state.paginationValue}
          />
          {this.state.error && <Alert className="Error-view" message="Ошибка" type="error" showIcon />}
        </div>
      </>
    );
  }
}
export default FilmPage;
// <Alert className="Error-view" message="Error Text" type="error" showIcon />
