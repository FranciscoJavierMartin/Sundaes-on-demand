import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { OrderPhases } from './constants';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
  const [orderPhase, setOrderPhase] = useState<OrderPhases>(
    OrderPhases.inProgress
  );
  let Component: any;

  switch (orderPhase) {
    case OrderPhases.inProgress:
      Component = OrderEntry;
      break;
    case OrderPhases.review:
      Component = OrderSummary;
      break;
    case OrderPhases.completed:
      Component = OrderConfirmation;
      break;
    default:
      Component = OrderEntry;
  }
  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
