import React, {Component} from "react";
import "./Home.css";
import Feedback from "../Feedback/Feedback";

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? 
                    <Feedback/> :
                    <div className="lander">
                        <h1>Haus Coding Challenge</h1>
                        <p> Eric's coding challenge</p>
                        <p> Click signup or login to get started </p>
                    </div>
                }
            </div>
        );
    }
}