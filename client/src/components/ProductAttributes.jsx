import React, { Component } from 'react';

export function stringToKebabCase(str) {
    return str.toLowerCase().split(" ").join('-');
}

class ProductAttributes extends Component {
    render() {
        const { attributes, selectedAttributes, handleAttributeChange, cart } = this.props;

        if (!attributes || attributes.length === 0) return null;

        return (
            attributes.map(attribute => (
                <div
                    key={attribute.id}
                    data-testid={`cart-item-attribute-${stringToKebabCase(attribute.name)}`}
                    className={cart ? 'mb-4' : 'mb-[30px]'}>
                    <h2 className={'productDetailTitle mb-2 ' + (cart ? 'font-[400]' : 'font-[700]')}>{attribute.name}:</h2>
                    <div className='flex flex-wrap'>
                        {
                            attribute.items.map(item => {
                                if (attribute.type === 'swatch') {
                                    return (
                                        <button
                                            disabled={cart&&'disabled'}
                                            key={attribute.id + '-' + item.id}
                                            data-testid={cart ? `cart-item-attribute-${stringToKebabCase(attribute.name)}-${stringToKebabCase(item.value)}${selectedAttributes[attribute.id] === item.id ? "-selected" : ""}` : ''}
                                            style={{ backgroundColor: item.value }}
                                            className={`mr-2 outline outline-[1px] outline-offset-[2px] ` + (cart ? "w-4 h-4 " : "w-8 h-8 ") + (selectedAttributes[attribute.id] === item.id ? 'outline-mainColor' : 'outline-transparent')}
                                            onClick={() => handleAttributeChange(attribute.id, item.id)}
                                        >
                                        </button>
                                    );
                                }
                                return (
                                    <button
                                        disabled={cart&&'disabled'}
                                        key={attribute.id + '-' + item.id}
                                        data-testid={cart ? `cart-item-attribute-${stringToKebabCase(attribute.name)}-${stringToKebabCase(item.value)}${selectedAttributes[attribute.id] === item.id ? "-selected" : ""}` : ''}
                                        className={'border-[1px] font-source-sans-pro ' + (cart ? "py-[3px] px-[3px] font-[10px] mb-1 mr-2 " : "py-[13px] px-[14px] mr-3 mb-2 ") + (selectedAttributes[attribute.id] === item.id && 'bg-customBlack text-white')}
                                        onClick={() => handleAttributeChange(attribute.id, item.id)}
                                    >
                                        {item.displayValue}
                                    </button>
                                );
                            })
                        }
                    </div>
                </div>
            ))
        );
    }
}

export default ProductAttributes;