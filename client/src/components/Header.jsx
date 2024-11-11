import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from '../store/features/categorySlice';
import Categories from './Categories';
import Cart from './Cart';

class Header extends Component {
    componentDidMount() {
        this.props.dispatch(fetchCategories());
    }

    render() {
        const { cartOpen } = this.props;
        return (
            <div className='text-base font-raleway text-customBlack'>

                <header className="relative z-20 bg-white">
                    <div className="relative container pt-7 flex justify-between items-center">

                        <div className='w-1/3'>
                            <Categories />
                        </div>

                        <div className='w-1/3 flex justify-center'>
                            <img className='block' src={require('../src/media/logo.png')} alt="Logo" />
                        </div>

                        <div className='w-1/3 flex justify-end'>
                            <Cart />
                        </div>

                    </div>
                </header>

                <div className="pt-[80px]">
                    <div className="container">
                        <Outlet />
                    </div>
                </div>

                {cartOpen && (
                    <div className="fixed h-full w-full top-0 left-0 bg-[#393748] opacity-[22%] z-10"></div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cartOpen: state.cart.cartOpen,
});

export default connect(mapStateToProps)(Header);
