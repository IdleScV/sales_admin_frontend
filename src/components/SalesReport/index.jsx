import React, { useState } from 'react';
import { URL } from '../../url';

function SalesReport({ salesData, firebaseId, salesDataSet }) {
	const [ customerFilter, customerFilterSet ] = useState('');
	const [ merchantFilter, merchantFilterSet ] = useState('');
	const [ itemFilter, itemFilterSet ] = useState('');
	const [ addressFilter, addressFilterSet ] = useState('');
	const [ cleaned, cleanedSet ] = useState(false);

	const findTotal = () => {
		let total = 0;
		salesData.forEach((sale) => (total += sale.item.price * sale.quantity));
		return total.toFixed(2);
	};

	const findFilteredTotal = () => {
		let total = 0;
		salesData
			.filter((sale) => sale.customer.name.includes(customerFilter))
			.filter((sale) => sale.item.description.includes(itemFilter))
			.filter((sale) => sale.merchant.name.includes(merchantFilter))
			.filter((sale) => sale.merchant.address.includes(addressFilter))
			.forEach((sale) => (total += sale.item.price * sale.quantity));

		return total.toFixed(2);
	};

	// deletes all sale logs in the database
	const handleClear = () => {
		fetch(URL + 'sales/' + firebaseId, {
			method: 'DELETE'
		})
			.then((response) => response.json())
			.then((json) => salesDataSet([]));
	};

	// remove duplicate logs of the same sale & instead increases the quantity
	const cleanUp = (salesData) => {
		if (cleaned) {
			let arr = [];
			salesData.forEach((sale) => {
				// checks if there is a duplicate
				let found = arr.find(
					(saved) =>
						saved.customer.name === sale.customer.name &&
						saved.item.description === sale.item.description &&
						saved.item.price === sale.item.price &&
						saved.merchant.name === sale.merchant.name &&
						saved.merchant.address === sale.merchant.address
				);
				if (found) {
					found.quantity += sale.quantity;
				} else {
					let obj = {
						customer: { name: sale.customer.name },
						item: { description: sale.item.description, price: sale.item.price },
						quantity: sale.quantity,
						merchant: { name: sale.merchant.name, address: sale.merchant.address }
					};
					arr.push(obj);
				}
			});

			return arr;
		} else {
			return salesData;
		}
	};

	return (
		<div id="salesreport">
			<div className="filters">
				<div className="inputs">
					<input
						placeholder="customer"
						onChange={(e) => {
							customerFilterSet(e.target.value);
						}}
						value={customerFilter}
					/>
					<input
						placeholder="item"
						onChange={(e) => {
							itemFilterSet(e.target.value);
						}}
						value={itemFilter}
					/>
					<input
						placeholder="merchant"
						onChange={(e) => {
							merchantFilterSet(e.target.value);
						}}
						value={merchantFilter}
					/>
					<input
						placeholder="address"
						onChange={(e) => {
							addressFilterSet(e.target.value);
						}}
						value={addressFilter}
					/>
				</div>
				<div>
					<button variant="contained" onClick={() => cleanedSet(!cleaned)}>
						{cleaned ? 'UnClean' : 'Clean Up'}
					</button>
				</div>
			</div>
			<div className="salesdata">
				<div id="sale-row" className="sale-row-header">
					<div className="column-one">Customer</div>
					<div className="column-two">Item</div>
					<div className="column-three">Price</div>
					<div className="column-four">Quantity</div>
					<div className="column-five">Name</div>
					<div className="column-six">Address</div>
				</div>
				{salesData ? salesData.length > 0 ? (
					// uses filters
					cleanUp(salesData)
						.filter((sale) => sale.customer.name.includes(customerFilter))
						.filter((sale) => sale.item.description.includes(itemFilter))
						.filter((sale) => sale.merchant.name.includes(merchantFilter))
						.filter((sale) => sale.merchant.address.includes(addressFilter))
						.map((sale, i) => <SaleRow sale={sale} key={i} />)
				) : (
					<div id="noData">add a CSV file</div>
				) : (
					<div id="noData">Loading sales data</div>
				)}
			</div>
			<div className="total">
				<button onClick={handleClear}>Delete all data</button>
				<h3>Total Filtered Revenue: ${salesData ? findFilteredTotal() : '0'}</h3>
				<h3>Total Sales Revenue: ${salesData ? findTotal() : '0'}</h3>
			</div>
		</div>
	);
}

function SaleRow({ sale }) {
	return (
		<div id="sale-row">
			<div className="column-one">{sale.customer.name}</div>
			<div className="column-two">{sale.item.description}</div>
			<div className="column-three">{sale.item.price}</div>
			<div className="column-four">{sale.quantity}</div>
			<div className="column-five">{sale.merchant.name}</div>
			<div className="column-six">{sale.merchant.address}</div>
		</div>
	);
}

export default SalesReport;
