import React, { Component, Fragment } from 'react';
import { Link, withRouter} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem} from "react-bootstrap";
import './App.css';
import Routes from "./Routes";
import { AuthService } from './services/AuthService';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: AuthService.instance().isAuthenticated()
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({isAuthenticated: authenticated})
  }

  handleLogout = async event => {
    try{
      await new AuthService().logout();
      this.userHasAuthenticated(false);
      this.props.history.push("/login");
    }catch(e){
    }
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Haus Challenge</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            {this.state.isAuthenticated ? 
              <NavItem id="logout" onClick={this.handleLogout}>Logout</NavItem> :
              <Fragment>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </Fragment>
            }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps}/>
      </div>
    );
  }
}

export default withRouter(App);
