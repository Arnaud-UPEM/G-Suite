/*	IMPORT DATA
	
	COLLECT data from a set of sheets from a given source
	And ORDER them in a new sheet

	/!\ Source can be
		REPARTITION_PERSONNEL_STJO_SERVICE_ACM_2019-2020
		Or current file ALSH&PERI-SJO-Personnel

	Entry points: 
		main_local
		main_extern

	Source file:
		REPARTITION_PERSONNEL_STJO_SERVICE_ACM_2019-2020
		https://docs.google.com/spreadsheets/d/1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU

	Destination file:
		ALSH&PERI-SJO-Personnel
		https://docs.google.com/spreadsheets/d/17l98l7bTyjtgIBEh1vClaVDaRwcVMXYRmvoyEXcigEI
*/

var CONST = {
	SRC_NO: 0,

	SRC_PHONE: 3,
	SRC_FULLNAME: 1,

	SRC_GRADE: 4,
	SRC_QUALITY: 5,

	SRC_OBS: 8,
	SRC_AFFECT: 9,

	SRC_SUM_WEEKLY_PERI: 6,
	SRC_SUM_ACM_PERI: 7,

	SRC_MONDAY_MORN: 10,
	SRC_MONDAY_NOON: 11,
	SRC_MONDAY_EVEN: 12,

	SRC_TUESDAY_MORN: 13,
	SRC_TUESDAY_NOON: 14,
	SRC_TUESDAY_EVEN: 15,

	SRC_THURSDAY_MORN: 16,
	SRC_THURSDAY_NOON: 17,
	SRC_THURSDAY_EVEN: 18,

	SRC_FRIDAY_MORN: 19,
	SRC_FRIDAY_NOON: 20,
	SRC_FRIDAY_EVEN: 21,
};


var SETTINGS = {
	EXTERN_SRC_ID: '',

	DST_ID: '17l98l7bTyjtgIBEh1vClaVDaRwcVMXYRmvoyEXcigEI',
	DST_NAME_RANGE: 'RECAP',
};


// Base Employee Class
var Employee = function() {
	// this.NO = 0; // Not important I guess

	this._phone 			= '';
	this._fullname 			= '';

	this._grade 			= '';
	this._school			= '';
	this._quality 			= '';

	this._obs 				= '';
	this._affect 			= '';

	this._sum_weekly_peri 	= '';
	this._sum_acm_peri 		= '';

	this._monday_morn 		= '';
	this._monday_noon 		= '';
	this._monday_even 		= '';

	this._tuesday_morn 		= '';
	this._tuesday_noon 		= '';
	this._tuesday_even 		= '';

	this._thursday_morn 	= '';
	this._thursday_noon 	= '';
	this._thursday_even 	= '';

	this._friday_morn 		= '';
	this._friday_noon 		= '';
	this._friday_even 		= '';


	// Outputs
	this.print = function() {
		Logger.log('');
	};


	this.to_array = function() {
		return [
			this._fullname,
			this._phone,

			this._grade,
			this._school,
			this._quality,

			this._obs,
			this._affect,

			this._sum_weekly_peri,
			this._sum_acm_peri,

			this._monday_morn,
			this._monday_noon,
			this._monday_even,

			this._tuesday_morn,
			this._tuesday_noon,
			this._tuesday_even,

			this._thursday_morn,
			this._thursday_noon,
			this._thursday_even,

			this._friday_morn,
			this._friday_noon,
			this._friday_even,
		];
	};


	this.to_object = function() {
		return {
			'fullname': 		this._fullname,
			'phone': 			this._phone,

			'grade': 			this._grade,
			'school': 			this._school,
			'quality': 			this._quality,

			'obs': 				this._obs,
			'affect': 			this._affect,

			'sum_weekly_peri': 	this._sum_weekly_peri,
			'sum_acm_peri': 	this._sum_acm_peri,

			'monday_morn': 		this._monday_morn,
			'monday_noon': 		this._monday_noon,
			'monday_even': 		this._monday_even,

			'tuesday_morn': 	this._tuesday_morn,
			'tuesday_noon': 	this._tuesday_noon,
			'tuesday_even': 	this._tuesday_even,

			'thursday_morn': 	this._thursday_morn,
			'thursday_noon': 	this._thursday_noon,
			'thursday_even': 	this._thursday_even,

			'friday_morn': 		this._friday_morn,
			'friday_noon': 		this._friday_noon,
			'friday_even': 		this._friday_even,
		};
	};


	// INPUTS

	// Input from file
	// REPARTITION_PERSONNEL_STJO_SERVICE_ACM_2019-2020
	// https://docs.google.com/spreadsheets/d/1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU
	this.from_REPARTITION_PERSONNEL_STJO = function(row, name) {
		this._phone 				= row[ CONST.SRC_PHONE ];
		this._fullname 				= row[ CONST.SRC_FULLNAME ];

		this._grade 				= row[ CONST.SRC_GRADE ];
		this._school 				= name;
		this._quality 				= row[ CONST.SRC_QUALITY ];

		this._obs 					= row[ CONST.SRC_OBS ];
		this._affect 				= row[ CONST.SRC_AFFECT ];

		this._sum_weekly_peri 		= this.from_REPARTITION_PERSONNEL_STJO__sum( row[ CONST.SRC_SUM_WEEKLY_PERI ] );
		this._sum_acm_peri 			= this.from_REPARTITION_PERSONNEL_STJO__sum( row[ CONST.SRC_SUM_ACM_PERI ] );

		this._monday_morn 			= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_MONDAY_MORN ] );
		this._monday_noon 			= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_MONDAY_NOON ] );
		this._monday_even 			= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_MONDAY_EVEN ] );

		this._tuesday_morn 			= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_TUESDAY_MORN ] );
		this._tuesday_noon 			= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_TUESDAY_NOON ] );
		this._tuesday_even 			= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_TUESDAY_EVEN ] );

		this._thursday_morn 		= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_THURSDAY_MORN ] );
		this._thursday_noon 		= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_THURSDAY_NOON ] );
		this._thursday_even 		= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_THURSDAY_EVEN ] );

		this._friday_morn 			= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_FRIDAY_MORN ] );
		this._friday_noon 			= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_FRIDAY_NOON ] );
		this._friday_even 			= this.from_REPARTITION_PERSONNEL_STJO__hour( row[ CONST.SRC_FRIDAY_EVEN ] );
	};

		this.from_REPARTITION_PERSONNEL_STJO__hour = function(hour_raw) {
			if (hour_raw == undefined)
				return '';
			return hour_raw;
		}

		this.from_REPARTITION_PERSONNEL_STJO__sum = function(sum_raw) {
			return extract_numbers_from_string(sum_raw)
		}
};


