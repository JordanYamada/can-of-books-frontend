import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Jordan Yamada, Amy Pierce, &amp; Rhea Carillo</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
