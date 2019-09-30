/*
    HOURS COUNT v3

    The purpose of this 3rd version is the same as v2
    However it has to be flexible enough to carry two source files
    We will provide two entry points: one for 'FdF' and one for 'STJO'

    Data are extracted from 
        (REPARTITION_PERSONNEL_STJO_SERVICE_ACM_2019-2020) or
        (Repartition_Personnel_ACM_2019-2020) 
        in their RECAP tab
    Then we organize them with Employee class
    And we save it in file (Suivi Compte D'heures 2019-2020)

    Entry points:
        main_FdF
        main_STJO

    Source files:
        REPARTITION_PERSONNEL_STJO_SERVICE_ACM_2019-2020
        https://docs.google.com/spreadsheets/d/1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU

        Repartition_Personnel_ACM_2019-2020
        https://docs.google.com/spreadsheets/d/1XsVb3m4ntFICipgvXO5Jsdu54JAKf5BJpvlDtFCZeHw
        https://docs.google.com/spreadsheets/d/1mzLCS6LQ9cn2720rabICK-VCl0EvU04pU0EdgwHSHIU (Copie)

    Destination file:
        Suivi Compte D'heures 2019-2020
        https://docs.google.com/spreadsheets/d/1hOc7GccePGflrWUQBTZlYz2ATbHhGz7TzSzKvtShIAk
*/

var CONST = {

    // CONST.ID = 9;
    SRC_TYPE:       2,
    SRC_MORN:       4,
    SRC_NOON:       5,
    SRC_EVEN:       6,
    SRC_AFFECT_1:   3, // PERI 1 / ALSH_MERC / NOEL / CARN ...
    SRC_AFFECT_2:   7, // PERI / ALSH PTE VAC / ALSH GDE VAC
    SRC_AFFECT_3:   1, // School / ALSH_MOINS / ALSH_PLUS
    SRC_FULLNAME:   0,


    // DST REFERENCES
    DST_FULLNAME:   0,
    DST_IS_DIR:     5,
    DST_SCHOOL:     6,

    DST_VOID_1:     1,
    DST_VOID_2:     2,

    DST_M_START:    3,
    DST_M_END:      4,

    DST_H_MORN:     7,
    DST_H_NOON:     8,
    DST_H_EVEN:     9,

    DST_ALSH_P1:    10,
    DST_ALSH_P2:    11,
    DST_ALSH_P3:    12,

    DST_ALSH_TOUS:  13,
    DST_ALSH_NOEL:  14,
    DST_ALSH_CARN:  15,
    DST_ALSH_PAQU:  16,
    DST_ALSH_JUIL:  17,
    DST_ALSH_AOUT:  18,
};


var SETTINGS = {
    // FDF_ID: '1mzLCS6LQ9cn2720rabICK-VCl0EvU04pU0EdgwHSHIU',
    FDF_ID: '1XsVb3m4ntFICipgvXO5Jsdu54JAKf5BJpvlDtFCZeHw',
    
    FDF_NAME_RANGE: 'RECAP!A2:H',
    FDF_HAS_HEADER: true,


    STJO_ID: '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU',
    STJO_NAME_RANGE: 'RECAP!A2:H',
    STJO_HAS_HEADER: true,

    //  DST_ID: '1jWrIa-tgpItt-px2E2M7qnDs0DDYDJXeD_wPePAHB-Q',
    // DST_NAME_RANGE: 'Copie de AFFECTION_SJO!A18:S',
    DST_ID: '1hOc7GccePGflrWUQBTZlYz2ATbHhGz7TzSzKvtShIAk',

    DST_FDF_NAME_RANGE: 'AFFECTION_FDF!A18:S',
    DST_STJO_NAME_RANGE: 'AFFECTION_SJO!A18:S',    
};


