import React, { useRef, useState, useEffect } from 'react';
import { Image } from '@chakra-ui/react';
import { Select } from "@chakra-ui/react";
import { VscChromeClose } from 'react-icons/vsc'; // Fixed import for VscChromeClose
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Productoncart = ({ product }) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(product.qty); // Initialize qty with product.qty
    const select = useRef(null);

    useEffect(() => {
        // You can add side effects here if needed
        console.log(product.images);
    }, [product.images]);

    // const optionValue = () => {
    //     setQty(parseInt(select.current.value));
    // };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className='productcart'>
            <div className='imagecart'>
                <Image objectFit="cover" src={product.images[0]} />
            </div>
            <div>
                <Link to={`/product/${product.product}`}>
                    <h2 className='productname'>{product.name}</h2>
                </Link>
                <h2 className='priceproduct'>{product.price}$</h2>
                <h2 className='sandh'>Sold and shipped by FedEx</h2>
            </div>
            <div className='qtyoption'>
                <Select
                    ref={select}
                    value={qty}
                    onChange={e => {
                        const newQty = Number(e.target.value);
                        setQty(newQty);
                        dispatch(addToCart(product.product, newQty));
                    }}
                >
                    {[...Array(product.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                </Select>
                <h2>{(qty * product.price).toFixed(2)}$</h2>
            </div>
            <VscChromeClose className='deletecart' size='26' onClick={() => removeFromCartHandler(product.product)} />
        </div>
    );
};

export default Productoncart;
