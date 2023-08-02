import './ProductCard.css'
;
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';


export default function ProductCard (props){

return  (
    <div className="product-card">
        <img src="https://picsum.photos/100/100"/*{props.product.url}*/ alt="image" className="image" />
        <h1 className="product-title">{props.product.name}</h1>
        <div className="product-price">{props.product.price + " Ft"}</div>
        <button className='add-product'>Kosárba</button>
        
    </div>
);
}