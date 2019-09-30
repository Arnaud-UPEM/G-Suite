
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
        NO_PERIOD: 0,
        PERI: 1,
        MERC_P1: 2,
        MERC_P2: 3,
        MERC_P3: 4,
        TOUS: 5,
        NOEL: 6,
        CARN: 7,
        PACQ: 8,
        JUIL: 9,
        AOUT: 10,
    },

    /* 
        SECTION
            MOINS for less than 6yo
            PLUS for more than 6yo
    */
    SECTION: {
        NO_SECTION: 0,

        MOINS: 1,
        PLUS: 2,
    },

    /* 
        DAYS
            References for Affectation object
    */
    DAYS: {
    },
    MONDAY: 1,
    TUESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,

    WEDNESDAY: 5,
    

    /* 
        AFFECTATION - DAYS References
    */
    DAY:        0,
    H_MORN:     1,
    H_NOON:     2,
    H_EVEN:     3,


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
        garderie_ou_centre: function (h1, h2, h3) {

            if (h1 == 2 &&
                h2 == 0 &&
                h3 == 2)
                return 1;

            if (h2 == 8)
                return 2;

            return 0;
        },

    },


    Affectation: function () {
        this._school = '';
        this._period = '';
        this._section = '';

        this._days = [
        /* 
            [MONDAY, 	2, 0, 2],
            [TUESDAY, 	2, 2, 2],
            [THURSDAY, 	0, 2, 0],
            [FRIDAY, 	0, 0, 2],	
        */
        ];

        this.addDay = function (day, h1, h2, h3) {
            this._days.push([day, h1, h2, h3]);
        };


        this.reset = function () {
            this._school = '';
            this._period = '';
            this._section = '';

            while (this._days.length) {
                this._days.pop();
            }
        };


        this.deep_copy = function () {
            var days = [];
            for (var i = 0; i < this._days.length; ++i)
                days.push(this._days[i]);

            var a = new EMPLOYEE.Affectation();
                a._school   = this._school;
                a._period   = this._period;
                a._section  = this._section;
                a._days     = days;
            return a;
        };


        this.to_object = function () {
            var ds = [];
            for (var i = 0; i < this._days.length; ++i)
                ds.push(this._days[i]);

            return {
                'school': this._school,
                'period': this._period,
                'section': this._section,

                'days': ds,
            };
        };
    },


    Employee: function () {
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

        this._contract_start = '';
        this._contract_end = '';

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
            var affs = [];
            for (var i = 0; i < this._affectations.length; ++i)
                affs.push(this._affectations[i].to_object());

            return {
                'fname':        this._fname,
                'lname':        this._lname,
                'fullname':     this._fullname,

                'dob':          this._dob,
                'address':      this._address,

                'discharded':   this._discharded,

                'phone_per':    this._phone_per,
                'phone_pro':    this._phone_pro,

                'grade':        this._grade,
                'school':       this._school,
                'quality':      this._quality,

                'obs':          this._obs,

                'sum_weekly_peri':  this._sum_weekly_peri,
                'sum_acm_peri':     this._sum_acm_peri,

                'affectations':     affs,

                'contract_start':       this._contract_start,
                'contract_end':         this._contract_end,
            };
        };
    },
};


var GAPI = {

    getValues: function (id, rangeName) {
        var values = Sheets.Spreadsheets.Values.get(id, rangeName).values;
        if (!values) {
            return false;
        }
        return values;
    },


    updateValues: function (data, id, rangeName, valueInputOption) { // = 'USER_ENTERED') {
        var v = Sheets.newValueRange();
        v.values = data;

        var result = Sheets.Spreadsheets.Values.update(v, id, rangeName, {
            valueInputOption: valueInputOption
        });
    },

};


