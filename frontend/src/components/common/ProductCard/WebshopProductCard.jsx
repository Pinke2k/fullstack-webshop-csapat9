import './ProductCard.css'
;
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';


export default function ProductCard (props){

return  (
    <div className="product-card">
        <img src={props.product.url} alt="image" className="image" />
        <h1 className="product-title">{props.product.name}</h1>
        <h2 className="product-price">{props.product.price + " Ft"}</h2>
        <h2 className='add-product'>Kosárba</h2>
    </div>
);
}