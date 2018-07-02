import React, { Component } from "react";
import { FormGroup, FormControl, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Feedback.css";
import { FeedbackService } from "../../services/FeedbackService";

export default class Feedback extends Component{
    constructor(props){
        super(props);

        this.state = {
            content: "",
            ready: false,
            feedback: []
        };
    }

    async componentDidMount(){
        try{
            let feedback = await new FeedbackService().getAllFeedback();
            this.setState({ready: true});
            this.setState({feedback: feedback});
        }catch(e){
            console.log("e from getting all feedback is: ", e);
        }
    }
     validateForm(){
         return this.state.content.length > 0;
     }

     handleChange = event => {
         this.setState({
             [event.target.id]: event.target.value
         });
     }

     handleSubmit = async event => {
         event.preventDefault();
         try{
             let newFeedback = await new FeedbackService().addFeedback(this.state.content);
             let newFeedbackState = this.state.feedback.concat([newFeedback]);
             this.setState({feedback: newFeedbackState});
             this.setState({content: ""});
         }catch(e){
            console.log("failed to submit feedback, err is: ", e);
         }
     }

     renderAllFeedback(){
        return [].concat(this.state.feedback).reverse().map(
            (feedback, i) => 
                <ListGroupItem className="entry" key={feedback.id}>
                    You commented: {feedback.content}
                </ListGroupItem>
        )
     }

     render(){
         return (
             <div className="Feedback">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl onChange={this.handleChange} value={this.state.content} componentClass="textarea" placeholder="New thoughts? Please provide them here!"/>
                    </FormGroup>
                    <div className="button-container">
                        <Button bsStyle="primary" disabled={!this.validateForm()} type="submit">Submit</Button>
                    </div>
                </form>
                <div>
                    <ListGroup className="entry-container">
                        {this.state.ready && this.renderAllFeedback()}
                    </ListGroup>
                </div>
            </div>
         )
     }
}