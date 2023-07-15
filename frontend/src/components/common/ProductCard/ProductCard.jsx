import './ProductCard.css'



export default function ProductCard (props){



return  (
    <div className="product-card">
    
           {/* <img src={props.product.url} alt="image" className="image" /> */ }
        
         <div className="product-content">
            <h1 className="product-title">{props.product.name}</h1>

            <h3 className="product-description">{props.product.description}</h3> 

            <h2 className="product-price">{props.product.price + " Ft"}</h2>

          
        </div>
    </div>
);
}