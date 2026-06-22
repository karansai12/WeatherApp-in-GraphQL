import { RESTDataSource } from "@apollo/datasource-rest";

export class ProductsAPI extends RESTDataSource {
    baseURL = "https://dummyjson.com/products/"

    async getAllProducts(limit, skip) {
        return this.get("",{ params: { limit, skip } })
    }
    async getProductByID(id) {
        return this.get(`${id}`)
    }
}