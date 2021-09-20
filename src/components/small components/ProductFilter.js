import React from 'react';
import './productFilter.scss';

const ProductFilter = ({ title, handleChange, defaultValue, options }) => {
	return (
		<div className="filters-container">
			<select
				name={title}
				id={title}
				value={defaultValue}
				onChange={handleChange}
			>
				{options.map((option, index) => {
					return (
						<option value={option.value} key={index}>
							{option.name}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default ProductFilter;
