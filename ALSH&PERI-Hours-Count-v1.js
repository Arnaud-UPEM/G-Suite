/*
    HOURS COUNT v1

    is the 1st version of the script to merge some RECAP data
    in 'Suivi Compte d'Heures file
*/

/*
const CONST = {

    // CONST.ID = 9;
    SRC_TYPE:       2,
    SRC_MORN:       4,
    SRC_NOON:       5,
    SRC_EVEN:       6,
    SRC_AFFECT_1:   3, // PERI 1 / ALSH_MERC / NOEL / CARN ...
    SRC_AFFECT_2:   7, // PERI / ALSH PTE VAC / ALSH GDE VAC
    SRC_AFFECT_3:   1, // School / ALSH_MOINS / ALSH_PLUS
    SRC_FULLNAME:   0,

    DST_FULLNAME:   0,
    DST_VOID_1:     0,
    DST_VOID_2:     0,
    DST_M_START:    0,
    DST_M_END:      0,
    DST_IS_DIR:     0,
    DST_SCHOOL:     0,
    DST_H_MORN:     0,
    DST_H_NOON:     0,
    DST_H_EVEN:     0,
    DST_ALSH_P1:    0,
    DST_ALSH_P2:    0,
    DST_ALSH_P1:    0,
    DST_ALSH_TOUS:  0,
    DST_ALSH_NOEL:  0,
    DST_ALSH_CARN:  0,
    DST_ALSH_PAQU:  0,
    DST_ALSH_JUIL:  0,
    DST_ALSH_AOUT:  0,
};


const SETTINGS = {
    SRC_ID: '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU',
    SRC_NAME_RANGE: 'RECAP!A2:H',
    SRC_HAS_HEADER: true,

    DST_ID: '1jWrIa-tgpItt-px2E2M7qnDs0DDYDJXeD_wPePAHB-Q',
    DST_NAME_RANGE: 'Copie de AFFECTION_SJO!A18:S',
};
*/


