import React from "react";
import Category from "./Category";

class Categories extends React.Component {

    handleCategory = category => {
        this.props.chooseJokeCategory(category);
    };

    render() {
        const chosen = this.props.chosenCategory;
        return (
            <div className={"ui-categories" + (this.props.visible ? "" : " invisible")}>
                <Category category="animal" handleCategory={this.handleCategory} chosen={chosen === "animal"}/>
                <Category category="career" handleCategory={this.handleCategory} chosen={chosen === "career"}/>
                <Category category="celebrity" handleCategory={this.handleCategory} chosen={chosen === "celebrity"}/>
                <Category category="dev" handleCategory={this.handleCategory} chosen={chosen === "dev"}/>
            </div>
        );
    }
}

export default Categories;
