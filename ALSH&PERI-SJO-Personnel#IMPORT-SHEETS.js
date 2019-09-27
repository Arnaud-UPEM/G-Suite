/*	IMPORT SHEETS
	
	Import a set of sheets from a source file
	And merge them on the current file

	Entry point: main

	Source file:
		REPARTITION_PERSONNEL_STJO_SERVICE_ACM_2019-2020
		https://docs.google.com/spreadsheets/d/1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU

	Destination file:
		ALSH&PERI-SJO-Personnel
		https://docs.google.com/spreadsheets/d/17l98l7bTyjtgIBEh1vClaVDaRwcVMXYRmvoyEXcigEI
*/

function ss_create_sheet(ss, sheet_name) {
	var s = ss.insertSheet(sheet_name);
 	return s;
}


function ss_delete_sheet(ss, sheet_name) {
	// s = ss.getSheetByName(sheet_name);
	// ss.deleteSheet(s);
	ss.removeNamedRange(sheet_name);
}


function main() {
	const src_id = '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU';

	const src_sheet_names = [
		'CHAP',
		'PRES',
		'JMER',
		'EM',
		'DUR',
		'MDO',
		'HM',
		'BDP',
		'GOND',
		'MERC_P1_MOINS',
		'MERC_P1_PLUS',
		'NOEL_MOINS',
		'NOEL_PLUS',
		'CARNAVAL_MOINS',
		'CARNAVAL_PLUS',
		'PAQUES_MOINS',
		'PAQUES_PLUS',
	];

	var src_ss = SpreadsheetApp.openById(src_id);
	var dst_ss = SpreadsheetApp.getActiveSpreadsheet();

	// DEBUG
	// Logger.log('SRC File name: %s', src_ss.getName());
	// var namedRanges = src_ss.getSheets();
	// for (var i = 0; i < namedRanges.length; ++i) {
	//   Logger.log(namedRanges[i].getName());
	// }


	// Loop throught SRC sheets
	for (var i = 0; i < src_sheet_names.length; ++i) {
		current(src_ss, dst_ss, src_sheet_names[i]);
	}
}


function current(src_ss, dst_ss, src_sheet_name) {

	Logger.log('Current Sheet Name: %s', src_sheet_name);

	var src_sheet = src_ss.getSheetByName(src_sheet_name);
	var dst_sheet = null;

	// If SRC sheet doesn't exist
	if (src_sheet == null) {
		Logger.log('Failled to get src sheet.');
		Logger.log('Deleting dst sheet...');

		// Delete DST SS sheet
		ss_delete_sheet(dst_ss, src_sheet_name);
	}
	else {
		Logger.log('Successfully get src sheet');
		Logger.log('Trying to get dst sheet');

		// Check if DST SS sheet exist
		// If not create one
		dst_sheet = dst_ss.getSheetByName(src_sheet_name);

		if (dst_sheet == null) {
			Logger.log('Sheet doesn\'t exist. Creating a new one...');
			dst_sheet = ss_create_sheet(dst_ss, src_sheet_name);
		}


		// Merge data from SRC to DST
		Logger.log('Merging data...');
		Logger.log('Trying to get src and dst ranges...');
		var src_range = src_sheet.getDataRange();
		const src_range_rows = src_range.getNumRows();
		const src_range_cols = src_range.getNumColumns();

		var dst_range = dst_sheet.getRange(1, 1, src_range_rows, src_range_cols);

		Logger.log('Copying src values in dst');
		dst_range.setValues(src_range.getValues());
	}
}