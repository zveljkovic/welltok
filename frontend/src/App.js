import React from 'react';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, FormGroup, Label, Input, Form, ModalHeader, Modal, ModalBody, ModalFooter, Button,
} from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import BookListScreen from "./components/BookList/BookListScreen";
import BookEditScreen from "./components/BookEdit/BookEditScreen";
import BookCreateScreen from "./components/BookCreate/BookCreateScreen";
import BookDeleteScreen from "./components/BookDelete/BookDeleteScreen";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      showLogin: false,
      username: '',
      password: '',
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  showLogin = () => {
    this.setState({showLogin: true});
  };
  toggleLogin = () => {
    this.setState({showLogin: !this.state.showLogin});
  };

  login = () => {

  };
  handleChange = async (event) => {
    const { name, value } = event.target;
    await this.setState({
      [ name ]: value,
    });
  };
  render() {
    return  <div className="App">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Zlatibor Veljkovic</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.collapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => {
                this.showLogin();
              }}>Login</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Modal isOpen={this.state.showLogin} toggle={this.toggleLogin} >
        <ModalHeader toggle={this.toggleLogin}>Login</ModalHeader>
        <ModalBody>
          <p>Please use admin/admin to login</p>
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="text" name="username" id="username" placeholder="Username"
                     value={this.state.loginUsername} onChange={(e) => {this.handleChange(e); }}  />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="Password"
                     value={this.state.loginPassword} onChange={(e) => {this.handleChange(e); }}  />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.login}>Login</Button>{' '}
          <Button color="secondary" onClick={this.toggleLogin}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Router>
        <Route exact path="/" component={BookListScreen} />
        <Route exact path="/:id/edit" component={BookEditScreen} />
        <Route exact path="/create" component={BookCreateScreen} />
        <Route exact path="/:id/delete" component={BookDeleteScreen} />
      </Router>
    </div>;
  }
}

export default connect()(App);
