import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Search from "./pages/Search";
import ListPage from "./pages/ListPage";
import "./styles/App.css";

const entities = [
  "films",
  "people",
  "planets",
  "species",
  "starships",
  "vehicles",
];
const entitiesInfo = [
  {
    entityName: "films",
    title: "films",
    attributes: ["title", "episode_id", "release_date", "director"],
  },
  {
    entityName: "people",
    title: "Characters",
    attributes: ["name", "birth_year", "gender", "height", "skin_color"],
  },
  {
    entityName: "planets",
    title: "planets",
    attributes: ["name", "gravity", "population", "climate", "terrain"],
  },
  {
    title: "species",
    entityName: "species",
    attributes: [
      "name",
      "classification",
      "designation",
      "average_height",
      "average_lifespan",
    ],
  },
  {
    entityName: "starships",
    title: "starships",
    attributes: ["name", "model", "starship_class", "hyperdrive_rating"],
  },
  {
    entityName: "vehicles",
    title: "vehicles",
    attributes: ["name", "model", "vehicle_class", "cargo_capacity", "length"],
  },
];

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes>
            <Route exact path="/" element={<Search entities={entities} />} />

            {entitiesInfo.map((entity) => (
              <Route
                key={entity.entityName}
                path={`/${entity.entityName}`}
                element={<ListPage entity={entity} />}
              />
            ))}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
