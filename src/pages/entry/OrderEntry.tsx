import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Options from './Options';

const OrderEntry: React.FC = () => {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1>Design your sundae!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </div>
  );
};

export default OrderEntry;