var REPARTITION_SJO = {

    CONFIG: {
        ID: '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU',

        DIR_NAME_RANGE: ['D10:M10', 'D10:M11'],
        EMP_NAME_RANGE: ['B15:V', 'B16:V'],
    },


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


    DETAILS: [
        // TAB          SCHOOL      PERIOD      SECTION
        ['CHAP',        'CHAP',     'PERI',     ''],
        ['PRES',        'PRES',     'PERI',     ''],
        ['JMER',        'JMER',     'PERI',     ''],
        ['EM',          'EM',       'PERI',     ''],
        ['DUR',         'DUR',      'PERI',     ''],
        ['MDO',         'MDO',      'PERI',     ''],
        ['HM',          'HM',       'PERI',     ''],
        ['BDP',         'BDP',      'PERI',     ''],
        ['GOND',        'GOND',     'PERI',     ''],

        // TAB                      SCHOOL                  PERIOD      SECTION
        ['MERC_P1_MOINS',           'Jeanne MERTON',       'MERC_P1',   'MOINS'],
        ['TOUSSAINT_MOINS',         'Jeanne MERTON',       'TOUS',      'MOINS'],
        ['NOEL_MOINS',              'Jeanne MERTON',       'NOEL',      'MOINS'],
        ['CARNAVAL_MOINS',          'Jeanne MERTON',       'CARN',      'MOINS'],
        ['PAQUES_MOINS',            'Jeanne MERTON',       'PACQ',      'MOINS'],
        ['MERC_P1_PLUS',            'Edouard MARCEAU',     'MERC_P1',   'PLUS'],
        ['NOEL_PLUS',               'Edouard MARCEAU',     'TOUS',      'PLUS'],
        ['CARNAVAL_PLUS',           'Edouard MARCEAU',     'NOEL',      'PLUS'],
        ['CARNAVAL_PLUS',           'Edouard MARCEAU',     'CARN',      'PLUS'],
        ['PAQUES_PLUS',             'Edouard MARCEAU',     'PACQ',      'PLUS'],
    ],


    COLS: {
        DIR_FULLNAME: 0,
        DIR_GRADE: 2,
        DIR_PHONE_PER: 3,
        DIR_PHONE_PRO: 4,
        DIR_DISCHARCHED: 5,
        DIR_AFFECT: 6,
        DIR_H_MORN: 7,
        DIR_H_NOON: 8,
        DIR_H_EVEN: 9,


        EMP_FULLNAME: 0,
        EMP_PHONE: 2,
        EMP_GRADE: 3,
        EMP_QUALITY: 4,
        EMP_OBS: 7,
        EMP_AFFECT: 8,

        EMP_H_START: 9,
    },
        

    from_repartition: function () {

        var employees = [];

        for (var i = 9; i < 9 + 1; ++i) {
            const tab = this.DETAILS[i][0];

            // Change Director Name Range when tabs > 8
            const dir_name_range = (i < 9) ?
                this.CONFIG.DIR_NAME_RANGE[0] :
                this.CONFIG.DIR_NAME_RANGE[1];

            // Change Employee Name Range when tabs > 8
            const emp_name_range = (i < 9) ?
                this.CONFIG.EMP_NAME_RANGE[0] :
                this.CONFIG.EMP_NAME_RANGE[1];

            var empValues = GAPI.getValues(this.CONFIG.ID, tab + '!' + emp_name_range);
            var dirValues = GAPI.getValues(this.CONFIG.ID, tab + '!' + dir_name_range);

            if (!dirValues) {
                Logger.log('Failed to get dir values for tab: ', tab);
            }
            else {
                // Logger.log(dirValues);
            }

            if (!empValues) {
                Logger.log('Failed to get employees values for tab: ', tab);
            }
            else {
                // Logger.log(empValues);
            }

            employees = employees.concat(this.from_repartition_filter(i, dirValues, empValues));
        }

        return employees;
    },

        // Macro to filter rcvd values
        // 
        from_repartition_filter: function (index, dirValues, empValues) {

            var es = [];

            for (var i = 0; i < dirValues.length; ++i) {

                // If value is not empty
                if (dirValues[i][this.COLS.DIR_FULLNAME]) {

                    var v = dirValues[i];
                    var a = new EMPLOYEE.Affectation();
                    var e = new EMPLOYEE.Employee();

                    e._fullname     = v[this.COLS.DIR_FULLNAME];
                    e._grade        = v[this.COLS.DIR_GRADE];
                    e._quality      = 'DAP';
                    e._phone_per    = v[this.COLS.DIR_PHONE_PER];
                    e._phone_pro    = v[this.COLS.DIR_PHONE_PRO];

                    e._discharded   = (v[this.COLS.DIR_DISCHARCHED] == 'OUI') ? true : false;

                    a._school       = this.DETAILS[index][1];
                    a._period       = this.DETAILS[index][2];
                    a._section      = this.DETAILS[index][3];

                    a.addDay(
                        EMPLOYEE.DAYS.MONDAY,
                        v[this.COLS.DIR_H_MORN],
                        v[this.COLS.DIR_H_MORN],
                        v[this.COLS.DIR_H_EVEN]);

                    // Add Affectation to employee
                    e._affectations.push(a);

                    // Add current employee to employees table
                    es.push(e);
                }
            }

            for (var i = 0; i < empValues.length; ++i) {

                // Logger.log('empValues length: %s', empValues.length);

                // If value is not empty
                if (empValues[i][this.COLS.EMP_FULLNAME]) {

                    var v = empValues[i];
                    var a = new EMPLOYEE.Affectation();
                    var e = new EMPLOYEE.Employee();

                    e._obs          = v[this.COLS.EMP_OBS];
                    e._grade        = v[this.COLS.EMP_GRADE];
                    e._quality      = v[this.COLS.EMP_QUALITY];
                    e._fullname     = v[this.COLS.EMP_FULLNAME];
                    e._phone_per    = v[this.COLS.EMP_PHONE];

                    if (v.length < 13) {
                        a._school   = this.DETAILS[index][1];
                        a._period   = this.DETAILS[index][2];
                        a._section  = this.DETAILS[index][3];

                        a.addDay(
                            EMPLOYEE.DAYS.MONDAY,
                            v[this.COLS.EMP_H_START],
                            v[this.COLS.EMP_H_START + 1],
                            v[this.COLS.EMP_H_START + 2]);

                        // Add Affectation to employee
                        e._affectations.push(a);
                    }
                    else {

                        var h_start = this.COLS.EMP_H_START;

                        for (var j = EMPLOYEE.DAYS.MONDAY; j < EMPLOYEE.DAYS.FRIDAY + 1; ++j) {
                            a._school   = this.DETAILS[index][1];
                            a._period   = this.DETAILS[index][2];
                            a._section  = this.DETAILS[index][3];

                            a.addDay(
                                j,
                                v[h_start],
                                v[h_start + 1],
                                v[h_start + 2]
                            );

                            // Logger.log('day: %s', a._days[a._days.length - 1]);

                            h_start += 3;

                            // Add Affectation to employee
                            e._affectations.push(a.deep_copy());

                            // And reset it
                            a.reset();
                        }
                    }

                    // Add current employee to employees table
                    es.push(e);
                }
            }

            return es;
        },


    to_repartition: function(employees) {

        var dirGroups = [];
        var empGroups = [];

        // Initialize our groups
        for (var i = 0; i < this.TABS.length; ++i) {
            dirGroups.push([]);
            empGroups.push([]);
        }

        var ref = {
            'CHAP':                 0,
            'PRES':                 1,
            'JMER':                 2,
            'EM':                   3,
            'DUR':                  4,
            'MDO':                  5,
            'HM':                   6,
            'BDP':                  7,
            'GOND':                 8,

            'MERC_P1_MOINS':        9,
            'MERC_P1_PLUS':         10,
            'TOUSSAINT_MOINS':      11,
            'TOUSSAINT_PLUS':       12,
            'NOEL_MOINS':           13,
            'NOEL_PLUS':            14,
            'CARNAVAL_MOINS':       15,
            'CARNAVAL_PLUS':        16,
            'PAQUES_MOINS':         17,
            'PAQUES_PLUS':          18,
        };
        
        
        // Convert Affectation to the right index
        var affectationToGroup = function(affectation) {
            if (affectation._school in ref)
                return ref[affectation._school];
            else 
                return ref[ affectation._period + '_' + affectation._section ];
        };

        for (var i = 0; i < employees.length; ++i) {

            var e = employees[i];

            for (var j = 0; j < e._affectations.length; ++j) {

                /* 
                    Affectation
                        school
                        period
                        section        
                        days
                            [MONDAY, 	2, 0, 2],
                            [TUESDAY, 	2, 2, 2],
                            [THURSDAY, 	0, 2, 0],
                            [FRIDAY, 	0, 0, 2],
                */
                var a = e._affectations[j];

                var index = affectationToGroup(a);

                if (e._quality == 'DAP') {

                    var row = [];
                        row.push(e._fullname);
                        row.push('');                 // Double column glitch
                        row.push(e._grade);
                        row.push(e._phone_per);
                        row.push(e._phone_pro);
                        row.push(e._discharded);
                        row.push(a._period);

                        // Error check
                        if (a._days) {
                            row.push( a._days[0][EMPLOYEE.H_MORN] );
                            row.push( a._days[0][EMPLOYEE.H_NOON] );
                            row.push( a._days[0][EMPLOYEE.H_EVEN] );
                        }
                    
                    // Logger.log('index: %s', index);
                    // Logger.log('affectation: %s %s %s', a._school, );
                    dirGroups[index].push(
                        row
                    );
                }
                else {

                    var row = [];
                        row.push(e._fullname);
                        row.push('');                 // Double column glitch
                        row.push(e._phone_per);
                        row.push(e._grade);
                        row.push(e._quality);
                        row.push('');
                        row.push('');
                        row.push(e._obs);
                        row.push(a._period);

                    // Error check
                    for (var k = 0; k < a._days.length; ++k) {

                        row.push( a._days[k][ EMPLOYEE.H_MORN ] );
                        row.push( a._days[k][ EMPLOYEE.H_NOON ] );
                        row.push( a._days[k][ EMPLOYEE.H_EVEN ] );
                    }

                    empGroups[index].push(
                        row
                    );
                }
            }
        }

        for (var i = 0; i < dirGroups.length; ++i) {
            for (var j = 0; j < dirGroups[i].length; ++j)
                Logger.log('%s', dirGroups[i][j]);
        }
        for (var i = 0; i < empGroups.length; ++i) {
            for (var j = 0; j < empGroups[i].length; ++j)
                Logger.log('%s', empGroups[i][j]);
        }
    },
};