var Employees = function() {
    this._data = [];

    this.exist = function(fullname) {
        for (var i = 0; i < this._data.length; ++i) {
            if (this._data[i][CONST.DST_FULLNAME] == fullname)
                return i;
        }
        return -1;
    }

    this.add = function(fullname) {
        var employee = [
            /* fullname     */     fullname,
            /* blank_1      */      '',             // '=ARRAYFORMULA(SI($A17:$A="";;AN17:AN/$Y17:$Y))',
            /* blank_2      */      '',             // '=ARRAYFORMULA(SI($A17:$A="";;AO17:AO/$Y17:$Y))',
            /* month_start  */      'SEPT. 2019',
            /* month_end    */      'JUIN 2020',
            /* is_dir       */      false,
            /* school       */      '',
            /* h_morn       */      '',
            /* h_noon       */      '',
            /* h_even       */      '',
            /* alsh_p1      */      '',
            /* alsh_p2      */      '',
            /* alsh_p3      */      '',
            /* alsh_tous    */      '',
            /* alsh_noel    */      '',
            /* alsh_carn    */      '',
            /* alsh_paqu    */      '',
            /* alsh_juil    */      '',
            /* alsh_aout    */      '',   
        ];
        this._data.push(employee);
        return employee;
    }

    this.save = function(employee) {
        for (var i = 0; i < this._data.length; ++i) {
            if (this._data[i][ CONST.DST_FULLNAME ] == employee[ CONST.DST_FULLNAME ]) {
                this._data[i] = employee;
                return true;
            }
        }
        return false;
    }

    this.update = function(row) {
        var employee = undefined;
        var iemployee = undefined;

        // Find employee
            // If not find 
            // Create a new one
        if ((iemployee = this.exist(row[ CONST.SRC_FULLNAME ])) == -1)  {
            employee = this.add(row[ CONST.SRC_FULLNAME ]);
        }
        else {
            employee = this._data[iemployee];
        }
        // Logger.log('iemployee: %s', iemployee);


        // Check if no errors
        if (employee == undefined) {
            Logger.log('Failed to add/get employee with fullname: %s', row[ CONST.SRC_FULLNAME ]);
        }


        // Organize data according to DST format

        // DIR
        if (row[ CONST.SRC_TYPE ] == 'DAP')
            employee[ CONST.DST_IS_DIR] = true;


        // SCHOOL
        const schools = {
            'BDP'   : 'BOIS DU PARC',
            'JMER'  : 'Jeanne MERTON',
            'EM'    : 'EDOUARD MARCEAU',
            'HM'    : 'HENRI MAURICE',
            'PRES'  : 'PRESQU\'ÎLE',
            'MDO'   : 'MORNE DES OLIVES',
            'GOND'  : 'Ambroise PALIX - GONDEAU',
            'DUR'   : 'Luc CAYOL - DURAND',
            'CHAP'  : 'Lise DESIR CARTESSE - CHAPELLE',

            'ALSH_MOINS':   'ALSH_MOINS',
            'ALSH_PLUS':    'ALSH_PLUS',
        }
        // employee[ CONST.DST_SCHOOL ] = schools[row[ CONST.SRC_AFFECT_3]]; // AFFECT_3 = SCHOOL


        // AFFECTATION DECISIONS
        // PERI
        // 
        if (row[ CONST.SRC_AFFECT_1] == 'PERI 1') {

            // SCHOOL
            employee[ CONST.DST_SCHOOL ] = row[ CONST.SRC_AFFECT_3]; // AFFECT_3 = SCHOOL
            // employee[ CONST.DST_SCHOOL ] = schools[row[ CONST.SRC_AFFECT_3]]; // AFFECT_3 = SCHOOL

            // HOURS MORN/NOON/EVEN
            employee[ CONST.DST_H_MORN ] = this.update_hours( row[ CONST.SRC_MORN ] );
            employee[ CONST.DST_H_NOON ] = this.update_hours( row[ CONST.SRC_NOON ] );
            employee[ CONST.DST_H_EVEN ] = this.update_hours( row[ CONST.SRC_EVEN ] );
        }

        else if (row[ CONST.SRC_AFFECT_1] == 'PERI 2') {

            // PERI 1 has priority
            if (employee[ CONST.DST_SCHOOL ] == '') {
                employee[ CONST.DST_SCHOOL ] = row[ CONST.SRC_AFFECT_3]; // AFFECT_3 = SCHOOL
                // employee[ CONST.DST_SCHOOL ] = schools[row[ CONST.SRC_AFFECT_3]]; // AFFECT_3 = SCHOOL
            }

            // HOURS MORN/NOON/EVEN
            employee[ CONST.DST_H_MORN ] = this.update_hours( row[ CONST.SRC_MORN ] );
            employee[ CONST.DST_H_NOON ] = this.update_hours( row[ CONST.SRC_NOON ] );
            employee[ CONST.DST_H_EVEN ] = this.update_hours( row[ CONST.SRC_EVEN ] );
        }

        // ALSH
        else {
            // ALSH_MOINS/ALSH_PLUS
            if (employee[ CONST.DST_SCHOOL ] == '') {
                employee[ CONST.DST_SCHOOL ] = row[ CONST.SRC_AFFECT_3]; // AFFECT_3 = SCHOOL
                // employee[ CONST.DST_SCHOOL ] = schools[row[ CONST.SRC_AFFECT_3]]; // AFFECT_3 = SCHOOL
            }


            // LAST TIME CONDITION
            // VACATIONS ARE NOT READY YET
            // ONLY FILTER ALSH MERC
            if (row[ CONST.SRC_AFFECT_1] == 'MERC P1') {

                const WHERE = {
                    'MERC P1':      CONST.DST_ALSH_P1,
                    'NOEL':         CONST.DST_ALSH_NOEL,
                    'CARN':         CONST.DST_ALSH_CARN,
                    'PAQUES':       CONST.DST_ALSH_PAQU,
                    'JUILLET':      CONST.DST_ALSH_JUIL,
                    'AOUT':         CONST.DST_ALSH_AOUT, 
                }

                const AFFECT = {
                    'ALSH_MOINS': 'MAT',
                    'ALSH_PLUS': 'ELE',
                }

                const AFFECT_DIR = {
                    'ALSH_MOINS': 'MAT_DIR',
                    'ALSH_PLUS': 'ELE_DIR',
                }

                const where = WHERE[row[ CONST.SRC_AFFECT_1]];

                // Hours for ALSH
                var value = '';
                if (row[ CONST.SRC_NOON ] == '8') {
                    value = 'C_';
                }
                else {
                    value = 'G_';
                }

                value += (employee[ CONST.DST_IS_DIR]) ? AFFECT_DIR[row[ CONST.SRC_AFFECT_3]] : AFFECT[row[ CONST.SRC_AFFECT_3]];

                employee[where] = value;

                // if (where == 'alsh_p1') {
                //     // Logger.log('fname: %s with where == %s && value == %s', employee['fullname'], where, value);
                //     Logger.log('employee[%s] = %s', where, value);
                // }
            }
        }

        // Save employee when we are done
        this.save(employee);
        // Logger.log('%s', this.save(employee));
    };


        this.update_hours = function(hour) {
            if (hour == '')
                return '0';
            return hour;
        };


    this.print = function() {
        for (var i = 0; i < this._data.length; ++i) {
            var employee = this._data[i];
            
            Logger.log('%s', employee);
            /*
            Logger.log(' - %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s',
                employee[ CONST.DST_FULLNAME ],
                employee[ CONST.DST_M_START ],
                employee[ CONST.DST_M_END ],
                employee[ CONST.DST_IS_DIR],
                employee[ CONST.DST_SCHOOL ],
                employee[ CONST.DST_H_MORN ],
                employee[ CONST.DST_H_NOON ],
                employee[ CONST.DST_H_EVEN ],
                employee[ CONST.DST_ALSH_P1 ],
                employee[ CONST.DST_ALSH_P2 ],
                employee[ CONST.DST_ALSH_P3 ],
                employee[ CONST.DST_ALSH_TOUS ],
                employee[ CONST.DST_ALSH_NOEL ],
                employee[ CONST.DST_ALSH_CARN ],
                employee[ CONST.DST_ALSH_PAQU ],
                employee[ CONST.DST_ALSH_JUIL ],
                employee[ CONST.DST_ALSH_AOUT ]
            );
            */
        }
        // Logger.log(this._data);
    };
}


