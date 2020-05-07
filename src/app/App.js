import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Categories from "../components/Categories";
import Jokes from "../components/Jokes";
import JokeAPI from "../api/JokeAPI";
import Constants from "../api/Constants";
import Favourites from "../components/Favourites";
import Mobile from "../components/Mobile";

class App extends React.Component {

    state = {
        jokeType: "random",
        category: "animal",
        query: "",
        currentJokes: [],
        favourites: [],
        snackbar: {
            message: "",
            state: false
        }
    };

    componentDidMount() {
        const favourites = JSON.parse(localStorage.getItem(Constants.cell));
        if (favourites) {
            this.setState({favourites: favourites});
        } else {
            localStorage.setItem(Constants.cell, "[]");
        }
    }

    addFavourite = joke => {
        let newJokes = JSON.parse(localStorage.getItem(Constants.cell));
        newJokes.unshift(joke);
        localStorage.setItem(Constants.cell, JSON.stringify(newJokes));
        let currentJokes = this.state.currentJokes;
        if (currentJokes.some(x => x.id === joke.id)) {
            currentJokes.map(x => {
                if (x.id === joke.id) {
                    x.favourite = true;
                    return x;
                } else {
                    return x;
                }
            });
        }
        this.setState({favourites: newJokes, currentJokes: currentJokes});
    };

    removeFavourite = joke => {
        let newJokes = JSON.parse(localStorage.getItem(Constants.cell)).filter(x => x.id !== joke.id);
        localStorage.setItem(Constants.cell, JSON.stringify(newJokes));
        let currentJokes = this.state.currentJokes;
        if (currentJokes.some(x => x.id === joke.id)) {
            currentJokes.map(x => {
                if (x.id === joke.id) {
                    x.favourite = false;
                    return x;
                } else {
                    return x;
                }
            });
        }
        this.setState({favourites: newJokes, currentJokes: currentJokes});
    };

    chooseJokeType = e => {
        this.setState({jokeType: e.target.value});
    };

    chooseJokeCategory = category => {
        this.setState({category: category});
    };

    handleSearch = e => {
        this.setState({query: e.target.value});
    };

    isFavourite = id => this.state.favourites.some(x => x.id === id);

    getJoke = () => {
        switch (this.state.jokeType) {
            case "random":
                JokeAPI.getJoke("jokes/random", data => {
                    data.favourite = this.isFavourite(data.id);
                    this.state.currentJokes.unshift(data);
                    this.setState(this.state);
                    this.openSnackbar("Random joke added successfully!");
                }, err => this.openSnackbar(err.toString()));
                break;
            case "category":
                JokeAPI.getJoke("jokes/random?category=" + this.state.category, data => {
                    data.favourite = this.isFavourite(data.id);
                    this.state.currentJokes.unshift(data);
                    this.setState(this.state);
                    this.openSnackbar("Joke added successfully with category " + this.state.category + "!");
                }, err => this.openSnackbar(err.toString()));
                break;
            case "search":
                JokeAPI.getJoke("jokes/search?query=" + this.state.query, data => {
                    console.log(data);
                    for (let joke of data.result) {
                        joke.favourite = this.isFavourite(joke.id);
                    }
                    this.setState({currentJokes: data.result.concat(this.state.currentJokes)});
                    this.openSnackbar(data.total + " jokes added successfully by query " + this.state.query + "!");
                }, err => this.openSnackbar(err.toString()));
                break;
            default:
                this.openSnackbar("Type of joke search not found!");
                break;
        }
    };

    openSnackbar = message => {
        this.setState({snackbar: {message: message, state: true}});
    };

    closeSnackbar = () => {
        this.setState({snackbar: {message: this.state.snackbar.message, state: false}});
    };

    render() {
        return (
            <React.Fragment>
                <div className="darkener" id="darkener"/>
                <main className="app">
                    <section className="ui">
                        <div className="ui-panel">
                            <Mobile/>
                            <h4 className="app-name">MSI 2020</h4>
                            <h2 className="big-heading">Hey!</h2>
                            <h3 className="small-heading">Let’s try to find a joke for you:</h3>
                            <div className="ui-options">
                                <RadioGroup aria-label="joke-type" name="joke-type" value={this.state.jokeType}
                                            onChange={this.chooseJokeType}>
                                    <FormControlLabel value="random" control={<Radio color="primary"/>} label="Random"/>
                                    <FormControlLabel value="category" control={<Radio color="primary"/>}
                                                      label="From categories"/>
                                    <Categories visible={this.state.jokeType === "category"}
                                                chooseJokeCategory={this.chooseJokeCategory}
                                                chosenCategory={this.state.category}/>
                                    <FormControlLabel value="search" control={<Radio color="primary"/>} label="Search"/>
                                    <input
                                        className={"search-input" + (this.state.jokeType === "search" ? "" : " invisible")}
                                        placeholder="Free text search..."
                                        onChange={e => this.handleSearch(e)}/>
                                </RadioGroup>
                                <button className="get-joke" onClick={() => this.getJoke()}>Get a joke</button>
                            </div>
                            <Jokes addFavourite={this.addFavourite}
                                   removeFavourite={this.removeFavourite}
                                   jokeList={this.state.currentJokes}/>
                        </div>
                    </section>
                    <section className="favourites" id="favourites">
                        <h3 className="favourites-heading">Favourite</h3>
                        <Favourites removeFavourite={this.removeFavourite}
                                    jokeList={this.state.favourites}/>
                    </section>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackbar.state}
                        autoHideDuration={2000}
                        onClose={this.closeSnackbar}
                        message={this.state.snackbar.message}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit"
                                            onClick={this.closeSnackbar}>
                                    <CloseIcon fontSize="small"/>
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </main>
            </React.Fragment>
        );
    }
}

export default App;
