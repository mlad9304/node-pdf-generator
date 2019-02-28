const router = require('koa-router')();
const PdfPrinter = require('pdfmake');

const fonts = {
	Roboto: {
		normal: 'fonts/Raleway-Regular.ttf',
		bold: 'fonts/Raleway-Medium.ttf',
		italics: 'fonts/Raleway-Italic.ttf',
		bolditalics: 'fonts/Raleway-Italic.ttf',
	},
};
const printer = new PdfPrinter(fonts);

const formFieldsArray = [
	[
		{
			field: 'station',
			value: 'MembTrtWtr',
		},
		{
			field: 'sample_id',
			value: 'CHW.1810.MEM.001',
		},
		{
			field: 'analyte',
			value: '1,2,3-TCP',
		},
		{
			field: 'method_number',
			value: 'EPA 524M',
		},
		{
			field: 'sample_type',
			value: 'grab',
		},
		{
			field: 'container_type_quantity',
			value: '4 x 40ml Amber VOA',
		},
		{
			field: 'hold_days',
			value: '14',
		},
		{
			field: 'preservation_requirements',
			value: 'HCL,pH<=2,<=6C',
		},
		{
			field: 'temp',
			value: '',
		},
		{
			field: 'preserve',
			value: '',
		},
		{
			field: 'collected',
			value: '',
		},
		{
			field: 'sample_by',
			value: '',
		},
	],
	[
		{
			field: 'station',
			value: 'Well 1',
		},
		{
			field: 'sample_id',
			value: 'CHW.1810.Wl_.001',
		},
		{
			field: 'analyte',
			value: '1,2,3-TCP',
		},
		{
			field: 'method_number',
			value: 'EPA 524M',
		},
		{
			field: 'sample_type',
			value: 'grab',
		},
		{
			field: 'container_type_quantity',
			value: '4 x 40ml Amber VOA',
		},
		{
			field: 'hold_days',
			value: '14',
		},
		{
			field: 'preservation_requirements',
			value: 'HCL,ph<=2,<=6C',
		},
		{
			field: 'temp',
			value: '',
		},
		{
			field: 'preserve',
			value: '',
		},
		{
			field: 'collected',
			value: '',
		},
		{
			field: 'sample_by',
			value: '',
		},
	],
];

router.get('/', async function(ctx) {
	ctx.set('Content-Type', 'application/pdf');
  ctx.body = await new Promise(resolve => {
    createPDF((err, doc) => {
      if (err) {
        console.log(err);
      } else {
				const chunks = [];
				doc.on('data', chunk => {
					chunks.push(chunk);
				});

				doc.on('end', () => {
					const result = Buffer.concat(chunks);
					resolve(result);
				});

				doc.end();
      }
    });
  });
});