function main_FdF() {
    Logger.log('Fort-de-France');

    // INIT    
    var src_values = Sheets.Spreadsheets.Values.get('1XsVb3m4ntFICipgvXO5Jsdu54JAKf5BJpvlDtFCZeHw', 'RECAP!A2:H').values;
    if (!src_values) {
        Logger.log('No data found for SRC.');
        return;
    }

    main(src_values, SETTINGS.DST_FDF_NAME_RANGE);
}


function main_STJO() {
    Logger.log('Saint-Joseph');

    // INIT    
    var src_values = Sheets.Spreadsheets.Values.get(SETTINGS.STJO_ID, SETTINGS.STJO_NAME_RANGE).values;
    if (!src_values) {
        Logger.log('No data found for SRC.');
        return;
    }

    // main(src_values, SETTINGS.DST_STJO_NAME_RANGE);
}


function main(src_values, dst_name_range) {
    // CORE
    // Data collect from RECAP
    var employees = new Employees();
    
    for (var i = 1; i < src_values.length; ++i) {  
        // Logger.log(src_values[i]);      
        employees.update(src_values[i]);
    }
    employees.print();
    // return;


    // SAVE
    // Save data to DST
    var dst_value_range = Sheets.newValueRange();
        dst_value_range.values = employees._data;

    var result = Sheets.Spreadsheets.Values.update(dst_value_range, '1hOc7GccePGflrWUQBTZlYz2ATbHhGz7TzSzKvtShIAk', 'Copie de AFFECTION_FDF 2!A18:S', {
        valueInputOption: 'USER_ENTERED'
    });
}