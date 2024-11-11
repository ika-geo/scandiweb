import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from "./CartItem";
import { createOrder, openCloseCart } from "../store/features/cartSlice";

class Cart extends Component {
    handlePlaceOrder = () => {
        const { cartItems, dispatch } = this.props;
        const order = cartItems.map(cartItem => {
            const attributes = Object.keys(cartItem.attributes).map(attributeName => ({
                name: attributeName,
                value: cartItem.attributes[attributeName],
            }));
            return {
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
                price: cartItem.price,
                attributes,
            };
        });
        dispatch(createOrder(order));
    };

    handleOpenCloseCart = () => {
        this.props.dispatch(openCloseCart());
    };

    render() {
        const { totalItems, totalPrice, cartOpen, cartItems } = this.props;

        return (
            <div>
                <button data-testid='cart-btn' onClick={this.handleOpenCloseCart} className="cursor-pointer relative">
                    <img src={require('../src/media/cart.png')} alt="cart" />
                    {totalItems > 0 && (
                        <div className='absolute top-[-15px] right-[-15px] px-1 min-h-[23px] min-w-[23px] rounded-full bg-black text-white text-center flex justify-center items-center'>
                            <span>{totalItems}</span>
                        </div>
                    )}
                </button>
                {cartOpen && (
                    <div className="absolute bg-white top-[100%] right-0 min-h-[100px] w-[350px] px-4 py-8">
                        <h1 className='font-raleway font-[700] text-[16px] mb-8'>
                            My Bag, <span className='font-[500]'>{totalItems} items</span>
                        </h1>
                        <div>
                            {cartItems.map(item => (
                                <CartItem key={item.id} data={item} />
                            ))}
                            <div className='flex justify-between font-roboto-condensed mb-8'>
                                <p className='font-[500]'>Total</p>
                                <p className='font-[700]'>${totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                        <button
                            disabled={!totalItems}
                            className={'primaryButton py-[13px] ' + (!totalItems ? 'opacity-50' : '')}
                            onClick={this.handlePlaceOrder}
                        >
                            PLACE ORDER
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    totalItems: state.cart.totalItems,
    totalPrice: state.cart.totalPrice,
    cartOpen: state.cart.cartOpen,
    cartItems: state.cart.items,
});

export default connect(mapStateToProps)(Cart);
