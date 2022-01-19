import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  const footeryear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; {footeryear} GadgetHub. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
