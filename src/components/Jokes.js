import React from "react";
import Joke from "./Joke";

class Jokes extends React.Component {
    render() {
        let jokes = [];
        if (this.props.jokeList.length > 0) {
            let id = 0;
            for (let joke of this.props.jokeList) {
                jokes.push(<Joke data={joke}
                                 addFavourite={this.props.addFavourite}
                                 removeFavourite={this.props.removeFavourite}
                                 key={id++}/>);
            }
        }
        return (
            <div className="jokes">
                {jokes}
            </div>
        );
    }
}

export default Jokes;
