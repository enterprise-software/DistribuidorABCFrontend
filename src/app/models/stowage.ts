import { Product } from "./product";
import { StowageNumber } from "./stowageNumber";

export interface Stowage {
    stowageId: number;
    description: string;
    capacity: number;
    stowageNumbers: Array<StowageNumber>
}