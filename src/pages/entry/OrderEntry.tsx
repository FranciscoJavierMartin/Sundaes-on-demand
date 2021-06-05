import React from 'react';
import { Button } from 'react-bootstrap';
import { OrderPhases } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetails';
import Options from './Options';

interface OrderEntryProps {
  setOrderPhase: React.Dispatch<React.SetStateAction<OrderPhases>>;
}

const OrderEntry: React.FC<OrderEntryProps> = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1>Design your sundae!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase(OrderPhases.review)}>
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
