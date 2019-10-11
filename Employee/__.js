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


var EmployeeSuivi = function () {
    this._fullname = '';

    this._sum_weekly_peri = '';
    this._sum_acm_peri = '';

    this._contract_start = '';
    this._contract_end = '';

    this._dir = false;

    this._school = '';

    this._h_morn = 0;
    this._h_noon = 0;
    this._h_even = 0;

    this._alsh = [];        // Array of str (G_ELE_DIR)

    // Outputs
    this.print = function () {
        Logger.log('');
    };


    this.to_array = function () {
        var arr = [
            this._fullname,

            this._sum_weekly_peri,
            this._sum_acm_peri,

            this._contract_start,
            this._contract_end,

            this._dir,
            this._school,

            this._h_morn,
            this._h_noon,
            this._h_even,
        ];
        for (var i = 0; i < this._alsh.length; ++i)
            arr.push(this._alsh[i]);
        return arr;
    };


    this.to_object = function () {
        return {
            'fullname': this._fullname,

            'sum_weekly_peri': this._sum_weekly_peri,
            'sum_acm_peri': this._sum_acm_peri,

            'contract_start': this._contract_start,
            'contract_end': this._contract_end,

            'dir': this._dir,
            'school': this._school,

            'h_morn': this._h_morn,
            'h_noon': this._h_noon,
            'h_even': this._h_even,

            'aslh': this._alsh,
        };
    };
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


var SUIVICOMPTEHEURES = {


    CONFIG: {
        SJO_ID: '1hOc7GccePGflrWUQBTZlYz2ATbHhGz7TzSzKvtShIAk',
        SJO_NAME_RANGE: 'AFFECTION_SJO!A18:S',
        
        FDF_ID: '1hOc7GccePGflrWUQBTZlYz2ATbHhGz7TzSzKvtShIAk',
        FDF_NAME_RANGE: 'AFFECTION_FDF!A18:S',
    },


    COLS: {
        FULLNAME: 0,
        
        SUM_HOURS_1: 1,      // "Heures Travailles lissées"
        SUM_HOURS_2: 2,      // "Heures lissées Avec Congés"
        
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


    from_fdf: function() {

        var values = GAPI.getValues(this.CONFIG.FDF_ID, this.CONFIG.FDF_NAME_RANGE);
        var employees = [];

        // DEBUG - Value length
        // Logger.log('%s', values.length);

        for (var i = 0; i < values.length; ++i) { // 10; ++i) {
            
            var v = values[i];

            if (v[this.COLS.FULLNAME] == '')
                continue;

            var e = new EmployeeSuivi();

            e._fullname     = v[this.COLS.FULLNAME];

            e._contract_start   = v[this.COLS.M_START];
            e._contract_end     = v[this.COLS.M_END];

            e._sum_acm_peri     = v[this.COLS.SUM_HOURS_1];
            e._sum_weekly_peri  = v[this.COLS.SUM_HOURS_1];

            e._dir      = (v[this.COLS.IS_DIR] == 'TRUE') ? true : false;
            e._school   = v[this.COLS.SCHOOL];

            e._h_morn = v[this.COLS.H_MORN];
            e._h_noor = v[this.COLS.H_NOON];
            e._h_even = v[this.COLS.H_EVEN];

            for (var j = this.COLS.ALSH_P1; j < this.COLS.ALSH_AOUT + 1; ++j)
                e._alsh.push(v[j]);

            employees.push(e);
        }

        return employees;
    },


    from_sjo: function() {

        var values = GAPI.getValues(this.CONFIG.SJO_ID, this.CONFIG.SJO_NAME_RANGE);
        var employees = [];

        // DEBUG - Value length
        // Logger.log('%s', values.length);

        for (var i = 0; i < values.length; ++i) { // 10; ++i) {
            
            var v = values[i];

            if (v[this.COLS.FULLNAME] == '')
                continue;

            var e = new EmployeeSuivi();

            e._fullname     = v[this.COLS.FULLNAME];

            e._contract_start   = v[this.COLS.M_START];
            e._contract_end     = v[this.COLS.M_END];

            e._sum_acm_peri     = v[this.COLS.SUM_HOURS_1];
            e._sum_weekly_peri  = v[this.COLS.SUM_HOURS_1];

            e._dir      = (v[this.COLS.IS_DIR] == 'TRUE') ? true : false;
            e._school   = v[this.COLS.SCHOOL];

            e._h_morn = v[this.COLS.H_MORN];
            e._h_noor = v[this.COLS.H_NOON];
            e._h_even = v[this.COLS.H_EVEN];

            for (var j = this.COLS.ALSH_P1; j < this.COLS.ALSH_AOUT + 1; ++j)
                e._alsh.push(v[j]);

            employees.push(e);
        }

        return employees;
    },
};


var REPARTITION = {

    CONFIG: {
        SJO_ID: '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU',

        SJO_DIR_RANGE: ['D10:M10', 'D10:M11'],
        SJO_EMP_RANGE: ['B15:V', 'B16:V'],
    },


    SJO_TABS: [
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


    SJO_DETAILS: [
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
        EMP_SUM_WEEKLY: 5,
        EMP_OBS: 7,
        EMP_AFFECT: 8,

        EMP_H_START: 9,
    },


    to_sjo: function (employees) {

        /* 
            Special setup
        */
        var ID = '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU';
                            
        //                PERI          ALSH
        var DIR_RANGE  = ['D10:M10',   'D10:M11'];
        var EMP_RANGE  = ['B15:V',     'B16:V'];


        var DETAILS = [
            // TAB
            'MERC_P1_MOINS',  
            'MERC_P1_PLUS',   

            'MERC_P2_MOINS',  
            'MERC_P2_PLUS',   

            'MERC_P3_MOINS',  
            'MERC_P3_PLUS',   

            'TOUSSAINT_MOINS',
            'TOUSSAINT_PLUS', 

            'NOEL_MOINS',     
            'NOEL_PLUS',      

            'CARNAVAL_MOINS', 
            'CARNAVAL_PLUS',  

            'PAQUES_MOINS',   
            'PAQUES_PLUS',    

            'JUILLET_MOINS',  
            'JUILLET_PLUS',   

            'AOUT_MOINS',     
            'AOUT_PLUS',      
        ];

        
        var dirGroups = [];
        var empGroups = [];

        // Initialize our groups
        for (var i = 0; i < DETAILS.length; ++i) {
            dirGroups.push([]);
            empGroups.push([]);
        }


        var index_to_period = [
            'MERC P1',
            'MERC P2',
            'MERC P3',
            'TOUSS',
            'NOEL',
            'CARN',
            'PAQUES',
            'JUILLET',
            'AOUT',
        ];


        var index_to_tab = [
            'MERC_P1',
            'MERC_P2',
            'MERC_P3',
            'TOUSSAINT',
            'NOEL',
            'CARNAVAL',
            'PAQUES',
            'JUILLET',
            'AOUT',
        ];


        var _index_to_period = {
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


        // Core
        for (var i = 0; i < employees.length; ++i) {

            var e = employees[i];

            /* PERI */
            // Skip


            /* ALSH */
            // Skip MERC P1
            for (var j = 1; j < e._alsh.length; ++j) {
                
                var alsh = e._alsh[i];

                if (alsh == '' ||
                    alsh == undefined)
                    continue;

                /*
                    Parse affectation
                */
                var moins = true;
                var is_dir = false;

                var h_morn = 0;
                var h_noon = 0;
                var h_even = 0;

                // Centre
                if (alsh.indexOf('C_') !== -1) {
                    h_morn = 0;
                    h_noon = 8;
                    h_even = 0;
                }
                // Garderie
                else {
                    h_morn = 2;
                    h_noon = 0;
                    h_even = 2;
                }
                
                // Maternel
                if (alsh.indexOf('MAT') !== -1) 
                    moins = true;
                // Elementaire
                else
                    moins = false;

                // Dir?
                if (alsh.indexOf('DIR') !== -1) 
                    dir = true;



                /*
                    Calculate dirGroups/empGroups
                */
                var index_str = index_to_tab[j];
                
                if (moins)
                    index_str += '_MOINS';
                else
                    index_str += '_PLUS';

                var index = j * 2;
                    index += (!moins) ? 1 : 0;

                Logger.log('index: %s, j: %s', index, j);


                /*
                    Start row
                */
                if (dir) {

                    var row = [];
                        row.push(e._fullname);                      // Fullname
                        row.push('');                               // Fullname glitch
                        row.push('');                               // Grade
                        row.push('');                               // Phone Per
                        row.push('');                               // Phone Pro
                        row.push(true);                             // Discharged?

                        row.push( index_to_period[j] );             // Period

                        row.push(h_morn);
                        row.push(h_noon);
                        row.push(h_even);


                    dirGroups[index].push(row);
                }
                else {

                    var row = [];
                        row.push(e._fullname);                      // Fullname
                        row.push('');                               // Fullname glitch
                        row.push('');                               // Phone
                        row.push('');                               // Grade
                        row.push('ANIM.');                          // Quality
                        row.push('');                               // Sum
                        row.push('');                               // Sum
                        row.push('');                               // Obs
                        
                        row.push( index_to_period[j] );             // Period

                        row.push(h_morn);
                        row.push(h_noon);
                        row.push(h_even);

                    empGroups[index].push(row);                    
                }
            }
        }

        var data = [];

        // For DEBUG purpose
        
        // Directors 1st
        data.push(['DIRECTORS']);
        for (var i = 0; i < DETAILS.length; ++i) {
            
            data.push([DETAILS[i]]);
            data = data.concat(dirGroups[i]);
            data.push([]);
        }

        // Employee then
        data.push([]);
        data.push([]);
        
        data.push(['EMPLOYEES']);
        for (var i = 0; i < DETAILS.length; ++i) {
            
            data.push([DETAILS[i]]);
            data = data.concat(empGroups[i]);
            data.push([]);
        }
        GAPI.updateValues(
            data,
            '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU',
            'DEBUG!A1:V',
            'USER_ENTERED'
        );



        /*
        var empty_row = function() {
            var row = [];
            for (var i = 0; i < 10; i++)
                row.push('');
            return row;
        };
            
        // Final save
        for (var i = 0; i < DETAILS.length; ++i) {
            data = [];
            
            // Dir table can only take two names
            // 1st is for 'Garderie'
            // 2nd is for 'Centre'
            // If length > 2 slice data
            if (dirGroups[i].length > 2) {

                // Keep the 1st two names
                raw = dirGroups[i].slice(0, 2);
                if (raw.length == 1)
                    raw.push(empty_row());

                // Apply an hours filter
                if (raw[0][this.COLS.DIR_H_MORN] == '2.0') {
                    data.push(raw[0]);
                    data.push(raw[1]);
                }
                else {
                    data.push(raw[1]);
                    data.push(raw[0]);
                }

                // Print leftover names when data > 2
                for (var j = 2; j < dirGroups[i].slice(2).length; j++)
                    Logger.log('Sliced %s', dirGroups[i][j])
            }
            else {
                raw = dirGroups[i];
                if (raw.length == 1)
                    raw.push(empty_row());

                // Dir table has an order
                // 1st is for 'Garderie'
                // 2nd is for 'Centre'
                if (raw[0][this.COLS.DIR_H_MORN] == '2.0') {
                    data.push(raw[0]);
                    data.push(raw[1]);
                }
                else {                    
                    data.push(raw[1]);
                    data.push(raw[0]);
                }
            }
            // Add formula for directors
            if (data.length > 0) {
                
                Logger.log(i);
                Logger.log(data);
                data[0][this.COLS.DIR_GRADE]     = '=ARRAYFORMULA(if($D10:$D11="";;VLOOKUP($D10:$D11;DET_SAL;5;FALSE)))';
                data[0][this.COLS.DIR_PHONE_PER] = '=ARRAYFORMULA(if($D10:$D11="";;VLOOKUP($D10:$D11;DET_SAL;4;FALSE)))';
                data[0][this.COLS.DIR_PHONE_PRO] = '=ARRAYFORMULA(if($D10:$D11="";;VLOOKUP($D10:$D11;DET_SAL;3;FALSE)))';
            }

            // Logger.log(data);

            GAPI.updateValues(
                data,
                ID,
                DETAILS[i] + '!' + DIR_NAME_RANGE[1],
                'USER_ENTERED'
                );

                
            data = empGroups[i];    

            // Add formula for directors
            if (data.length > 0) {
                data[0][this.COLS.EMP_PHONE] = '=ARRAYFORMULA(if(B16:B55="";;VLOOKUP(B16:B55;DET_SAL;3;FALSE)))';
                data[0][this.COLS.EMP_GRADE] = '=ARRAYFORMULA(if(B16:B55="";;VLOOKUP(B16:B55;DET_SAL;5;FALSE)))';
                data[0][this.COLS.EMP_SUM_WEEKLY] = '=ARRAYFORMULA(IFS(B16:B55="";;RECAP_STATUS="AJOUR";VLOOKUP(B16:B55;HEBDO_PERI;2;FALSE);RECAP_STATUS="OBS";"ACTUALISER";RECAP_STATUS="ENCOURS";"EN COURS"))';
            }

            GAPI.updateValues(
                data,
                ID,
                DETAILS[i] + '!' + EMP_NAME_RANGE[1],
                'USER_ENTERED'
            );
        }
        */
    },
};


function main_fdf() {
    var esSuivi = SUIVICOMPTEHEURES.from_fdf();

    Logger.log('Part. 1');
    for (var i = 0; i < esSuivi.length; ++i) {
        Logger.log('%s', esSuivi[i].to_object());
    }
    // Logger.log('\n\n');

    // REPARTITION.to_alsh(esSuivi);
}


function main_sjo() {
    var esSuivi = SUIVICOMPTEHEURES.from_sjo();

    Logger.log('Part. 1');
    for (var i = 0; i < esSuivi.length; ++i) {
        // Logger.log('%s', esSuivi[i].to_object());
    }
    // Logger.log('\n\n');

    REPARTITION.to_sjo(esSuivi);
}