function createPDF(errback) {
	const tableBody = [];
	formFieldsArray.forEach(formFields => {
		const values = [];
		formFields.forEach(formField => {
			const { value } = formField;
			values.push(value);
		});
		tableBody.push(values);
	});

	const docDefinition = {
		pageSize: {
			width: 781.2,
			height: 604.08,
		},

		pageMargins: [30, 30, 30, 30],

		content: [
			{
				columns: [
					{
						width: '50%',
						text: 'CHAIN OF CUSTODY & ANALYSIS REQUEST - BRACEWELL ENGINEERING, INC.',
					},
					{
						width: 90,
						text: 'Form # CHW.18.090'
					},
					{
						width: 200,
						text: 'Work order #:'
					}
				],
				columnGap: 30,
			},
			{
				text: 'Plant ID: Cinnabar Hills Golf Course Water System (W4301008)',
				style: 'row',
			},
			{
				text: '10/10/18 through 10/15/18',
				style: 'row',
			},
			{
				text: 'SAMPLE & ANALYSIS REQUEST:',
				style: 'row',
			},
			{
				layout: 'headerLineOnly',
				table: {
					// headers are automatically repeated if the table spans over multiple pages
					// you can declare how many rows should be treated as headers
					headerRows: 1,
					widths: [ 45, 75, 35, 35, 35, 112, 22, 100, 35, 'auto', 75, 'auto' ],
					heights: 20,

					body: [
						[
							{
								text: 'Station',
								alignment: 'left',
							},
							{
								text: 'Sample\nID',
								alignment: 'left',
							},
							{
								text: 'Analyte',
								alignment: 'center',
							},
							{
								text: 'Method\nNumber',
								alignment: 'center',
							},
							{
								text: 'Sample\nType',
								alignment: 'left',
							},
							{
								text: 'Container\nType & Quantity',
								alignment: 'left',
							},
							{
								text: 'Hold\nDays',
								alignment: 'center',
							},
							{
								text: 'Preservation\nRequirements',
								alignment: 'center',
							},
							{
								text: 'Temp\n(Deg C)',
								alignment: 'center',
							},
							{
								text: 'Preserve\n(Y/N)',
								alignment: 'center',
							},
							{
								text: 'Collected\n(MMDD/HHMM)',
								alignment: 'center',
							},
							{
								text: 'Sample\nBy',
								alignment: 'left',
							},
						],
						...tableBody,
					],
				},
				style: 'mainTable',
				layout: {
					hLineWidth: (i, node) => (i === 1 ? 1 : 0),
					vLineWidth: (i, node) => 0,
					paddingTop: (i, node) => 15,
				},
			},
			{
				text: 'Comments:',
				style: 'row',
			},
			{
				columns: [
					{
						width: '*',
						columns: [
							{
								columns: [
									{
										width: 24.75,
										text: 'Rel by:'
									},
									{
										width: '*',
										table: {
											widths: ['100%'], 
											body: [
												[' '],
											],
										},
										layout: {
											hLineWidth: (i, node) => (i === 1 ? 1 : 0),
											vLineWidth: (i, node) => 0,
										},
									},
								],
								columnGap: 0,
							},
							{
								columns: [
									{
										width: 26.25,
										text: 'Rec by:',
									},
									{
										width: '*',
										table: {
											widths: ['100%'], 
											body: [
												[' '],
											],
										},
										layout: {
											hLineWidth: (i, node) => (i === 1 ? 1 : 0),
											vLineWidth: (i, node) => 0,
										},
									},
								],
								columnGap: 0,
							},
							{
								columns: [
									{
										columns: [
											{
												width: 16.5,
												text: 'Day:',
											},
											{
												width: '*',
												table: {
													widths: ['100%'], 
													body: [
														[' '],
													],
												},
												layout: {
													hLineWidth: (i, node) => (i === 1 ? 1 : 0),
													vLineWidth: (i, node) => 0,
												},
											},
										],
										columnGap: 0,
									},
									{
										columns: [
											{
												width: 20.25,
												text: 'Time:',
											},
											{
												width: '*',
												table: {
													widths: ['100%'], 
													body: [
														[' '],
													],
												},
												layout: {
													hLineWidth: (i, node) => (i === 1 ? 1 : 0),
													vLineWidth: (i, node) => 0,
												},
											},
										],
										columnGap: 0,
									},
								],
							},
						],
						columnGap: 5,
					},
					{
						width: 7.5,
						table: {
							widths: ['100%'], 
							body: [
								[' '],
							],
						},
						layout: {
							hLineWidth: (i, node) => 0,
							vLineWidth: (i, node) => 1,
						},
					},
					{
						width: '*',
						columns: [
							{
								columns: [
									{
										width: 24.75,
										text: 'Rel by:'
									},
									{
										width: '*',
										table: {
											widths: ['100%'], 
											body: [
												[' '],
											],
										},
										layout: {
											hLineWidth: (i, node) => (i === 1 ? 1 : 0),
											vLineWidth: (i, node) => 0,
										},
									},
								],
								columnGap: 0,
							},
							{
								columns: [
									{
										width: 26.25,
										text: 'Rec by:',
									},
									{
										width: '*',
										table: {
											widths: ['100%'], 
											body: [
												[' '],
											],
										},
										layout: {
											hLineWidth: (i, node) => (i === 1 ? 1 : 0),
											vLineWidth: (i, node) => 0,
										},
									},
								],
								columnGap: 0,
							},
							{
								columns: [
									{
										columns: [
											{
												width: 16.5,
												text: 'Day:',
											},
											{
												width: '*',
												table: {
													widths: ['100%'], 
													body: [
														[' '],
													],
												},
												layout: {
													hLineWidth: (i, node) => (i === 1 ? 1 : 0),
													vLineWidth: (i, node) => 0,
												},
											},
										],
										columnGap: 0,
									},
									{
										columns: [
											{
												width: 20.25,
												text: 'Time:',
											},
											{
												width: '*',
												table: {
													widths: ['100%'], 
													body: [
														[' '],
													],
												},
												layout: {
													hLineWidth: (i, node) => (i === 1 ? 1 : 0),
													vLineWidth: (i, node) => 0,
												},
											},
										],
										columnGap: 0,
									},
								],
							},
						],
						columnGap: 3.75,
					},
				],
				columnGap: 7.5,
				absolutePosition: { x: 30, y: 517.5 },
			},
			{
				columns: [
					{
						width: '*',
						columns: [
							{
								columns: [
									{
										width: 24.75,
										text: 'Rel by:'
									},
									{
										width: '*',
										table: {
											widths: ['100%'], 
											body: [
												[' '],
											],
										},
										layout: {
											hLineWidth: (i, node) => (i === 1 ? 1 : 0),
											vLineWidth: (i, node) => 0,
										},
									},
								],
								columnGap: 0,
							},
							{
								columns: [
									{
										width: 26.25,
										text: 'Rec by:',
									},
									{
										width: '*',
										table: {
											widths: ['100%'], 
											body: [
												[' '],
											],
										},
										layout: {
											hLineWidth: (i, node) => (i === 1 ? 1 : 0),
											vLineWidth: (i, node) => 0,
										},
									},
								],
								columnGap: 0,
							},
							{
								columns: [
									{
										columns: [
											{
												width: 16.5,
												text: 'Day:',
											},
											{
												width: '*',
												table: {
													widths: ['100%'], 
													body: [
														[' '],
													],
												},
												layout: {
													hLineWidth: (i, node) => (i === 1 ? 1 : 0),
													vLineWidth: (i, node) => 0,
												},
											},
										],
										columnGap: 0,
									},
									{
										columns: [
											{
												width: 20.25,
												text: 'Time:',
											},
											{
												width: '*',
												table: {
													widths: ['100%'], 
													body: [
														[' '],
													],
												},
												layout: {
													hLineWidth: (i, node) => (i === 1 ? 1 : 0),
													vLineWidth: (i, node) => 0,
												},
											},
										],
										columnGap: 0,
									},
								],
							},
						],
						columnGap: 5,
					},
					{
						width: 7.5,
						table: {
							widths: ['100%'], 
							body: [
								[' '],
							],
						},
						layout: {
							hLineWidth: (i, node) => 0,
							vLineWidth: (i, node) => 1,
						},
					},
					{
						width: '*',
						columns: [
							{
								columns: [
									{
										width: 24.75,
										text: 'Rel by:'
									},
									{
										width: '*',
										table: {
											widths: ['100%'], 
											body: [
												[' '],
											],
										},
										layout: {
											hLineWidth: (i, node) => (i === 1 ? 1 : 0),
											vLineWidth: (i, node) => 0,
										},
									},
								],
								columnGap: 0,
							},
							{
								columns: [
									{
										width: 26.25,
										text: 'Rec by:',
									},
									{
										width: '*',
										table: {
											widths: ['100%'], 
											body: [
												[' '],
											],
										},
										layout: {
											hLineWidth: (i, node) => (i === 1 ? 1 : 0),
											vLineWidth: (i, node) => 0,
										},
									},
								],
								columnGap: 0,
							},
							{
								columns: [
									{
										columns: [
											{
												width: 16.5,
												text: 'Day:',
											},
											{
												width: '*',
												table: {
													widths: ['100%'], 
													body: [
														[' '],
													],
												},
												layout: {
													hLineWidth: (i, node) => (i === 1 ? 1 : 0),
													vLineWidth: (i, node) => 0,
												},
											},
										],
										columnGap: 0,
									},
									{
										columns: [
											{
												width: 20.25,
												text: 'Time:',
											},
											{
												width: '*',
												table: {
													widths: ['100%'], 
													body: [
														[' '],
													],
												},
												layout: {
													hLineWidth: (i, node) => (i === 1 ? 1 : 0),
													vLineWidth: (i, node) => 0,
												},
											},
										],
										columnGap: 0,
									},
								],
							},
						],
						columnGap: 3.75,
					},
				],
				columnGap: 7.5,
				absolutePosition: { x: 30, y: 547.5 },
			},
		],

		styles: {
			row: {
				marginTop: 15,
			},
			mainTable: {
				marginTop: 0,
				alignment: 'left',
			},
		},

		defaultStyle: {
			fontSize: 7.5,
			bold: true,
		},
	};

	const pdfDoc = printer.createPdfKitDocument(docDefinition);
	errback(undefined, pdfDoc);
}

module.exports = router.routes();
