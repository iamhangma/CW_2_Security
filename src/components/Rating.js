import React from 'react';
import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai'; // Import from 'react-icons/ai'
import { BsStarHalf, BsStar } from 'react-icons/bs'; // Import from 'react-icons/bs'

const Rating = ({ value, text }) => {
    return (
        <div className="product-rating">
            <span>{value >= 1 ? <AiFillStar /> : value >= 0.5 ? <BsStarHalf /> : <BsStar />}</span>
            <span>{value >= 2 ? <AiFillStar /> : value >= 1.5 ? <BsStarHalf /> : <BsStar />}</span>
            <span>{value >= 3 ? <AiFillStar /> : value >= 2.5 ? <BsStarHalf /> : <BsStar />}</span>
            <span>{value >= 4 ? <AiFillStar /> : value >= 3.5 ? <BsStarHalf /> : <BsStar />}</span>
            <span>{value >= 5 ? <AiFillStar /> : value >= 4.5 ? <BsStarHalf /> : <BsStar />}</span>
            {text && <span>{text}</span>}
        </div>
    );
};

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string // 'text' is not required
};

export default Rating;
