/* 
    TODO
        - Handle #N/A values
*/


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
            [MONDAY,    2, 0, 2],
            [TUESDAY,   2, 2, 2],
            [THURSDAY,  0, 2, 0],
            [FRIDAY,    0, 0, 2],
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

        this._discharded = false;       // Only for directors

        this._phone_per = '';
        this._phone_pro = '';

        this._grade = '';
        this._school = '';
        this._quality = '';

        this._obs = '';

        this._sum_weekly_peri = '';
        this._sum_acm_peri = '';

        this._affectations = [];        // Array of Affectation

        this._contract_start = '';
        this._contract_end = '';

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


var Affectation = function () {
    this._school = '';
    this._period = '';
    this._section = '';
    
    this._days = [
        /* 
            [MONDAY,    2, 0, 2],
            [TUESDAY,   2, 2, 2],
            [THURSDAY,  0, 2, 0],
            [FRIDAY,    0, 0, 2],
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
        a._school = this._school;
        a._period = this._period;
        a._section = this._section;
        a._days = days;
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
};


var Employee = function () {
    this._fname = '';
    this._lname = '';
    this._fullname = '';

    this._dob = '';
    this._address = '';

    this._discharded = false;       // Only for directors

    this._phone_per = '';
    this._phone_pro = '';

    this._grade = '';
    this._school = '';
    this._quality = '';

    this._obs = '';

    this._sum_weekly_peri = '';
    this._sum_acm_peri = '';

    this._affectations = [];        // Array of Affectation

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
            'fname': this._fname,
            'lname': this._lname,
            'fullname': this._fullname,

            'dob': this._dob,
            'address': this._address,

            'discharded': this._discharded,

            'phone_per': this._phone_per,
            'phone_pro': this._phone_pro,

            'grade': this._grade,
            'school': this._school,
            'quality': this._quality,

            'obs': this._obs,

            'sum_weekly_peri': this._sum_weekly_peri,
            'sum_acm_peri': this._sum_acm_peri,

            'affectations': affs,

            'contract_start': this._contract_start,
            'contract_end': this._contract_end,
        };
    };
};


var EMPLOYEES = {

    employees: [],   // List of Employee


    add: function(employee) {

        var e = this.get(employee._fullname);

        if (e) {
            // Logger.log('Found employee with name: %s', employee._fullname);
            this.single_update(e, employee);
        }
        else {
            // Logger.log('Cannot found employee with name: %s. Adding %s', employee._fullname, e);
            this.employees.push(employee);
        }
    },


    get: function(fullname) {
        for (var i = 0; i < this.employees.length; ++i) {
            if (this.employees[i]._fullname == fullname)
                return this.employees[i];
        }
        return false;
    },


    getAll: function() { return this.employees; },


    // Update a collection of Employee
    update: function(employees) {

        for (var i = 0; i < employees.length; ++i) {
            this.add(employees[i]);
        }
    },


    // Update a single Employee
    // We assume that dst intels are newer
    single_update: function(srcEmployee, dstEmployee) {

        // Date of birth - String
        srcEmployee._dob = (dstEmployee._dob != '') ? 
                            dstEmployee._dob : 
                            srcEmployee._dob;


        // Address - String
        srcEmployee._address = (dstEmployee._address != '') ? 
                                dstEmployee._address : 
                                srcEmployee._address;


        // Discharged - Boolean
        // Only for directors
        srcEmployee._discharded     = (dstEmployee._discharded) ? dstEmployee._discharded : srcEmployee._discharded;


        // Phones - Stringing
        if (dstEmployee._fullname.indexOf('ABLANA') != -1) {
            Logger.log('%s %s', dstEmployee._phone_per, dstEmployee._phone_pro);
        }
        srcEmployee._phone_per      = (dstEmployee._phone_per != '') ? dstEmployee._phone_per : srcEmployee._phone_per;
        srcEmployee._phone_pro      = (dstEmployee._phone_pro != '') ? dstEmployee._phone_pro : srcEmployee._phone_pro;


        // Grade - School - Quality
        srcEmployee._grade      = (dstEmployee._grade != '')    ? dstEmployee._grade    : srcEmployee._grade;
        srcEmployee._school     = (dstEmployee._school != '')   ? dstEmployee._school   : srcEmployee._school;
        srcEmployee._quality    = (dstEmployee._quality != '')  ? dstEmployee._quality  : srcEmployee._quality;


        // Observation - String
        srcEmployee._obs = (dstEmployee._obs != '') ? dstEmployee._obs : srcEmployee._obs;


        // ... - String - Technically Int
        srcEmployee._sum_acm_peri       = (dstEmployee._sum_acm_peri != '')     ? dstEmployee._sum_acm_peri     : srcEmployee._sum_acm_peri;
        srcEmployee._sum_weekly_peri    = (dstEmployee._sum_weekly_peri != '')  ? dstEmployee._sum_weekly_peri  : srcEmployee._sum_weekly_peri;
        

        // Contract Start/End - String
        srcEmployee._contract_end       = (dstEmployee._contract_end != '')     ? dstEmployee._contract_end     : srcEmployee._contract_end;
        srcEmployee._contract_start     = (dstEmployee._contract_start != '')   ? dstEmployee._contract_start   : srcEmployee._contract_start;
        
        srcEmployee._contract_start     = (dstEmployee._contract_start != '') ? dstEmployee._contract_start : srcEmployee._contract_start;
        srcEmployee._contract_end       = (dstEmployee._contract_end != '') ? dstEmployee._contract_end : srcEmployee._contract_end;
        
        
        for (var i = 0; i < dstEmployee._affectations.length; ++i) {

            var dstAffect = dstEmployee._affectations[i];

            // Loop through src affectations
            // If we match compare values
            // If not, add the entry
            var matched = false;
            for (var j = 0; j < srcEmployee._affectations.length; ++j) {

                var srcAffect = srcEmployee._affectations[j];

                if (dstAffect._period == srcAffect._period) {

                    srcAffect._days     = (dstAffect._days != '')       ? dstAffect._days           : srcAffect._days;
                    srcAffect._school   = (dstAffect._school != '')     ? dstAffect._school     : srcAffect._school;
                    srcAffect._section  = (dstAffect._section != '')    ? dstAffect._section    : srcAffect._section;

                    matched = true;
                }
            }

            if (!matched) {
                srcEmployee._affectations.push(dstAffect.deep_copy());
            }
        }
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
        ['TOUSSAINT_PLUS',          'Edouard MARCEAU',     'TOUS',      'PLUS'],
        ['NOEL_PLUS',               'Edouard MARCEAU',     'NOEL',      'PLUS'],
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
        

    from: function () {

        var employees = [];

        for (var i = 0; i < this.DETAILS.length; ++i) {
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
                    var a = new Affectation();
                    var e = new Employee();

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
                        EMPLOYEE.MONDAY,
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
                            EMPLOYEE.MONDAY,
                            v[this.COLS.EMP_H_START],
                            v[this.COLS.EMP_H_START + 1],
                            v[this.COLS.EMP_H_START + 2]);

                        // Add Affectation to employee
                        e._affectations.push(a);
                    }
                    else {

                        var h_start = this.COLS.EMP_H_START;

                        for (var j = EMPLOYEE.MONDAY; j < EMPLOYEE.FRIDAY + 1; ++j) {
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


    to: function(employees) {

        var dirGroups = [];
        var empGroups = [];

        // Initialize our groups
        for (var i = 0; i < this.DETAILS.length; ++i) {
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
                            [MONDAY,    2, 0, 2],
                            [TUESDAY,   2, 2, 2],
                            [THURSDAY,  0, 2, 0],
                            [FRIDAY,    0, 0, 2],
                */
                var a = e._affectations[j];

                var index = affectationToGroup(a);
                // Logger.log('affectation: %s %s %s %s', a._school, a._period, a._section, e._fullname);

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

                    if (index != undefined) {

                        dirGroups[index].push(
                            row
                        );
                    }
                    else {
                        Logger.log('Error: index undefined for employee %s with data: %s', e._fullname, a._school, a._period, a._section);
                    }
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

                    if (index != undefined) {

                        empGroups[index].push(
                            row
                        );
                    }
                    else {
                        Logger.log('Error: index undefined for employee %s with data: %s', e._fullname, a._school, a._period, a._section);
                    }
                }
            }
        }

        var data = [];

        for (var i = 0; i < dirGroups.length; ++i) {
            // for (var j = 0; j < dirGroups[i].length; ++j)
            //     Logger.log('%s', dirGroups[i][j]);

            data = data.concat(dirGroups[i]);
        }
        for (var i = 0; i < empGroups.length; ++i) {
            // for (var j = 0; j < empGroups[i].length; ++j)
            //     Logger.log('%s', empGroups[i][j]);

            data = data.concat(empGroups[i]);
        }

        GAPI.updateValues(
            data, 
            '1Vaf4a5hL3L_N9v7YmaC2hiFqL4k-FMXcUQ31avtjTRs',
            'REPARTITION_SJO!A1:V',
            'USER_ENTERED');
    },


    to_alsh: function (employees) {

        /* 
            Special setup
        */
        var ID = '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU';
                            
                            //  PERI            ALSH
        var DIR_NAME_RANGE  = ['D10:M10',   'D10:M11'];
        var EMP_NAME_RANGE  = ['B15:V',     'B16:V'];

        var DETAILS = [
            // TAB                      SCHOOL              PERIOD          SECTION
            // ['MERC_P1_MOINS',       'Jeanne MERTON',        'MERC_P1',      'MOINS'],
            // ['MERC_P1_PLUS',        'Edouard MARCEAU',      'MERC_P1',      'PLUS'],

            ['MERC_P2_MOINS',       'Jeanne MERTON',        'MERC_P2',      'MOINS'],
            ['MERC_P2_PLUS',        'Edouard MARCEAU',      'MERC_P2',      'PLUS'],

            ['MERC_P3_MOINS',       'Jeanne MERTON',        'MERC_P3',      'MOINS'],
            ['MERC_P3_PLUS',        'Edouard MARCEAU',      'MERC_P3',      'PLUS'],            

            ['TOUSSAINT_MOINS',     'Jeanne MERTON',        'TOUS',         'MOINS'],
            ['TOUSSAINT_PLUS',      'Edouard MARCEAU',      'TOUS',         'PLUS'],

            ['NOEL_MOINS',          'Jeanne MERTON',        'NOEL',         'MOINS'],
            ['NOEL_PLUS',           'Edouard MARCEAU',      'NOEL',         'PLUS'],

            ['CARNAVAL_MOINS',      'Jeanne MERTON',        'CARN',         'MOINS'],
            ['CARNAVAL_PLUS',       'Edouard MARCEAU',      'CARN',         'PLUS'],

            ['PAQUES_MOINS',        'Jeanne MERTON',        'PACQ',         'MOINS'],
            ['PAQUES_PLUS',         'Edouard MARCEAU',      'PACQ',         'PLUS'],

            ['JUILLET_MOINS',        'Jeanne MERTON',       'JUIL',         'MOINS'],
            ['JUILLET_PLUS',         'Edouard MARCEAU',     'JUIL',         'PLUS'],

            ['AOUT_MOINS',          'Jeanne MERTON',        'AOUT',         'MOINS'],
            ['AOUT_PLUS',           'Edouard MARCEAU',      'AOUT',         'PLUS'],
        ];

        
        var dirGroups = [];
        var empGroups = [];

        // Initialize our groups
        for (var i = 0; i < DETAILS.length; ++i) {
            dirGroups.push([]);
            empGroups.push([]);
        }

        var ref = {
            // 'CHAP':     0,
            // 'PRES':     1,
            // 'JMER':     2,
            // 'EM':       3,
            // 'DUR':      4,
            // 'MDO':      5,
            // 'HM':       6,
            // 'BDP':      7,
            // 'GOND':     8,

            // 'MERC_P1_MOINS':    0,      // 9,
            // 'MERC_P1_PLUS':     0,      // 10,
            'MERC_P2_MOINS':    0,      
            'MERC_P2_PLUS':     0,      
            'MERC_P3_MOINS':    0,      
            'MERC_P3_PLUS':     0,

            'TOUSSAINT_MOINS':  0,      // 11,
            'TOUSSAINT_PLUS':   0,      // 12,
            'NOEL_MOINS':       0,      // 13,
            'NOEL_PLUS':        0,      // 14,
            'CARNAVAL_MOINS':   0,     // 15,
            'CARNAVAL_PLUS':    0,     // 16,
            'PAQUES_MOINS':     0,     // 17,
            'PAQUES_PLUS':      0,     // 18,
            'JUILLET_MOINS':    0,
            'JUILLET_PLUS':     0,
            'AOUT_MOINS':       0,
            'AOUT_PLUS':        0,
        };


        var period_src_to_dst = {
            'MERC_P1':      'MERC P1',
            'MERC_P2':      'MERC P2',
            'MERC_P3':      'MERC P3',
            'TOUSSAINT':    'TOUSS',
            'NOEL':         'NOEL',
            'CARNAVAL':     'CARN',
            'PAQUES':       'PAQUES',
            'JUILLET':      'JUILLET',
            'AOUT':         'AOUT',
        };

        // Init ref
        var iref = 0
        for (var key in ref) {
            if (ref.hasOwnProperty(key)) {
                ref[key] = iref;
                ++iref;
            }
        }


        // Macro - Convert Affectation to the right index
        var affectationToGroup = function (affectation) {
            if (affectation._school in ref)
                return ref[affectation._school];
            else
                return ref[affectation._period + '_' + affectation._section];
        };


        // Core
        for (var i = 0; i < employees.length; ++i) {

            var e = employees[i];

            for (var j = 0; j < e._affectations.length; ++j) {

                /* 
                    Affectation
                        school
                        period
                        section        
                        days
                            [MONDAY,    2, 0, 2],
                            [TUESDAY,   2, 2, 2],
                            [THURSDAY,  0, 2, 0],
                            [FRIDAY,    0, 0, 2],
                */
                var a = e._affectations[j];

                // Skip PERI
                if (a._period == 'PERI')
                    continue;


                // Index
                var index = affectationToGroup(a);

                if (index === undefined) {
                    Logger.log('Error: index undefined for employee %s with data: %s - %s - %s', e._fullname, a._school, a._period, a._section);
                    continue;
                }
                else {
                    Logger.log('index = %s', index);
                }


                if (e._quality == 'DAP') {

                    var row = [];
                    row.push(e._fullname);
                    row.push('');                   // Double column glitch
                    row.push('');                   // row.push(e._grade);
                    row.push('');                   // row.push(e._phone_per);
                    row.push('');                   // row.push(e._phone_pro);
                    row.push(true);                   // row.push(e._discharded);
                    row.push( period_src_to_dst[a._period] );

                    // Error check
                    if (a._days) {
                        row.push(a._days[0][EMPLOYEE.H_MORN]);
                        row.push(a._days[0][EMPLOYEE.H_NOON]);
                        row.push(a._days[0][EMPLOYEE.H_EVEN]);
                    }

                    dirGroups[index].push(row);
                }
                else {

                    var row = [];
                    row.push(e._fullname);
                    row.push('');                   // Double column glitch
                    row.push('');                   // row.push(e._phone_per);
                    row.push('');                   // row.push(e._grade);
                    row.push('');                   // row.push(e._quality);
                    row.push('');
                    row.push('');
                    row.push('');                   // row.push(e._obs);
                    row.push( period_src_to_dst[a._period] );

                    // Error check
                    for (var k = 0; k < a._days.length; ++k) {

                        row.push(a._days[k][EMPLOYEE.H_MORN]);
                        row.push(a._days[k][EMPLOYEE.H_NOON]);
                        row.push(a._days[k][EMPLOYEE.H_EVEN]);
                    }

                    empGroups[index].push(row);                    
                }
            }
        }

        var data = [];

        // For DEBUG purpose
        /*
        for (var i = 0; i < DETAILS.length; ++i) {
            
            data.push([DETAILS[i][0]]);

            data = data.concat(dirGroups[i]);
            data = data.concat(empGroups[i]);
        }
        
        GAPI.updateValues(
            data,
            '1Vaf4a5hL3L_N9v7YmaC2hiFqL4k-FMXcUQ31avtjTRs',
            'REPARTITION_SJO_ALSH!A1:V',
            'USER_ENTERED'
            );
        */
            
        // Final save
        for (var i = 0; i < DETAILS.length; ++i) {
            
            // If len > 2 crop data
            if (dirGroups[i].length > 2) {
                data = dirGroups[i].slice(0, 2);
                for (var j = 2; j < dirGroups[i].slice(2).length; j++)
                    Logger.log('Sliced %s', dirGroups[i][j])
            }
            else
                data = dirGroups[i];

            GAPI.updateValues(
                data,
                ID,
                DETAILS[i][0] + '!' + DIR_NAME_RANGE[1],
                'USER_ENTERED'
                );

                
            data = empGroups[i];
            GAPI.updateValues(
                data,
                ID,
                DETAILS[i][0] + '!' + EMP_NAME_RANGE[1],
                'USER_ENTERED'
            );
        }
    },
};