function ss_create_sheet(ss, sheet_name) {
	var s = ss.insertSheet(sheet_name);
 	return s;
}


function ss_delete_sheet(ss, sheet_name) {
	// s = ss.getSheetByName(sheet_name);
	// ss.deleteSheet(s);
	ss.removeNamedRange(sheet_name);
}


function extract_numbers_from_string(s) {
	var r = '';
	for (var i = 0; i < s.length; ++i) {
		const c = s.charCodeAt(i);
		if (c >= 49 && c <= 57)
			r += s[i];
	}
	return r;
}


function main_local() {
	var src_ss = SpreadsheetApp.getActiveSpreadsheet();

	const src_sheets_raw = [
		// SHEET NAME 			SHEET_RANGE
		[ 'CHAP', 				'A15:V40' ],
		[ 'PRES', 				'A15:V40' ],
		[ 'JMER', 				'A15:V40' ],
		[ 'EM', 				'A15:V40' ],
		[ 'DUR', 				'A15:V40' ],
		[ 'MDO', 				'A15:V40' ],
		[ 'HM', 				'A15:V40' ],
		[ 'BDP', 				'A15:V40' ],
		[ 'GOND', 				'A15:V40' ],
		[ 'MERC_P1_MOINS', 		'A16:M55' ],
		[ 'MERC_P1_PLUS', 		'A16:M55' ],
		[ 'NOEL_MOINS', 		'A16:M55' ],
		[ 'NOEL_PLUS', 			'A16:M55' ],
		[ 'CARNAVAL_MOINS', 	'A16:M55' ],
		[ 'CARNAVAL_PLUS', 		'A16:M55' ],
		[ 'PAQUES_MOINS', 		'A16:M55' ],
		[ 'PAQUES_PLUS', 		'A16:M55' ],
	];

	main(src_ss, src_sheets_raw);
}


function main(src_ss, src_sheets_raw) {

	// Loop throught SRC sheets
	var employee = new Employee().to_array();
	var employees = [];

	for (var i = 0; i < src_sheets_raw.length; ++i) {
		employees = employees.concat( 
			parse_sheet(src_ss, src_sheets_raw[i][0], src_sheets_raw[i][1])
		);
	}


	// for (var i = 0 ; i < employees.length; ++i) {
		// Logger.log(employees[i]);
	// }


	var dst_sheet = SpreadsheetApp
					.getActiveSpreadsheet()
					.getSheetByName('RECAP');


	var dst_range = dst_sheet.getRange(1, 1, 1, employee.length);

	var headers =  [[
		'fullname',
		'phone',

		'grade',
		'school',
		'quality',

		'obs',
		'affect',

		'sum_weekly_peri',
		'sum_acm_peri',

		'monday_morn',
		'monday_noon',
		'monday_even',

		'tuesday_morn',
		'tuesday_noon',
		'tuesday_even',

		'thursday_morn',
		'thursday_noon',
		'thursday_even',

		'friday_morn',
		'friday_noon',
		'friday_even',
	]];
	dst_range.setValues(headers);


	dst_range = dst_sheet.getRange(2, 1, employees.length, employee.length);
	dst_range.setValues(employees);
}


function parse_sheet(src_ss, src_sheet_name, src_sheet_range) {

	Logger.log('Current Sheet Name: %s', src_sheet_name);

	// Get Sheet by name
	var src_sheet = src_ss.getSheetByName(src_sheet_name);

	if (src_sheet == null) {
		Logger.log('%s - Failled to get src sheet. Abort', src_sheet_name);
		
		return [];
	}


	// Collect its data
	Logger.log('%s - Collecting data...', src_sheet_name);

	var src_range = src_sheet.getRange(src_sheet_range);
	var src_values = src_range.getValues();



	// Parse them
	// Store them
	Logger.log('%s - Parsing data...', src_sheet_name);

	var employees = [];

	for (var i = 0; i < src_values.length; ++i) {
		var value = src_values[i];

		if (value[ CONST.SRC_FULLNAME ] == '')
			continue;

		var employee = new Employee();
			employee.from_REPARTITION_PERSONNEL_STJO(value, src_sheet_name);

		employees.push(employee.to_array());

		Logger.log(value);
		Logger.log(employee.to_array());
		// Logger.log('value: %s', src_values[i]);
	}


	// Return them
	return employees;
}