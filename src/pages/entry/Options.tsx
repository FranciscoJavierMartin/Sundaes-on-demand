import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import ToppingOptions from './ToppingOptions';
import ScoopOption from './ScoopOption';
import { Scoop } from '../../interfaces/scoops';
import AlertBanner from '../common/AlertBanner';
import { OptionTypes } from '../../interfaces/optionTypes';
import { pricesPerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utils';

interface OptionsProps {
  optionType: OptionTypes;
}

const Options: React.FC<OptionsProps> = ({ optionType }) => {
  const [items, setItems] = useState<Scoop[]>([]);
  const [error, setError] = useState<boolean>(false);
  // @ts-ignore
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get<Scoop[]>(`${process.env.REACT_APP_SERVER_URL}${optionType}`)
      .then((response) => setItems(response.data))
      .catch(() => {
        setError(true);
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName: string, newItemCount: number) =>
        updateItemCount(itemName as OptionTypes, newItemCount, optionType)
      }
    />
  ));

  return error ? (
    <AlertBanner />
  ) : (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricesPerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
