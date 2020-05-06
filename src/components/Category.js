import React from "react";

class Category extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <div className={"ui-category" + (this.props.chosen ? " ui-category-chosen" : "")}
                 onClick={() => this.props.handleCategory(category)}>{category}</div>
        );
    }
}

export default Category;
