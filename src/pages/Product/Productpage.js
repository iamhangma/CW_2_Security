// Productpage.js

import React, { useEffect, useState, useRef } from 'react';
import Rating from '../../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { listProductDetails, createProductReview, resetProductReview } from '../../actions/productActions'; // Ensure correct import
import { IoLogoFacebook } from "react-icons/io";
import { AiFillTwitterCircle, AiFillInstagram, AiFillShop } from "react-icons/ai";
import { MdDoNotDisturb } from "react-icons/md";
import { Image, Select, Button, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";
import './product.css';
import { Link } from 'react-router-dom';


const Productpage = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const imgShowcase = useRef(null);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch(resetProductReview());
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match.params.id, successProductReview]);

  const submitHandler = () => {
    dispatch(createProductReview(match.params.id, {
      rating,
      comment
    }));
  };

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className='productpage'>
        {loading ? (
          <div className='loading-product'>
            <HashLoader color={"#1e1e2c"} loading={loading} size={50} />
          </div>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <div className="card-wrapper">
            <div className="card">
              <div className="product-imgs">
                <div className="img-display">
                  <div ref={imgShowcase} className="img-showcase">
                    {product.images.map((i, index) => (
                      <Image key={index} src={i} />
                    ))}
                  </div>
                </div>
                <div className="img-select">
                  {product.images.map((i, index) => (
                    <div key={index} className="img-item" onClick={() => imgShowcase.current.style.transform = `translateX(-${index * 100}%)`}>
                      <Image src={i} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-content">
                <h2 className="product-title">{product.name}</h2>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <FormControl>
                  <FormLabel htmlFor='qty'>Qty</FormLabel>
                  <Select id='qty' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                    {[...Array(product.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </Select>
                </FormControl>
                {product.countInStock > 0 && (
                  <Button onClick={addToCartHandler} colorScheme='teal' variant='outline'>
                    Add to Cart
                  </Button>
                )}
                {errorProductReview && <p>{errorProductReview}</p>}
                <FormControl>
                  <FormLabel htmlFor='rating'>Rating</FormLabel>
                  <Select id='rating' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value=''>Select...</option>
                    {[...Array(5).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>{x + 1} Stars</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='comment'>Comment</FormLabel>
                  <Textarea id='comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                </FormControl>
                <Button onClick={submitHandler} colorScheme='blue'>Submit Review</Button>
              </div>
            </div>
            <div className="social-share">
              <h3>Share this product</h3>
              <div className="social-icons">
                <IoLogoFacebook />
                <AiFillTwitterCircle />
                <AiFillInstagram />
                <AiFillShop />
                <MdDoNotDisturb />
              </div>
            </div>
            <div className="product-links">
              <Link to='/'>Back to Home</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Productpage;