var SUIVICOMPTEHEURES_SJO = {

    CONFIG: {
        ID: '1zXL8jlLx7Bc18ypHG9J1xEhzOwGlAALeJorhrDNhhZ0',

        NAME_RANGE: 'AFFECTION_SJO!A18:S',
    },

    COLS: {
        FULLNAME: 0,
        IS_DIR: 5,      // TRUE/FALSE
        SCHOOL: 6,

        VOID_1: 1,      // "Heures Travailles lissées"
        VOID_2: 2,      // "Heures lissées Avec Congés"

        M_START: 3,
        M_END: 4,

        H_MORN: 7,
        H_NOON: 8,
        H_EVEN: 9,

        // G_MAT/C_MAT  G_ELE/C_ELE
        // G => 2, 0, 2
        // C => 0, 8, 0
        ALSH_P1: 10,
        ALSH_P2: 11,
        ALSH_P3: 12,

        ALSH_TOUS: 13,
        ALSH_NOEL: 14,
        ALSH_CARN: 15,
        ALSH_PAQU: 16,
        ALSH_JUIL: 17,
        ALSH_AOUT: 18,
    },


    INDEX_TO_PERIOD: [
        'MERC_P1',
        'MERC_P2',
        'MERC_P3',

        'TOUS',
        'NOEL',
        'CARN',
        'PAQU',
        'JUIL',
        'AOUT',
    ],


    from_suivi: function() {

        var values = GAPI.getValues(this.CONFIG.ID, this.CONFIG.NAME_RANGE);
        var employees = [];

        for (var i = 0; i < 10; ++i) { // values.length; ++i) {

            var v = values[i];
            var e = new EMPLOYEE.Employee();

            e._fullname         = v[this.COLS.FULLNAME];
            e._quality          = (v[this.COLS.IS_DIR] == 'TRUE') ? 'DAP' : '';

            e._contract_start   = v[this.COLS.M_START];
            e._contract_end     = v[this.COLS.M_END];

            e._sum_acm_peri     = v[this.COLS.VOID_1];
            e._sum_weekly_peri  = v[this.COLS.VOID_1];


            var affectation = new EMPLOYEE.Affectation();

            affectation._school     = v[this.COLS.SCHOOL];
            affectation._period     = 'PERI';
            affectation._section    = ''

            affectation._days.push([
                EMPLOYEE.MONDAY,
                v[this.COLS.H_MORN], 
                v[this.COLS.H_NOON], 
                v[this.COLS.H_EVEN], 
            ]);

            e._affectations.push(affectation.deep_copy());
            affectation.reset();

            // Logger.log('%s', e._fullname);

            for (var j = this.COLS.ALSH_P1; j < this.COLS.ALSH_AOUT + 1; ++j) {

                // Logger.log('%s', this.INDEX_TO_PERIOD[j - 10]);
                // Logger.log('%s', v[j]);

                if (v[j] == '' ||
                    v[j] == undefined)
                    continue;  

                affectation._school = '';
                affectation._period = this.INDEX_TO_PERIOD[j - 10];

                affectation._section = (v[j].indexOf('MAT') != -1) ? 'MOINS' : 'PLUS';

                if (v[j].indexOf('G_') != -1) {

                    affectation._days.push([
                        EMPLOYEE.MONDAY,
                        2,
                        0,
                        2
                    ]);
                }
                else {
                    
                    affectation._days.push([
                        EMPLOYEE.MONDAY,
                        0,
                        8,
                        0
                    ]);
                }

                e._affectations.push(affectation.deep_copy());
                affectation.reset();
            }

            employees.push(e);
        }

        return employees;
    },
};


function Test_REPARTITION_SJO() {
    // Logger.log('%s', REPARTITION_SJO.CONFIG.DETAILS[0][0]);
    
    var es = REPARTITION_SJO.from_repartition();

    for (var i = 0; i < es.length; ++i) {
        Logger.log('%s', es[i].to_object());
    }

    Logger.log('\n\n');

    REPARTITION_SJO.to_repartition(es);
}


function Test_SUIVICOMPTEHEURE_from() {
    var es = SUIVICOMPTEHEURES_SJO.from_suivi();

    for (var i = 0; i < es.length; ++i) {
        Logger.log('%s', es[i].to_object());
    }

    Logger.log('\n\n');
}