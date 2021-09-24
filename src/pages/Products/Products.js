import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import ProductContainer from '../../components/product/Product';
import ProductFilter from '../../components/small components/ProductFilter';
import { db } from '../../firebase/firebaseUtility';
import './products.scss';

const Products = () => {
	const [inventory, setInventory] = useState([]);

	const history = useHistory();
	const { filterGender } = useParams();
	const { filterType } = useParams();
	const { pathname } = useLocation();

	const fetchData = async (type, gender) => {
		const response = db.collection('products');
		const data = await response.get();

		setInventory([]);
		data.docs.forEach((item) => {
			let data = item.data();
			data.uid = item.id;
			if (!gender && !type) {
				//show all
				setInventory((inventory) => [...inventory, data]);
			}
			if (gender === 'all' && type === item.data().type) {
				//show all gender with especific type
				setInventory((inventory) => [...inventory, data]);
			}
			if (!type && gender === item.data().gender) {
				//show all type with especific gender
				setInventory((inventory) => [...inventory, data]);
			}
			if (type === item.data().type && gender === item.data().gender) {
				//show especific type and gender
				setInventory((inventory) => [...inventory, data]);
			}
		});
	};
	useEffect(() => {
		fetchData(filterType, filterGender);
	}, [filterType, filterGender]);

	const handleGenderFilter = (e) => {
		const nextFilter = e.target.value;
		history.push(`/products/${nextFilter}`);
	};

	const handleTypeFilter = (e) => {
		const nextFilter = e.target.value;
		const prevPath = pathname.split('/')[2];
		if (nextFilter === 'all') {
			history.push(`/products`);
		} else if (
			prevPath === '' ||
			prevPath === 'shoes' ||
			prevPath === 'shirts' ||
			!prevPath
		) {
			history.push(`/products/all/${nextFilter}`);
		} else {
			history.push(`/products/${prevPath}/${nextFilter}`);
		}
	};

	const filterConfigGender = [
		{
			name: 'Show all',
			value: '',
		},
		{
			name: 'Men',
			value: 'men',
		},
		{
			name: 'Women',
			value: 'women',
		},
	];
	const filterConfigTypes = [
		{
			name: 'Show all',
			value: '',
		},
		{
			name: 'Shoes',
			value: 'shoes',
		},
		{
			name: 'Shirts',
			value: 'shirts',
		},
	];

	return (
		<main className="products-main">
			<div className="filters">
				<ProductFilter
					title="gender"
					handleChange={handleGenderFilter}
					options={filterConfigGender}
					defaultValue={filterGender}
				/>
				<ProductFilter
					title="types"
					handleChange={handleTypeFilter}
					options={filterConfigTypes}
					defaultValue={filterType || ''}
				/>
			</div>
			{inventory.map((product, index) => {
				return (
					<ProductContainer
						image={product.image}
						alt={product.alt}
						displayName={product.displayName}
						price={product.price}
						key={index}
						uid={product.uid}
					/>
				);
			})}
		</main>
	);
};

export default Products;
