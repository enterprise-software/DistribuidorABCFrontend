import { StowageNumber } from "./stowageNumber";

export interface Product {
    productId: number;
    name: string;
    description: string;
    retailPrice: number;
    wholeSalePrice: number;
    stowageId: number;
    stowageNumbers: Array<StowageNumber>;
}