import React from 'react';
import { Col, Form } from 'react-bootstrap';

interface ToppingOptionsProps {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: number) => void;
}

const ToppingOptions: React.FC<ToppingOptionsProps> = ({
  name,
  imagePath,
  updateItemCount,
}) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${process.env.REACT_APP_SERVER_URL}${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check
          type='checkbox'
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? 1 : 0);
          }}
          label={name}
        />
      </Form.Group>
    </Col>
  );
};

export default ToppingOptions;
