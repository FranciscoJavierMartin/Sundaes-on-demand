import React from 'react';
import { OrderPhases } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';

interface OrderSummaryProps {
  setOrderPhase: React.Dispatch<React.SetStateAction<OrderPhases>>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const scoopList = Array.from(orderDetails.scoops.entries()).map(
    ([key, value]) => (
      <li key={key}>
        {value} {key}
      </li>
    )
  );

  const toppingsDisplay =
    orderDetails.toppings.size > 0 ? (
      <>
        <h2>Toppings: {orderDetails.totals.toppings}</h2>
        <ul>
          {Array.from(orderDetails.toppings.entries()).map(([key]) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </>
    ) : null;

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
