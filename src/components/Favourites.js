import React from "react";
import Favourite from "./Favourite";

class Favourites extends React.Component {
    render() {
        let jokes = [];
        if (this.props.jokeList.length > 0) {
            for (let joke of this.props.jokeList) {
                jokes.push(<Favourite data={joke}
                                      removeFavourite={this.props.removeFavourite}
                                      key={joke.id}/>);
            }
        }
        return (
            <div className="favourite-jokes">
                {jokes}
            </div>
        );
    }
}

export default Favourites;
