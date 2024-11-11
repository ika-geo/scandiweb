import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { selectCategory } from "../store/features/categorySlice";
import { connect } from "react-redux";

class Categories extends Component {

    handleCategorySelect = (category) => {
        this.props.dispatch(selectCategory({ name: category.name, id: category.id }));
    };

    render() {
        const { categories, loading, error, selectedCategory } = this.props;

        if (loading) {
            return <p>loading...</p>;
        }
        if (error) {
            return <p>Cant fetch categories</p>;
        }

        return (
            <nav className="flex space-x-4">
                {categories.map(category => {
                    return (
                        <Link
                            to={category.id === 1 ? '/' : `/categories/${category.name}`}
                            key={category.id}
                            className={"text-4 font-[600] pt-1 px-4 pb-8 uppercase hover:opacity-50 " + (category.id === selectedCategory.id ? 'activeCategory' : '')}
                            data-testid={category.id === selectedCategory.id ? 'active-category-link' : 'category-link'}
                            onClick={() => this.handleCategorySelect(category)}
                        >
                            {category.name}
                        </Link>
                    );
                })}
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.items,
    loading: state.categories.loading,
    error: state.categories.error,
    selectedCategory: state.categories.selectedCategory
});

export default connect(mapStateToProps)(Categories);
