import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ProductsAPI } from "./products-api.js";

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
  getAllProducts(limit:Int,skip:Int):[Product]
  getProductByID(id:Int):Product
 }
  type Product {
       id:String 
      title: String 
      description: String 
      category: String 
      price: Float
      discountPercentage: Float,
      rating: Float,
      stock:Int,
      tags:[String]
      brand:String
      sku:String
      weight:String
      dimensions:Dimensions
      warrantyInformation:String
      shippingInformation:String
      availabilityStatus:String
      reviews:Review
      returnPolicy:String
      minimumOrderQuantity:Int
      meta:Meta
      images:[String]
      thumbnail:String
  }
      type Dimensions {
      width:Float
      height:Float
      depth:Float
      }
      type Review {
      rating:Int
      comment:String
      date:Float
      reviewerName:String
      reviewerEmail:String
      }
      type Meta {
      createdAt:String
      updatedAt:String
      barcode:String
      qrCode:String
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
    getCities: () => {
      return cities;
    },
    getCityByName: (parent, args) => {
      const name = args.name;
      return cities.find((city) => city.name === name);
    },
    getAllProducts: async (parent, args, context) => {
      const data = await context.dataSources.productsAPI.getAllProducts(args.limit,args.skip)
      return data.products;
    },
    getProductByID: async (parent,args,context)=>{
      const data = await context.dataSources.productsAPI.getProductByID(args.id)
      return data
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    const {cache}=server
    return {
      dataSources: {
        productsAPI: new ProductsAPI({ cache }),
      },
    };
  },
});

console.log(`Server running at ${url}`);
