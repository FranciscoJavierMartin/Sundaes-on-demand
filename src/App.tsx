import React from 'react';
import Options from './pages/entry/Options';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <OrderSummary />
    </div>
  );
}

export default App;
