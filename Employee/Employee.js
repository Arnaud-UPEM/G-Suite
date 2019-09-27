
var EMPLOYEE = {
	
	/* 
		CONSTANTES
	*/
		/*
			PERIOD
				PERI for 'Periscolaire'
				MERC_PX for Wednesdays for the X trimester
				And Holidays
		*/
		PERIOD: {
			NO_PERIOD:  0,
			PERI: 		1,
			MERC_P1: 	2,
			MERC_P2: 	3,
			MERC_P3: 	4,
			TOUS: 		5,
			NOEL: 		6,
			CARN: 		7,
			PACQ: 		8,
			JUIL: 		9,
			AOUT: 		10,
		},

		/* 
			SECTION
				MOINS for less than 6yo
				PLUS for more than 6yo
		*/
		SECTION: {
			NO_SECTION: 0,

			MOINS: 	1,
			PLUS: 	2,
		},

		/* 
			DAYS
				References for Affectation object
		*/
		DAYS: {
			MONDAY: 	1,
			TUESDAY: 	2,
			THURSDAY: 	3,
			FRIDAY: 	4,

			WEDNESDAY: 	5,
		},


	/* 
		A Set of utilitary functions
	*/
	Utils: {

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
		garderie_ou_centre: function(h1, h2, h3) {
			
			if (h1 == 2 && 
				h2 == 0 && 
				h3 == 2)
				return 1;

			if (h2 == 8)
				return 2;

			return 0;
		},

	},


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


	Affectation: function() {
		this._school = '';
		this._period = EMPLOYEE.NO_PERIOD;
		this._section = EMPLOYEE.NO_SECTION;

		this._days = [
		/* 
			[MONDAY, 	2, 0, 2],
			[TUESDAY, 	2, 2, 2],
			[THURSDAY, 	0, 2, 0],
			[FRIDAY, 	0, 0, 2],	
		*/
		];

		this.DAY 		= 0;
		this.H_MORN 	= 1;
		this.H_NOON 	= 2;
		this.H_EVEN 	= 3;

		this.addDay = function(day, h1, h2, h3) {
			this._days.push([day, h1, h2, h3]);
		};


		this.reset = function() {
			this._school = '';
			this._period = EMPLOYEE.NO_PERIOD;
			this._section = EMPLOYEE.NO_SECTION;

			while (this._days.length) {
				this._days.pop();
			}
		};


		this.deep_copy = function() {
			var a = new Affectation();
				a._school = this._school;
				a._period = this._period;
				a._section = this._section;
				a._days = this._days;
			return a;
		};


		this.to_object = function() {			
			return {
				'school': this._school,
				'period': this._period,
				'section': this._section,

				'days': this._days,
			};			
		};
	},

	
	Employee: function() {
		this._fname = '';
		this._lname = '';
		this._fullname = '';

		this._dob = '';
		this._address = '';

		this._discharded = false;		// Only for directors

		this._phone_per = '';
		this._phone_pro = '';

		this._grade = '';
		this._school = '';
		this._quality = '';

		this._obs = '';
		
		this._sum_weekly_peri = '';
		this._sum_acm_peri = '';
		
		this._affectations = []; 		// Array of Affectation

		// Outputs
		this.print = function () {
			Logger.log('');
		};


		this.to_array = function () {
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


		this.to_object = function () {
			
			return {
				'fname':			this._fname,
				'lname':			this._lname,
				'fullname':			this._fullname,

				'dob':				this._dob,
				'address':			this._address,

				'discharded':		this._discharded,

				'phone_per':		this._phone_per,
				'phone_pro':		this._phone_pro,

				'grade':			this._grade,
				'school':			this._school,
				'quality':			this._quality,

				'obs':				this._obs,

				'sum_weekly_peri':	this._sum_weekly_peri,
				'sum_acm_peri':		this._sum_acm_peri,

				'affectations':		this._affectations,
			};
		};
	},
};