import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

interface ScoopOptionProps {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: number) => void;
}

const ScoopOption: React.FC<ScoopOptionProps> = ({
  name,
  imagePath,
  updateItemCount,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const handleChange = (event: React.ChangeEvent<any>) => {
    updateItemCount(name, event.target.value);
    const currentValueFloat = parseFloat(event.target.value);
    setIsValid(
      0 <= currentValueFloat &&
        currentValueFloat <= 10 &&
        Math.floor(currentValueFloat) === currentValueFloat
    );
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${process.env.REACT_APP_SERVER_URL}${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs='6' style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: 'left' }}>
          <Form.Control
            type='number'
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
