import { OptionTypes } from './optionTypes';

export interface ContextState {
  scoops: Map<OptionTypes, number>;
  toppings: Map<OptionTypes, number>;
  totals: {
    scoops: string;
    toppings: string;
    grandTotal: string;
  };
}

export type UpdateItemCountFunctionType = (
  itemName: OptionTypes,
  newItemCount: number,
  optionType: OptionTypes
) => void;
