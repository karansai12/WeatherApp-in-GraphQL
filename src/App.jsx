import { useLazyQuery, useQuery } from "@apollo/client/react";
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

// const GET_PRODUCTS_QUERY = gql`
//   query GetCityByName($limit: Int, $skip: Int) {
//     getAllProducts(limit: $limit, skip: $skip) {
//       id
//       title
//       description
//       category
//       price
//       discountPercentage
//       rating
//       stock
//       tags
//       brand
//       sku
//       weight
//       dimensions {
//         width
//         height
//         depth
//       }
//       warrantyInformation
//       shippingInformation
//       availabilityStatus
//       reviews {
//         rating
//         comment
//         date
//         reviewerName
//         reviewerEmail
//       }
//       returnPolicy
//       minimumOrderQuantity
//       meta {
//         createdAt
//         updatedAt
//         barcode
//         qrCode
//       }
//       images
//       thumbnail
//     }
//   }
// `;

const GET_PRODUCTS_SIMPLFYED_QUERY = gql`
  query GetCityByName($limit: Int, $skip: Int) {
    getAllProducts(limit: $limit, skip: $skip) {
      title
      category
      price
      rating
      shippingInformation
      images
      stock
    }
  }
`;

function App() {
  const [citySearched, setCitySearched] = useState("");
  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY);
  const { data: products } = useQuery(GET_PRODUCTS_SIMPLFYED_QUERY);

  console.log({ products });

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
      <div>
        <h1>Products</h1>
        {products?.getAllProducts.map((i) => {
          return (
            <div>
              <img src={i.images} width={200} height={200} />
              <h2>Name: {i.title}</h2>
              <h2>$ {i.price}</h2>
              <h3>Category: {i.category}</h3>
              <h3>rating: {i.rating}</h3>
            <h3>{i.shippingInformation}</h3>
            <h3>Stock in: {i.stock}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
