import { useLazyQuery } from "@apollo/client/react";
import "./App.css";
import { gql } from "@apollo/client";
import { useState } from "react";

const GET_WEATHER_QUERY = gql`
  query getCityByName($name: String!) {
    getCityByName(name: $name) {
      name
      country
      weather {
        summary {
          title
          description
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
        timestamp
      }
    }
  }
`;

function App() {
  const [citySearched, setCitySearched] = useState("");
  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY);

  console.log({ citySearched });

  if (error) return <h1>Error Found</h1>;
  if (data) {
    console.log(data);
  }
  return (
    <>
      <div className="home">
        <h1>Search for Weather</h1>
        <input
          type="text"
          placeholder="City mame"
          onChange={(event) => {
            setCitySearched(event.target.value);
          }}
        />
        <button
          onClick={() =>
            getWeather({
              variables: { name: citySearched },
            })
          }
        >
          search
        </button>
      </div>
      {data?.getCityByName.name && (
        <div className="weather">
          <h1>{data.getCityByName.name}</h1>
          <h1>{data.getCityByName.weather.temperature.actual}</h1>
          <h1>Description:{data.getCityByName.weather.summary.description}</h1>
          <h1>Wind Speed: {data.getCityByName.weather.temperature.actual}</h1>
        </div>
      )}
    </>
  );
}

export default App;
