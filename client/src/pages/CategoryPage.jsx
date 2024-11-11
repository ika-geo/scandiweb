import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductsByCategory } from '../store/features/productSlice';
import Product from '../components/Product';

class CategoryPage extends Component {
    componentDidMount() {
        const { selectedCategory, fetchProductsByCategory } = this.props;
        if (selectedCategory.id) {
            fetchProductsByCategory(selectedCategory.id);
        }
    }

    componentDidUpdate(prevProps) {
        const { selectedCategory, fetchProductsByCategory } = this.props;
        if (prevProps.selectedCategory.id !== selectedCategory.id && selectedCategory.id) {
            fetchProductsByCategory(selectedCategory.id);
        }
    }

    render() {
        const { products, loading, error, selectedCategory } = this.props;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Can't fetch categories</p>;

        return (
            <div>
                <h1 className='uppercase font-raleway font-normal text-4xl mb-[130px]'>{selectedCategory.name}</h1>
                <div className='grid gap-3 grid-cols-3'>
                    {products.map((item) => (
                        <Product key={item.id} product={item} />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products.items,
    loading: state.products.loading,
    error: state.products.error,
    selectedCategory: state.categories.selectedCategory,
});

const mapDispatchToProps = {
    fetchProductsByCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
