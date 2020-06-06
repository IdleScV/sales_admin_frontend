import React, { useState } from 'react';
import Papa from 'papaparse';
import { URL } from '../../url';

function Upload({ salesDataSet, salesData, firebaseId }) {
	const [ upload, uploadSet ] = useState(undefined);
	const [ csvfile, csvfileSet ] = useState(undefined);
	const [ message, messageSet ] = useState(undefined);

	const handleChange = (e) => {
		uploadSet(e.target.files[0]);
	};

	// converts uploaded file into array of objects
	const handleImport = () => {
		Papa.parse(upload, {
			// runs csvfileSet(results)
			complete: csvfileSet,
			// true makes results an array of objects(headers as key), false makes it arrays of arrays(includes header)
			header: false
		});
		messageSet('File successfully converted, press upload to add to database');
	};

	const handleUpload = () => {
		let validHeader = [
			'Customer Name',
			'Item Description',
			'Item Price',
			'Quantity',
			'Merchant Name',
			'Merchant Address'
		];
		// hard coded comparison of two strings
		if (JSON.stringify(csvfile.data[0]) === JSON.stringify(validHeader)) {
			// send data (except header) to backend & modify frontend data
			postRequest(csvfile.data.slice(1));
			updateSpreadSheet(csvfile.data.slice(1));
		} else {
			messageSet('This file is not valid');
		}
	};

	const postRequest = (data) => {
		fetch(URL + 'sales', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ firebaseId: firebaseId, data: data })
		})
			.then((response) => response.json())
			.then((json) => messageSet(json.message), uploadSet(undefined), csvfileSet(undefined));
	};

	const updateSpreadSheet = (data) => {
		let arr = [];
		// reformat to fit the data passed back from database
		data.forEach((sale) => {
			let obj = {
				customer: { name: sale[0] },
				item: { description: sale[1], price: parseFloat(sale[2]) },
				quantity: parseInt(sale[3]),
				merchant: { name: sale[4], address: sale[5] }
			};
			arr.push(obj);
		});
		salesDataSet(salesData.concat(arr));
	};

	return (
		<div id="upload">
			<h2>Import CSV File</h2>
			<input type="file" name="file" onChange={handleChange} />
			<button onClick={handleImport} disabled={upload === undefined}>
				Import !
			</button>
			<button onClick={handleUpload} disabled={csvfile === undefined}>
				Upload
			</button>
			{message ? <div> {message} </div> : null}
		</div>
	);
}

export default Upload;
