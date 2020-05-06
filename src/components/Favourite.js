import React from "react";
import Message from "../media/message.svg";

class Favourite extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.data ?
                    <div className="favourite-joke">
                        <div className="favourite-button fav-block favourite"
                             onClick={() => this.props.removeFavourite(this.props.data)}/>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    : <React.Fragment/>}
            </React.Fragment>
        );
    }
}

export default Favourite;
