import { Col, Row, Image, Space, Tag, Typography, Spin, Progress, Rate } from "antd";
import "./FilmCard.css";
import { format, parse } from "date-fns";
import { Component } from "react";

import { setFilmToStorage } from "../LocalStorageFunctions/LocalStorageFunctions";

const { Text, Paragraph, Title } = Typography;

class FilmCard extends Component {
  constructor() {
    super();
    this.state = { TagsLoaded: [] };
  }

  componentDidMount() {
    this.props.genreIds.then((res) => {
      this.setState({ TagsLoaded: res });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.props.genreIds.then((res) => {
        this.setState({ TagsLoaded: res });
      });
    }
  }

  render() {
    const { filminfo, genreIds, loading, mark } = this.props;
    let Genres;
    const TagMass = genreIds;
    let DataFormated = "";
    if (filminfo.release_date) {
      const data = parse(filminfo.release_date, "yyyy-M-d", new Date());
      DataFormated = format(data, "MMMM d,yyyy");
    }
    const fillFilmCard = loading ? (
      <Spin size="large" className="filmcard__spinner" />
    ) : (
      <CardContent filminfo={filminfo} TagMass={this.state.TagsLoaded} DataFormated={DataFormated} mark={mark} />
    );
    return (
      <Row gutter={[10, 10]} className="filmcard border">
        {fillFilmCard}
      </Row>
    );
  }
}
const CardContent = function ({ filminfo, TagMass, DataFormated, mark }) {
  const colorChoose = function () {
    if (filminfo.vote_average >= 0 && filminfo.vote_average <= 3) {
      return "#E90000";
    }
    if (filminfo.vote_average <= 5) {
      return "#E97E00";
    }
    if (filminfo.vote_average <= 7) {
      return "#E9D100";
    }
    return "#66E900";
  };
  return (
    <Row className="filmcard">
      <Col justify="start" className="filmcard__image" flex="none">
        <Image
          src={`https://image.tmdb.org/t/p/w500${filminfo.poster_path}`}
          alt="huy"
          height="100%"
          // className="image"
          fallback="./FilmCard.png"
        />
      </Col>
      <Col justify="end" className="filmcard__description borderRed" flex="auto">
        <Row>
          <Col span={20} align="top" style={{ margin: 0 }}>
            <Title
              ellipsis={{ rows: 2, expandable: false }}
              style={{
                margin: "0",
                fontFamily: "Inter",
                fontSize: 20,
                fontWeight: "initial",
                lineHeight: 1.25,
                height: 50,
              }}
            >
              {filminfo.title}
            </Title>
          </Col>
          <Col span={4} className="filmcard__place">
            <Progress
              type="circle"
              percent={100}
              size={40}
              strokeColor={colorChoose()}
              format={() => filminfo.vote_average.toFixed(1)}
            />
          </Col>
          <Col span={24} className="film_date filmcard__place">
            {DataFormated}
          </Col>
          <Space size={[0, 8]} wrap>
            {TagMass}
          </Space>
        </Row>
        <Row className="filmcard__place border-red description">
          <Col span={24}>
            <Paragraph ellipsis={{ rows: 4, expandable: false }}>{filminfo.overview}</Paragraph>
          </Col>
        </Row>
      </Col>
      <Rate
        style={{ fontSize: "110%", margin: "auto" }}
        allowHalf
        defaultValue={mark}
        count={10}
        className="CardRate"
        justify="center"
        onChange={(e) => {
          setFilmToStorage(filminfo.id, e);
        }}
      />
    </Row>
  );
};
export default FilmCard;
