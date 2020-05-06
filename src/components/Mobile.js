import React from "react";

class Mobile extends React.Component {

    state = {
        opened: false
    };

    openMenu = () => {
        const favourites = document.getElementById("favourites");
        const patties = [document.getElementById("patty-one"), document.getElementById("patty-two")];
        const darkener = document.getElementById("darkener");
        if(!this.state.opened) {
            patties[0].style.transform = "rotate(45deg)";
            patties[0].style.top = "13px";
            patties[1].style.transform = "rotate(-45deg)";
            patties[1].style.top = "13px";
            favourites.classList.add("expanded");
            darkener.style.display = "block";
            this.setState({opened: true});
        } else {
            patties[0].style.transform = "rotate(0)";
            patties[0].style.top = "10px";
            patties[1].style.transform = "rotate(0)";
            patties[1].style.top = "16px";
            favourites.classList.remove("expanded");
            darkener.style.display = "none";
            this.setState({opened: false});
        }
    };

    render() {
        return (
            <div className="favourites-mobile" onClick={() => this.openMenu()}>
                <div className="hamburger">
                    <div className="patty" id="patty-one"/>
                    <div className="patty" id="patty-two"/>
                </div>
                <p className="mobile-text">Favourite</p>
            </div>
        );
    }
}

export default Mobile;
