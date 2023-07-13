import { Component, Fragment } from "react";
import { Col, Row, Input, Pagination, Alert } from "antd";
import staticMethods from "antd/es/message";
import _ from "lodash";
import { Offline, Online } from "react-detect-offline";

import { GenresProvider, GenresConsumer } from "../FilmContext/FilmContext";
import FilmCard from "../FilmCard/FilmCard";
import {
  FetchFilmInfo,
  FetchGenres,
  CreateGuestSession,
  SetGrade,
  FetchGraded,
  FetchMovieInfoById,
} from "../FetchFunctions/FetchFunctions";
import { getRatedFilms, setFilmToStorage } from "../LocalStorageFunctions/LocalStorageFunctions";

const arrayOfProps = [];
const fetch = require("node-fetch");

class FilmPage extends Component {
  constructor() {
    // localStorage.clear();
    // console.log(localStorage.getItem("RatedFilms"));
    super();
    this.state = {
      received: arrayOfProps,
      genreIds: {},
      loading: true,
      searchValue: "",
      paginationValue: 1,
      error: false,
      GuestSessionID: "7f37b12ef80b0046861534590ca62273",
    };

    console.log(this.state.GuestSessionID);
    // console.log(this.state.GuestSessionID);
    FetchGenres.call(this);
    // FetchGraded();
    // getRatedFilms.call(this);
    // FetchMovieInfoById(502356);
    // CreateGuestSession.call(this);
    // SetGrade.call(this, 988078, 6, "7f37b12ef80b0046861534590ca62273");
  }

  getCardsFunction(Rated = this.props.RatedFilms) {
    console.log(this);
    if (Rated) {
      return getRatedFilms;
    }
    return FetchFilmInfo;
  }

  render() {
    this.getCardsFunction(this.props.RatedFilms);
    // if(this.props.)
    const generateRows = (j) => {
      const res = [];
      for (let i = j; i < this.state.received.length; i += 1) {
        res.push(
          <Col>
            <FilmCard filminfo={this.state.received[i]} genreIds={this.state.genreIds} loading={this.state.loading} />
          </Col>
        );
      }
      return res;
    };
    const Rows = generateRows(0);
    return (
      <GenresConsumer>
        <div className="inputWraper">
          <Input
            placeholder="Type to search"
            className="filmInput"
            onChange={(e) => {
              this.setState({ searchValue: e.target.value, loading: true });
              _.debounce(this.getCardsFunction().bind(this), 2000, {
                leading: true,
                trailing: true,
              })(e.target.value);
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
        </div>
        {this.state.error && <Alert className="Error-view" message="Ошибка" type="error" showIcon />}
      </GenresConsumer>
    );
  }
  // componentDidMount() {
  // }
}
export default FilmPage;
// <Alert className="Error-view" message="Error Text" type="error" showIcon />
