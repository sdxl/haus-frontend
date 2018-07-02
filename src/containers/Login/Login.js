import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./Login.css";
import { AuthService } from "../../services/AuthService";

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        try{
            await AuthService.instance().login(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
        }catch(e){
            console.log('login failed with e: ', e);
        }
    }

    render(){
        return(
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">Login</Button>
                </form>
            </div>
        )
    }
}