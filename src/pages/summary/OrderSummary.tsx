import React from 'react';
import { OrderPhases } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';

interface OrderSummaryProps {
  setOrderPhase: React.Dispatch<React.SetStateAction<OrderPhases>>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const scoopArray = Array.from(orderDetails.scoops.entries());
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Array.from(orderDetails.toppings.entries());
  const toppingList = toppingsArray.map(([key]) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