var Employees = function() {
    this._data = [];

    this.exist = function(fullname) {
        for (var i = 0; i < this._data.length; ++i) {
            if (this._data[i]['fullname'] == fullname)
                return i;
        }
        return -1;
    }

    this.add = function(fullname) {
        var employee = {
            'fullname':     fullname,
            'blank_1':      '', // '=ARRAYFORMULA(SI($A17:$A="";;AN17:AN/$Y17:$Y))',
            'blank_2':      '', // '=ARRAYFORMULA(SI($A17:$A="";;AO17:AO/$Y17:$Y))',
            'month_start':  'SEPT. 2019',
            'month_end':    'JUIN 2020',
            'is_dir':       false,
            'school':       '',
            'h_morn':       '',
            'h_noon':       '',
            'h_even':       '',
            'alsh_p1':      '',
            'alsh_p2':      '',
            'alsh_p3':      '',
            'alsh_tous':    '',
            'alsh_noel':    '',
            'alsh_carn':    '',
            'alsh_paqu':    '',
            'alsh_juil':    '',
            'alsh_aout':    '',
        };
        this._data.push(employee);
        return employee;
    }

    this.save = function(employee) {
        for (var i = 0; i < this._data.length; ++i) {
            if (this._data[i]['fullname'] == employee['fullname']) {
                this._data[i] = employee;
                return true;
            }
        }
        return false;
    }

    this.update = function(row) {
        const ID = 9;
        const TYPE = 2;
        const MORN = 4;
        const NOON = 5;
        const EVEN = 6;
        const AFFECT_1 = 3; // PERI 1 / ALSH_MERC / NOEL / CARN ...
        const AFFECT_2 = 7; // PERI / ALSH PTE VAC / ALSH GDE VAC
        const AFFECT_3 = 1; // School / ALSH_MOINS / ALSH_PLUS
        const FULLNAME = 0;

        var employee = undefined;
        var iemployee = undefined;

        if ((iemployee = this.exist(row[FULLNAME])) == -1)  {
            employee = this.add(row[FULLNAME]);
        }
        else {
            employee = this._data[iemployee];
        }
        // Logger.log('iemployee: %s', iemployee);

        if (employee == undefined) {
            Logger.log('Failed to add/get employee');
        }


        // DIR
        if (row[TYPE] == 'DAP')
            employee['is_dir'] = true;


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
        // employee['school'] = schools[row[AFFECT_3]]; // AFFECT_3 = SCHOOL


        // AFFECTATION DECISIONS
        if (row[AFFECT_1] == 'PERI 1') {

            // SCHOOL
            employee['school'] = schools[row[AFFECT_3]]; // AFFECT_3 = SCHOOL

            // HOURS MORN/NOON/EVEN
            employee['h_morn'] = row[MORN];
            employee['h_noon'] = row[NOON];
            employee['h_even'] = row[EVEN];
        }
        else {
            // ALSH_MOINS/ALSH_PLUS
            if (employee['school'] == '')
                employee['school'] = schools[row[AFFECT_3]]; // AFFECT_3 = SCHOOL


            // LAST TIME CONDITION
            // VACATIONS ARE NOT READY YET
            // ONLY FILTER ALSH MERC
            if (row[AFFECT_1] == 'MERC P1') {

                const WHERE = {
                    'MERC P1':    'alsh_p1',
                    'NOEL':         'alsh_noel',
                    'CARN':         'alsh_carn',
                    'PAQUES':       'alsh_paqu',
                    'JUILLET':      'alsh_juil',
                    'AOUT':         'alsh_aout',
                }

                const AFFECT = {
                    'ALSH_MOINS': 'MAT',
                    'ALSH_PLUS': 'ELE',
                }

                const AFFECT_DIR = {
                    'ALSH_MOINS': 'MAT_DIR',
                    'ALSH_PLUS': 'ELE_DIR',
                }

                const where = WHERE[row[AFFECT_1]];

                // Hours for ALSH
                var value = '';
                if (row[NOON] == '8') {
                    value = 'C_';
                }
                else {
                    value = 'G_';
                }

                value += (employee['is_dir']) ? AFFECT_DIR[row[AFFECT_3]] : AFFECT[row[AFFECT_3]];

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
    }

    this.print = function() {
        for (var i = 0; i < this._data.length; ++i) {
            var employee = this._data[i];
            Logger.log(' - %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s',
                employee['fullname'],
                employee['month_start'],
                employee['month_end'],
                employee['is_dir'],
                employee['school'],
                employee['h_morn'],
                employee['h_noon'],
                employee['h_even'],
                employee['alsh_p1'],
                employee['alsh_p2'],
                employee['alsh_p3'],
                employee['alsh_tous'],
                employee['alsh_noel'],
                employee['alsh_carn'],
                employee['alsh_paqu'],
                employee['alsh_juil'],
                employee['alsh_aout']
            );
        }
        // Logger.log(this._data);
    }
}


function myFunction() {
    // INIT
    var src_id = '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU';
    var src_name_range = 'RECAP!A2:H';
    
    var dst_id = '1jWrIa-tgpItt-px2E2M7qnDs0DDYDJXeD_wPePAHB-Q';
    var dst_name_range = 'AFFECTION_SJO!A18:S';
    
    var src_values = Sheets.Spreadsheets.Values.get(src_id, src_name_range).values;
    if (!src_values) {
        Logger.log('No data found for SRC.');
        return;
    }


    // CORE
    // Data collect from RECAP
    var employees = new Employees();
    
    for (var i = 1; i < src_values.length; ++i) {        
        employees.update(src_values[i]);
    }
    employees.print();


    // SAVE
    // Save data to DST
    var dst_value_range = Sheets.newValueRange();
        dst_value_range.values = [];


    Logger.log('%s', employees._data.length);
    for (var i = 0; i < employees._data.length; ++i) {
        // const e = employees._data[i];
        // Logger.log('%s', employees._data[i]['fullname']);

        var v = [
           employees._data[i]['fullname'],
           employees._data[i]['blank_1'],
           employees._data[i]['blank_2'],
           employees._data[i]['month_start'],
           employees._data[i]['month_end'],
           employees._data[i]['is_dir'],
           employees._data[i]['school'],
           employees._data[i]['h_morn'],
           employees._data[i]['h_noon'],
           employees._data[i]['h_even'],
           employees._data[i]['alsh_p1'],
           employees._data[i]['alsh_p2'],
           employees._data[i]['alsh_p3'],
           employees._data[i]['alsh_tous'],
           employees._data[i]['alsh_noel'],
           employees._data[i]['alsh_carn'],
           employees._data[i]['alsh_paqu'],
           employees._data[i]['alsh_juil'],
           employees._data[i]['alsh_aout'],
        ];
        Logger.log('%s', v[0]);

        dst_value_range.values.push(
            v
        );
    }

    var result = Sheets.Spreadsheets.Values.update(dst_value_range, dst_id, dst_name_range, {
        valueInputOption: 'USER_ENTERED'
    });
}