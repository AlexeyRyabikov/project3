import { Col, Row, Image, Space, Tag, Typography, Spin, Progress, Rate } from "antd";
import { StarFilled } from "@ant-design/icons";
// import { Text } from "react";
import "./FilmCard.css";
import { format, compareAsc, parse } from "date-fns";
import { useState, Fragment } from "react";

import { setFilmToStorage } from "../LocalStorageFunctions/LocalStorageFunctions";

const { Text, Paragraph, Title } = Typography;

function FilmCard({ filminfo, genreIds, loading }) {
  // setEllipsis({ rows: 4, expandable: true, symbol: "more" });
  // const url = `https://image.tmdb.org/t/p/w500${filminfo.poster_path}`;
  // const url = `https://image.tmdb.org/t/p/w500/bj2G0KQBWCWunW97mZcFuPwAWwR.jpg`;
  const TagMass = filminfo.genre_ids.map((el) => {
    const genre = genreIds.find((el1) => el1.id === el);
    return <Tag>{genre.name}</Tag>;
  });
  // console.log(TagMass);
  // console.log();
  let DataFormated = "";
  if (filminfo.release_date) {
    const data = parse(filminfo.release_date, "yyyy-M-d", new Date());
    DataFormated = format(data, "MMMM d,yyyy");
    // console.log(data);
    // console.log(DataFormated);
  }
  const fillFilmCard = loading ? (
    <Spin size="large" className="filmcard__spinner" />
  ) : (
    <CardContent filminfo={filminfo} TagMass={TagMass} DataFormated={DataFormated} />
  );
  return (
    <Row gutter={[10, 10]} className="filmcard border">
      {fillFilmCard}
      {/* <CardContent filminfo={filminfo} TagMass={TagMass} DataFormated={DataFormated} /> */}
      {/* <Spin size="large" className="filmcard__spinner" /> */}
    </Row>
  );
}

function CardContent({ filminfo, TagMass, DataFormated }) {
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
                // overflow: "hidden",
                // whiteSpace: "nowrap",
                // textOverflow: "ellipsis",
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
        defaultValue={2.5}
        count={10}
        className="border CardRate"
        justify="center"
        onChange={(e) => {
          setFilmToStorage(filminfo.id, e);
        }}
        // character="A"
        // character={<StarFilled className="Card__Rate"/>}
      />
    </Row>
  );
}
export default FilmCard;
