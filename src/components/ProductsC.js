import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardProduct from './CardProduct';
import { listProducts, ListproductbyCg, Listproductbyfiter, Listproductbyprice } from '../actions/productActions';
import { BsFilter } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import Search from './Search';
import { NumberInput, NumberInputField, FormLabel, Button, Stack, FormControl } from '@chakra-ui/react';
import HashLoader from 'react-spinners/HashLoader';
import { Link } from 'react-router-dom';

const ProductsC = ({ match, history }) => {
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const Cg = new URLSearchParams(window.location.search).get('cg');
    const keyword = window.location.pathname.split('/')[2];
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const productbycg = useSelector(state => state.ListproductbyCg);
    // const productbyfilter = useSelector(state => state.Listproductbyfilter);
    const productbyprice = useSelector(state => state.Listproductbyprice);

    const { loading, error, products } = productbycg || productList || productbyprice || {};

    useEffect(() => {
        if (Cg) {
            if (new URLSearchParams(window.location.search).get('cg') === Cg) {
                dispatch(ListproductbyCg(Cg));
            } else {
                dispatch(Listproductbyfiter(Cg));
            }
        } else {
            dispatch(listProducts(keyword));
        }
    }, [dispatch, Cg, keyword]);

    const handleFilterToggle = () => {
        setShowFilter(prev => !prev);
        if (showSearch) setShowSearch(false);
    };

    const handleSearchToggle = () => {
        setShowSearch(prev => !prev);
        if (showFilter) setShowFilter(false);
    };

    const handlePriceFilter = () => {
        dispatch(Listproductbyprice(from, to));
    };

    return (
        <>
            <div className='Cgfilter'>
                <h1>{Cg ? Cg : keyword ? `*${keyword}* Search` : 'All'} Products</h1>
                <div className='filtersbtn'>
                    <button
                        className={`filterbtn ${showFilter ? 'activebtn' : ''}`}
                        onClick={handleFilterToggle}
                    >
                        {showFilter ? <IoMdClose size='20' /> : <BsFilter size='20' />} Filter
                    </button>

                    <button
                        className={`searchbtn ${showSearch ? 'activebtn' : ''}`}
                        onClick={handleSearchToggle}
                    >
                        {showSearch ? <IoMdClose size='20' /> : <AiOutlineSearch size='20' />} Search
                    </button>
                </div>

                <div className='filters'>
                    <ul>
                        <Link className='lined' to='?cg'>All</Link>
                        <Link className='lined' to='?cg=Men'>Men</Link>
                        <Link className='lined' to='?cg=Women'>Women</Link>
                        <Link className='lined' to='?cg=Watches'>Watches</Link>
                        <Link className='lined' to='?cg=Shoes'>Shoes</Link>
                        <Link className='lined' to='?cg=Bag'>Bag</Link>
                    </ul>
                </div>
            </div>

            {showSearch && <Search history={history} />}
            
            <div className={`filterarea ${showFilter ? 'filter' : 'filteroff'}`}>
                <div className='sortbydiv'>
                    <h1>Sort By</h1>
                    <ul>
                        <Link onClick={() => setShowFilter(false)} className='lined' to='?filter'>Default</Link>
                        <Link onClick={() => setShowFilter(false)} className='lined' to='?filter=Rating'>Rating</Link>
                        <Link onClick={() => setShowFilter(false)} className='lined' to='?filter=date'>Date</Link>
                        <Link onClick={() => setShowFilter(false)} className='lined' to='?filter=highprice'>Low to high price</Link>
                        <Link onClick={() => setShowFilter(false)} className='lined' to='?filter=lowprice'>High to low price</Link>
                    </ul>
                </div>
                <div className='pricediv'>
                    <h1>Price</h1>
                    <FormControl id="price">
                        <Stack spacing={2}>
                            <FormLabel>From:</FormLabel>
                            <NumberInput value={from} onChange={(value) => setFrom(value)} bg='white'>
                                <NumberInputField />
                            </NumberInput>
                            <FormLabel>To:</FormLabel>
                            <NumberInput value={to} onChange={(value) => setTo(value)} bg='white'>
                                <NumberInputField />
                            </NumberInput>
                            <Button onClick={handlePriceFilter} colorScheme="teal">Filter</Button>
                        </Stack>
                    </FormControl>
                </div>
            </div>

            {loading ? (
                <div className='loading'>
                    <HashLoader color={"#fff"} loading={loading} size={40} />
                </div>
            ) : error ? (
                <h2>{error}</h2>
            ) : products.length === 0 ? (
                <h1 className='nothingfound'>Nothing Found !!!</h1>
            ) : (
                <div className='cardsProduct'>
                    {products.map(product => (
                        <CardProduct key={product._id} product={product} />
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductsC;
