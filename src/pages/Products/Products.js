import React, { useEffect } from 'react';
import ProductContainer from '../../components/product/Product';
import { inventory } from '../../firebase/firebaseUtility';
import './products.scss'

const Products = () => {
	return (
		<div className='products-main'>
			{inventory.map((product) => {
				return (
					<ProductContainer
						image={product.image}
						alt={product.alt}
						displayName={product.displayName}
						price={product.price}
						key={product.id}
					/>
				);
			})}
		</div>
	);
};

export default Products;
