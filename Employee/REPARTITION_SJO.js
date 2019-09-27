var GAPI = {

	getValues: function (id, rangeName) {
		var values = Sheets.Spreadsheets.Values.get(id, rangeName).values;
		if (!values) {
			return false;
		}
		return values;
	},



};


var REPARTITION_SJO = {

	CONFIG: {
		ID: '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU',

		DIR_NAME_RANGE: 'D10:M',
		EMP_NAME_RANGE: ['B15:M', 'B16:M'],

		TABS: [
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
	        'TOUSSAINT_MOINS',
	        'TOUSSAINT_PLUS',
	        'NOEL_MOINS',
	        'NOEL_PLUS',
	        'CARNAVAL_MOINS',
	        'CARNAVAL_PLUS',
	        'PAQUES_MOINS',
	        'PAQUES_PLUS',
	    ],
	},


	from_repartition: function() {
		
		for (var i = 0; i < this.CONFIG.TABS.length; ++i) {
			const tab = this.CONFIG.TABS[i];

			// Change Employee Name Range when tabs > 8
			const emp_name_range = (i < 9) ? 
				this.CONFIG.EMP_NAME_RANGE[0] :
				this.CONFIG.EMP_NAME_RANGE[1];

			var empValues = GAPI.getValues(this.CONFIG.ID, tab + '!' + emp_name_range);
			var dirValues = GAPI.getValues(this.CONFIG.ID, tab + '!' + this.CONFIG.DIR_NAME_RANGE);
			
			if (!dirValues) {
				Logger.log('Failed to get dir values for tab: ', tab);
			}
			else {
				Logger.log(dirValues);
			}

			if (!empValues) {
				Logger.log('Failed to get employees values for tab: ', tab);
			}
			else {
				Logger.log(empValues);
			}
		}
	},


	to_repartition: function() {},
};


function Test_REPARTITION_SJO() {
	REPARTITION_SJO.from_repartition();
}