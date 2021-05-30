import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import ToppingOptions from './ToppingOptions';
import ScoopOption from './ScoopOption';
import { Scoop } from '../../interfaces/scoops';

interface OptionsProps {
  optionType: string;
}

const Options: React.FC<OptionsProps> = ({ optionType }) => {
  const [items, setItems] = useState<Scoop[]>([]);

  useEffect(() => {
    axios
      .get<Scoop[]>(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOptions;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
