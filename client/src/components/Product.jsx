import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../store/features/cartSlice";
import { stringToKebabCase } from "./ProductAttributes";

class Product extends Component {
    getFirstAttributes() {
        const { product } = this.props;
        let attributes = {};
        product.attributes.forEach(attribute => {
            attributes[attribute.id] = attribute.items[0].id;
        });
        return attributes;
    }

    handleAddToCart = (e) => {
        e.preventDefault();
        const { product, dispatch } = this.props;
        dispatch(addToCart({
            id: (Date.now()).toString(),
            product_id: product.id,
            price: product.prices.amount,
            name: product.name,
            attributes: this.getFirstAttributes(),
            quantity: 1
        }));
    }

    render() {
        const { product } = this.props;

        if (!product) return <h1>Cannot get product</h1>;

        return (
            <Link
                data-testid={`product-${stringToKebabCase(product.name)}`}
                to={`/product/${product.id}`}
                className='border-solid grid-1 p-5 rounded-md bg-white relative duration-300 hover:duration-300 hover:shadow-productItem group'
            >
                <div className='relative mb-[24px]'>
                    <img className={`h-[300px] block my-0 mx-auto ${!product.inStock && 'opacity-50'}`}
                         src={product.gallery[0]} alt={product.name} />
                    {
                        !product.inStock &&
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <p className='font-raleway text-2xl text-customGray'>OUT OF STOCK</p>
                        </div>
                    }
                    {
                        product.inStock &&
                        <button onClick={this.handleAddToCart} className='hidden group-hover:block absolute bottom-0 right-[10px] translate-y-1/2 bg-mainColor rounded-full hover:scale-125'>
                            <img className='p-2' src={require('../src/media/itemCart.png')} alt='cart logo' />
                        </button>
                    }
                </div>
                <h3 className='font-raleway font-light text-lg'>{product.name}</h3>
                <div className={`prices font-raleway font-bold text-base leading-[28.8px] ${product.inStock ? '' : 'text-customGray'}`}>
                    <span>{product.prices.currency.symbol}</span>
                    <span>{product.prices.amount.toFixed(2)}</span>
                </div>
            </Link>
        );
    }
}

export default connect()(Product);