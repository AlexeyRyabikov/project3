import { Tabs } from "antd";
import { Alert } from "antd";
import { Offline } from "react-detect-offline";

import { GenresProvider, GenresConsumer } from "../FilmContext/FilmContext";
import FilmPage from "../FilmPage/FilmPage";
import FilmCard from "../FilmCard/FilmCard";
import { FetchGenres } from "../FetchFunctions/FetchFunctions";

function PagesWraper() {
  const id1 = 1;
  const id2 = 2;
  const Genres = FetchGenres().then((res) => res);
  return (
    <div className="InterfaceWraper">
      <GenresProvider value={Genres}>
        <section className="insideWraper">
          <Tabs
            defaultActiveKey="1"
            centered
            items={[
              {
                label: `search`,
                key: id1,
                children: <FilmPage />,
              },
              {
                label: `Rated`,
                key: id2,
                children: <FilmPage RatedFilms />,
              },
            ]}
          />
        </section>
        <Offline>
          <Alert className="Error-view" message="нет сети" type="error" showIcon />
        </Offline>
      </GenresProvider>
    </div>
  );
}
export default PagesWraper;
