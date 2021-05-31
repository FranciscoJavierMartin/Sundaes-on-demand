import React from 'react';
import Options from './Options';

const OrderEntry: React.FC = () => {
  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
    </div>
  );
};

export default OrderEntry;
