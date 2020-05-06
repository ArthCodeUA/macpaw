import React from "react";
import Message from "../media/message.svg";

class Joke extends React.Component {

    handleHeart = () => {
        if(!this.props.data.favourite) {
            this.props.addFavourite(this.props.data);
        } else {
            this.props.removeFavourite(this.props.data);
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.props.data ?
                    <div className="joke">
                        <div className={"favourite-button" + (this.props.data.favourite ? " favourite" : "")}
                             onClick={() => this.handleHeart()}/>
                        <div className="joke-info">
                            <div className="joke-message">
                                <img src={Message} className="message-icon" alt="message"/>
                            </div>
                            <div className="joke-details">
                                <p className="joke-id">ID:
                                    <a href={"https://api.chucknorris.io/jokes/" + this.props.data.id}
                                       className="joke-id-link" target="blank">
                                        {this.props.data.id}
                                    </a>
                                </p>
                                <p className="joke-text">{this.props.data.value}</p>
                                <div className="joke-meta">
                                    <p className="joke-update">
                                        Last update:
                                        &nbsp;
                                        {Math.ceil((Date.now() - new Date(this.props.data.updated_at)) / 3600000)}
                                        &nbsp;
                                        hours ago
                                    </p>
                                    {this.props.data.categories.length > 0 ?
                                        <div className="joke-category">
                                            {this.props.data.categories[0]}
                                        </div>
                                        : <React.Fragment/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    : <React.Fragment/>}
            </React.Fragment>
        );
    }
}

export default Joke;
