import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const cities = [
  {
    id: "1",
    name: "Salem",
    country: "India",
    weather: {
      summary: {
        title: "Sunny",
        description: "Clear sky with bright sunshine",
        icon: "01d",
      },
      temperature: {
        actual: 35,
        feelsLike: 38,
        min: 28,
        max: 37,
      },
      wind: {
        speed: 5.5,
        deg: 120,
      },
      clouds: {
        all: 10,
        visibility: 9000,
        humidity: 60,
      },
      timestamp: 1718000000,
    },
  },
  {
    id: "2",
    name: "New York",
    country: "US",
    weather: {
      summary: {
        title: "Rainy",
        description: "Light rain expected in the evening",
        icon: "10d",
      },
      temperature: {
        actual: 22,
        feelsLike: 21,
        min: 18,
        max: 25,
      },
      wind: {
        speed: 6.0,
        deg: 90,
      },
      clouds: {
        all: 60,
        visibility: 8000,
        humidity: 80,
      },
      timestamp: 1718000000,
    },
  },
];

const typeDefs = `type Query{
getCities:[City]
getCityByName(name:String!):City
}
type City {
id:ID
name:String
country:String
weather: Weather
}
type Summary {
title:String
description:String
icon:String
}
type Weather {
summary:Summary
temperature:Temperature
wind:Wind
clouds:Clouds
timestamp:Int
}
type Temperature {
actual:Float
feelsLike:Float
 min: Float
max: Float
}
type Wind {
speed:Float
deg:Int
}
type Clouds{
all:Int
visibility:Int
humidity:Int
}
`;
const resolvers = {
  Query: {
    getCities:()=>{
        return cities
    },
    getCityByName: (parent, args) => {
      const name = args.name;
      return cities.find((city) => city.name === name);
    },
  },
  Mutation: {
    
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running at ${url}`);