var SUIVICOMPTEHEURES_SJO = {

    CONFIG: {
        ID: '1hOc7GccePGflrWUQBTZlYz2ATbHhGz7TzSzKvtShIAk',

        NAME_RANGE: 'AFFECTION_SJO!A18:S',
    },


    COLS: {
        FULLNAME: 0,
        
        VOID_1: 1,      // "Heures Travailles lissées"
        VOID_2: 2,      // "Heures lissées Avec Congés"
        
        M_START: 3,
        M_END: 4,

        IS_DIR: 5,      // TRUE/FALSE
        SCHOOL: 6,

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
        'TOUSSAINT',
        'NOEL',
        'CARNAVAL',
        'PAQUES',
        'JUILLET',
        'AOUT',
    ],


    PERIOD_TO_INDEX: {
        'MERC_P1':      10,
        'MERC_P2':      11,
        'MERC_P3':      12,

        'TOUSSAINT':         13,
        'NOEL':         14,
        'CARNAVAL':         15,
        'PAQUES':         16,
        'JUIL':         17,
        'AOUT':         18,
    },


    from: function() {

        var values = GAPI.getValues(this.CONFIG.ID, this.CONFIG.NAME_RANGE);
        var employees = [];

        // DEBUG - Value length
        // Logger.log('%s', values.length);

        for (var i = 0; i < values.length; ++i) { // 10; ++i) {
            
            var v = values[i];

            if (v[this.COLS.FULLNAME] == '')
                continue;
            var e = new Employee();

            e._fullname         = v[this.COLS.FULLNAME];
            e._quality          = (v[this.COLS.IS_DIR] == 'TRUE') ? 'DAP' : '';

            e._contract_start   = v[this.COLS.M_START];
            e._contract_end     = v[this.COLS.M_END];

            e._sum_acm_peri     = v[this.COLS.VOID_1];
            e._sum_weekly_peri  = v[this.COLS.VOID_1];


            var affectation = new Affectation();

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


    to: function(employees) {
        
        var values = [];

        for (var i = 0; i < employees.length; ++i) {
            
            var employee = employees[i];
            
            // Initialize current value
            var value = [];
            for (var j = 0; j < this.COLS.length; ++j)
                value.push('');

            value[this.COLS.FULLNAME] = employee._fullname;

            value[this.COLS.VOID_1]     = 0;    // employee._sum_weekly_peri;
            value[this.COLS.VOID_1]     = 0;    // employee._sum_acm_peri;

            value[this.COLS.M_START]    = employee._contract_start;
            value[this.COLS.M_END]      = employee._contract_end;

            value[this.COLS.IS_DIR]     = (employee._quality == 'DAP') ? 'TRUE' : 'FALSE';
            value[this.COLS.SCHOOL]     = employee._school;

            for (var j = 0; j < employee._affectations.length; ++j) {

                var affectation = employee._affectations[j];

                // TODO
                // - Check error on days[0]
                
                if (affectation._period == 'PERI') {

                    value[this.COLS.SCHOOL] = affectation._school;

                    value[this.COLS.H_MORN] = affectation._days[0][EMPLOYEE.H_MORN];
                    value[this.COLS.H_NOON] = affectation._days[0][EMPLOYEE.H_NOON];
                    value[this.COLS.H_EVEN] = affectation._days[0][EMPLOYEE.H_EVEN];
                }
                else {
                    // Build value
                    var t = '';

                    if (affectation._days[0][EMPLOYEE.H_NOON] == 8)  // Centre
                        t += 'C_';
                    else                                    // Garderie
                        t += 'G_';

                    if (affectation._section == 'MOINS')
                        t += 'MAT';
                    else
                        t += 'ELE';

                    if (employee._quality == 'DAP')
                        t += '_DIR';

                        // Convert period to index
                        // MERC_P1 => 10
                    value[ this.PERIOD_TO_INDEX[affectation._period] ] = t;
                }
            }

            // Check empty ALSH values
            for (var j = this.COLS.ALSH_P1; j < this.COLS.ALSH_AOUT + 1; ++j) {

                if (value[j] == '' ||
                    value[j] == null) {
                    
                    value[j] == '';
                }
            }

            values.push(value);
            // Logger.log('%s', value);
        }

        GAPI.updateValues(
            values,
            '1Vaf4a5hL3L_N9v7YmaC2hiFqL4k-FMXcUQ31avtjTRs',
            'Suivi_SJO!A1:S',
            'USER_ENTERED'
        )
    },



};


function Test_REPARTITION_SJO() {
    // Logger.log('%s', REPARTITION_SJO.CONFIG.DETAILS[0][0]);
    
    var es = REPARTITION_SJO.from();

    for (var i = 0; i < es.length; ++i) {
        Logger.log('%s', es[i].to_object());
    }

    Logger.log('\n\n');

    REPARTITION_SJO.to(es);
}


function Test_SUIVICOMPTEHEURE() {

    var es = SUIVICOMPTEHEURES_SJO.from();

    for (var i = 0; i < es.length; ++i) {
        // Logger.log('%s', es[i].to_object());
    }

    // Logger.log('\n\n');

    SUIVICOMPTEHEURES_SJO.to(es);
}


function Test_EMPLOYEES() {
    var esRepartition = REPARTITION_SJO.from();
    var esSuivi = SUIVICOMPTEHEURES_SJO.from();

    // Logger.log('Part. 1');
    for (var i = 0; i < esRepartition.length; ++i) {
        // Logger.log('%s', esRepartition[i].to_object());
    }
    // Logger.log('\n\n');
    
    
    // Logger.log('Part. 2');
    for (var i = 0; i < esSuivi.length; ++i) {
        // Logger.log('%s', esSuivi[i].to_object());
    }
    // Logger.log('\n\n');
    
    
    Logger.log('Part. 3');
    
    EMPLOYEES.update(esRepartition);
    EMPLOYEES.update(esSuivi);
    
    var es = EMPLOYEES.getAll();
    for (var i = 0; i < es.length; ++i) {
        // Logger.log('%s', es[i].to_object());
    }
    Logger.log('\n\n');

    SUIVICOMPTEHEURES_SJO.to(es);
    REPARTITION_SJO.to(es);
}


function Test_2() {
    var esSuivi = SUIVICOMPTEHEURES_SJO.from();

    Logger.log('Part. 1');
    for (var i = 0; i < esSuivi.length; ++i) {
        // Logger.log('%s', esSuivi[i].to_object());
    }
    // Logger.log('\n\n');

    REPARTITION_SJO.to_alsh(esSuivi);
}