import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { pricesPerItem } from '../constants';
import { OptionTypes } from '../interfaces/optionTypes';
import { ContextState, UpdateItemCountFunctionType } from '../interfaces/state';
import { formatCurrency } from '../utils';

const OrderDetails =
  // @ts-ignore
  createContext<[ContextState, UpdateItemCountFunctionType]>();

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    );
  }

  return context;
}

// TODO: Refactor for a better approach
function calculateSubtotal(
  optionType: OptionTypes,
  optionsCount: {
    scoops: Map<OptionTypes, number>;
    toppings: Map<OptionTypes, number>;
  }
): number {
  let res: number = 0;

  for (const count of optionsCount[optionType].values()) {
    res += count;
  }
  return res * pricesPerItem[optionType];
}

export const OrderDetailsProvider: React.FC = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map<OptionTypes, number>(),
    toppings: new Map<OptionTypes, number>(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal: number = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal: number = calculateSubtotal(
      'toppings',
      optionCounts
    );

    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo<[ContextState, UpdateItemCountFunctionType]>(() => {
    function updateItemCount(
      itemName: OptionTypes,
      newItemCount: number,
      optionType: OptionTypes
    ) {
      const { [optionType]: optionMap } = optionCounts;
      const newOptionMap = new Map(optionMap);

      newOptionMap.set(itemName, +newItemCount);

      const newOptionCounts = { ...optionCounts };
      newOptionCounts[optionType] = newOptionMap;

      setOptionCounts(newOptionCounts);
    }

    return [
      {
        ...optionCounts,
        totals,
      },
      updateItemCount,
    ];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
