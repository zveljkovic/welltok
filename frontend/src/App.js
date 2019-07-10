import React from 'react';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, FormGroup, Label, Input, Form, ModalHeader, Modal, ModalBody, ModalFooter, Button, Alert,
} from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import BookListScreen from "./components/BookList/BookListScreen";
import BookEditScreen from "./components/BookEdit/BookEditScreen";
import BookCreateScreen from "./components/BookCreate/BookCreateScreen";
import BookDeleteScreen from "./components/BookDelete/BookDeleteScreen";
import {AuthApi} from "./libraries/AuthApi";
import {storeAuthToken} from "./redux/actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      showLogin: false,
      username: '',
      password: '',
      loginErrorMessage: null,
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

  login = async () => {
    const response = await AuthApi.login(this.state.username, this.state.password);
    if (response.status !== 'ok') {
      this.setState({loginErrorMessage: response.errorMessage})
      return;
    }
    this.props.storeAuthToken(response.token);
    this.toggleLogin();
  };
  logout = async () => {
    this.props.storeAuthToken(null);
  };

  handleChange = async (event) => {
    const { name, value } = event.target;
    await this.setState({
      [ name ]: value,
    });
  };

  render() {
    let authLink = this.props.auth.userId === null ?
        <NavLink onClick={() => { this.showLogin(); }}>Login</NavLink> :
        <NavLink onClick={() => { this.logout(); }}>Logout</NavLink>;

    return  <div className="App">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Zlatibor Veljkovic</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.collapsed} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {authLink}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Modal isOpen={this.state.showLogin} toggle={this.toggleLogin} >
        <ModalHeader toggle={this.toggleLogin}>Login</ModalHeader>
        <ModalBody>
          <p>Please use admin/admin to login</p>
          {this.state.loginErrorMessage &&
          <Alert color="danger" fade="true">
            {this.state.loginErrorMessage}
          </Alert>
          }
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
const mapStateToProps = (state, ownProps) => {
  return {auth: state.auth};
};

export default connect(mapStateToProps, {storeAuthToken})(App);
