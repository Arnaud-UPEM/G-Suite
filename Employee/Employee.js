/*
	PERIOD

*/
var PERIOD = {
	PERI: 		0,
	MERC_P1: 	1,
	MERC_P2: 	2,
	MERC_P3: 	3,
	TOUS: 		4,
	NOEL: 		5,
	CARN: 		6,
	PACQ: 		7,
	JUIL: 		8,
	AOUT: 		9,
};


var SECTION = {
	MOINS: 	0,
	PLUS: 	1,
};


/*
	garderie_ou_centre
		Give the right choice for given hours
	@params
		hours for morning, noon and evening
	@return
		0 for none
		1 for garderie
		2 for centre
*/
var garderie_ou_centre = function(h1, h2, h3) {
	
	if (h1 == 2 && 
		h2 == 0 && 
		h3 == 2)
		return 1;

	if (h2 == 8)
		return 2;

	return 0;
};


var Employee = {

	employee_raw: [
		'',			// fname: 
		'',			// lname: 

		'',			// dob: 
		'',			// address: 

		'',			// phone_per: 
		'',			// phone_pro: 

		'',			// grades: 
		'',			// quality: 

		'',			// obs: 
		
		// affectations
		[
		/*
			[
				'',			school 

				0,			h_morn
				0,			h_noon
				0,			h_even

				[], 		period 
			],
		*/
		],

	],
	
	Data: {

	},
};