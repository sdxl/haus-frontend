import React, {Component } from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./Signup.css";
import { AuthService } from "../../services/AuthService";

export default class Signup extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
    };

    validateForm() {
        return(
            this.state.firstName.length > 0 &&
            this.state.lastName.length > 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id] : event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        try{
            await AuthService.instance().signup(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
        }catch(e){
            console.log('login failed with e: ', e);
        }
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="firstName" bsSize="large">
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl autoFocus type="text" value={this.state.firstName} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="lastName" bsSize="large">
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl type="text" value={this.state.lastName} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="email" value={this.state.email} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="password" value={this.state.password} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
                </FormGroup>
                <Button block bsSize="large" disabled={!this.validateForm()} type="submit">Sign up</Button>                
            </form> 
            )
    }
}