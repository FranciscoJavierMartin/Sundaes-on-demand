import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { Button } from 'react-bootstrap';
import { OrderPhases } from '../../constants';

interface OrderConfirmationProps {
  setOrderPhase: React.Dispatch<React.SetStateAction<OrderPhases>>;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  setOrderPhase,
}) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {});
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase(OrderPhases.inProgress);
  };

  return orderNumber ? (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank you</h1>
      <p>Your order number is {orderNumber}</p>
      <p style={{ fontSize: '25%' }}>
        as per our terms and conditions, nothing will happen now
      </p>
      <Button onClick={handleClick}>Create new order</Button>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default OrderConfirmation;
