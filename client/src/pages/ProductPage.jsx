import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductById } from '../store/features/productSlice';
import parse from 'html-react-parser';
import ProductAttributes from "../components/ProductAttributes";
import { addToCart, openCloseCart } from "../store/features/cartSlice";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Gallery from "../components/Gallery";

// Helper function to use hooks in a class component
function withRouter(Component) {
    return function(props) {
        const params = useParams();
        const navigate = useNavigate();
        const location = useLocation();
        return <Component {...props} params={params} navigate={navigate} location={location} />;
    };
}

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAttributes: {}
        };
    }

    componentDidMount() {
        const { productId } = this.props.params;
        this.props.fetchProductById(productId);
    }

    componentDidUpdate(prevProps) {
        const { productId } = this.props.params;
        if (prevProps.params.productId !== productId) {
            this.props.fetchProductById(productId);
        }
    }

    handleAttributeChange = (name, value) => {
        this.setState(prevState => ({
            selectedAttributes: {
                ...prevState.selectedAttributes,
                [name]: value
            }
        }));
    };

    handleAddToCart = () => {
        const { product } = this.props;
        const { selectedAttributes } = this.state;
        this.props.addToCart({
            id: (Date.now()).toString(),
            product_id: product.id,
            price: product.prices.amount,
            name: product.name,
            attributes: selectedAttributes,
            quantity: 1
        });
        this.props.openCloseCart();
    };

    render() {
        const { product, loading, error } = this.props;
        const { selectedAttributes } = this.state;

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Some problem in fetching product</p>;
        if (!product) return <p>Product not found</p>;

        return (
            <div className="flex">
                <Gallery product={product} />

                <div className='w-[292px]'>
                    <h1 className='font-semibold text-2xl mb-8'>{product.name}</h1>

                    <ProductAttributes
                        attributes={product.attributes}
                        selectedAttributes={selectedAttributes}
                        handleAttributeChange={this.handleAttributeChange}
                        cart={false}
                    />

                    <div className='mt-[27px] mb-5'>
                        <h2 className='productDetailTitle'>PRICE</h2>
                        <p className='font-raleway font-bold text-2xl'>{product.prices.currency.symbol}{product.prices.amount.toFixed(2)}</p>
                    </div>

                    <button
                        data-testid='add-to-cart'
                        disabled={!product.inStock || Object.keys(selectedAttributes).length !== product.attributes.length}
                        className={'primaryButton py-4 mb-8 ' + (Object.keys(selectedAttributes).length !== product.attributes.length ? "opacity-35 " : "") + (!product.inStock && 'opacity-50 cursor-not-allowed')}
                        onClick={this.handleAddToCart}
                    >
                        add to cart
                    </button>

                    <div data-testid='product-description'>{parse(product.description)}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    product: state.products.selectedProduct,
    loading: state.products.loading,
    error: state.products.error,
});

const mapDispatchToProps = {
    fetchProductById,
    addToCart,
    openCloseCart
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));
