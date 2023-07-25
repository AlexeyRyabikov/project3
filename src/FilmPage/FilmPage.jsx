import { Component, Fragment, useCallback } from "react";
import { Col, Row, Input, Pagination, Alert, Tag } from "antd";
import { debounce } from "lodash";

import { GenresConsumer } from "../FilmContext/FilmContext";
import FilmCard from "../FilmCard/FilmCard";
import { FetchFilmInfo } from "../FetchFunctions/FetchFunctions";
import { getRatedFilms } from "../LocalStorageFunctions/LocalStorageFunctions";

const arrayOfProps = [];
const fetch = require("node-fetch");

class FilmPage extends Component {
  constructor() {
    super();
    this.handlechange = (e) => {
      this.setState({ searchValue: e.target.value, loading: true });
      this.getCardsFunction().call(this, e.target.value);
    };
    this.debouncedFetch = debounce(this.handlechange, 500);
    this.Ratings = JSON.parse(localStorage.getItem("RatedFilms"));
    if (this.Ratings === null) {
      localStorage.setItem("RatedFilms", JSON.stringify({}));
    }
    this.state = {
      received: arrayOfProps,
      loading: true,
      searchValue: "",
      paginationValue: 1,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getCardsFunction().call(this);
  }

  getCardsFunction(Rated = this.props.RatedFilms) {
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

  generateRows(j) {
    const res = [];
    const { Ratings } = this;
    for (let i = j; i < this.state.received.length; i += 1) {
      const { id } = this.state.received[i];
      let mark;
      if (Object.keys(Ratings).find((key) => key === id.toString())) {
        mark = Ratings[id];
      }
      res.push(
        <Col key={this.state.received[i].id}>
          <GenresConsumer>
            {(value) => (
              <FilmCard
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

  render() {
    let Rows;
    if (this.state.searchValue !== "" || this.props.RatedFilms) {
      Rows = this.generateRows(0);
    } else {
      Rows = [];
    }
    return (
      <>
        <div className="inputWraper">
          {!this.props.RatedFilms && (
            <Input
              placeholder="Type to search"
              className="filmInput"
              onChange={(e) => {
                this.setState({ searchValue: e.target.value, loading: true });
                this.debouncedFetch(e);
              }}
              value={this.state.searchValue}
            />
          )}
        </div>
        <div className="cardWraper">
          <Row gutter={[20, 20]} justify="center">
            {Rows}
          </Row>
        </div>
        <div className="PaginationWraper">
          {!(Rows.length === 0) && (
            <Pagination
              defaultCurrent={1}
              total={50}
              onChange={(e) => {
                this.setState(() => ({ paginationValue: e, loading: true }));
                this.getCardsFunction().call(this);
              }}
              value={this.state.paginationValue}
            />
          )}
          {this.state.error && <Alert className="Error-view" message="Ошибка" type="error" showIcon />}
        </div>
      </>
    );
  }
}
export default FilmPage;
