import React, { Component } from 'react';
import { fetchGraphQL } from "../graphql/fetchGraphQL";
import { GET_PRODUCT_BY_ID } from "../graphql/queries";
import { connect } from "react-redux";
import {
    changeItemAttribute,
    checkForUpdatedDatas,
    decreaseItemCount,
    increaseItemCount
} from "../store/features/cartSlice";
import ProductAttributes from "./ProductAttributes";

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            loading: false,
        };
    }

    componentDidMount() {
        this.fetchProduct();
    }

    async fetchProduct() {
        this.setState({ loading: true });
        const { data, dispatch } = this.props;
        const { product } = await fetchGraphQL(GET_PRODUCT_BY_ID, { product_id: data.product_id }) || null;
        this.setState({ product });
        dispatch(checkForUpdatedDatas({ product_id: data.id, name: product.name, price: product.prices.amount }));
        this.setState({ loading: false });
    }

    handleIncrease = () => {
        this.props.dispatch(increaseItemCount(this.props.data.id));
    };

    handleDecrease = () => {
        this.props.dispatch(decreaseItemCount(this.props.data.id));
    };

    handleAttributeChange = (name, value) => {
        // this.props.dispatch(changeItemAttribute({ itemId: this.props.data.id, attributeName: name, attributeValue: value }));
    };

    render() {
        const { product, loading } = this.state;
        const { data } = this.props;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (!product) {
            return <div>Product not found</div>;
        }

        return (
            <div data-testid='cart-total' className='flex justify-between mb-10'>
                <div className='flex justify-between w-[60%]'>
                    {/* details */}
                    <div>
                        <p className='font-raleway font-[300] mb-1 text-[18px]'>{product.name}</p>
                        <p className='font-raleway font-[400] mb-2 text-[16px]'>{product.prices.currency.symbol}{product.prices.amount}</p>

                        <ProductAttributes
                            attributes={product.attributes}
                            selectedAttributes={data.attributes}
                            handleAttributeChange={this.handleAttributeChange}
                            cart={true}
                        />
                    </div>

                    {/* counter */}
                    <div className='flex justify-between items-center flex-col font-raleway text-xl font-[400] ml-1'>
                        <button data-testid='cart-item-amount-increase' className='border border-customBlack h-8 w-8 flex justify-center items-center'
                                onClick={this.handleIncrease}>
                            +
                        </button>

                        <p data-testid='cart-item-amount'>{data.quantity}</p>

                        <button data-testid='cart-item-amount-decrease' className='border border-customBlack h-8 w-8 flex justify-center items-center'
                                onClick={this.handleDecrease}>
                            -
                        </button>
                    </div>
                </div>

                {/* img */}
                <div className='w-[35%]'>
                    <img src={product.gallery[0]} alt={product.name} />
                </div>
            </div>
        );
    }
}

export default connect()(CartItem);
