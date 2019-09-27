/*
    Suivi Compte d'Heures => REPARTITION


    Entry points:
        main_test
        main_FdF
        main_STJO


    Source files:
        Suivi Compte D'heures 2019-2020
        Tabs:
            AFFECTION_SJO
            AFFECTION_FDF
        https://docs.google.com/spreadsheets/d/1hOc7GccePGflrWUQBTZlYz2ATbHhGz7TzSzKvtShIAk
        https://docs.google.com/spreadsheets/d/1zXL8jlLx7Bc18ypHG9J1xEhzOwGlAALeJorhrDNhhZ0 (Copie)


        REPARTITION_PERSONNEL_STJO_SERVICE_ACM_2019-2020
        https://docs.google.com/spreadsheets/d/1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU
        https://docs.google.com/spreadsheets/d/1C65CQYISbl3yIGGM247UIVtwRBzylHcw1EkhWjRw0eY (Copie)

        Repartition_Personnel_ACM_2019-2020
        https://docs.google.com/spreadsheets/d/1XsVb3m4ntFICipgvXO5Jsdu54JAKf5BJpvlDtFCZeHw
        https://docs.google.com/spreadsheets/d/1BnaxNgEar3X-mo9l_5gvHXZ6KzdbPNYQj8SgA4fFj8I (Copie)

*/

var CONST = {

    // SRC REFERENCES
    SRC_FULLNAME:   0,

    SRC_WORK_HOUR:  1,
    SRC_LEAV_HOUR:  2,

    SRC_M_START:    3,
    SRC_M_END:      4,

    SRC_DIR:        5,
    SRC_SCHOOL:     6,

    SRC_H_MORN:     7,
    SRC_H_NOON:     8,
    SRC_H_EVEN:     9,

    SRC_ALSH_P1:    10,
    SRC_ALSH_P2:    11,
    SRC_ALSH_P3:    12,

    SRC_ALSH_TOUS:  13,
    SRC_ALSH_NOEL:  14,
    SRC_ALSH_CARN:  15,
    SRC_ALSH_PAQU:  16,
    SRC_ALSH_JUIL:  17,
    SRC_ALSH_AOUT:  18,


    // DST REFERENCES
    DST_FULLNAME:   0,
    DST_TYPE:       1, // DAP or blank

    DST_AFFECT_1:   2, // PERI / MERC_PX / NOEL / CARN ...
    DST_AFFECT_2:   3, // CENTRE / GARDERIE
    DST_AFFECT_3:   4, // PLUS/MOINS

    DST_SCHOOL:     5, // School

    DST_MORN:       6,
    DST_NOON:       7,
    DST_EVEN:       8,

    DST_WORK_HOUR:  9,
    DST_LEAV_HOUR:  10,

    DST_M_START:    11,
    DST_M_END:      12,
};


var SETTINGS = {
    SRC_ID: '1hOc7GccePGflrWUQBTZlYz2ATbHhGz7TzSzKvtShIAk',
    SRC_NAME_RANGE_FDF: ,
    SRC_NAME_RANGE_SJO: ,

    DST_FDF_ID: 
    DST_FDF_NAME_RANGE: 'RECAP_Suivi',

    DST_SJO_
    DST_SJO_NAME_RANGE: 'RECAP_Suivi',
};


var HC = {
    
    ID: '1zXL8jlLx7Bc18ypHG9J1xEhzOwGlAALeJorhrDNhhZ0', // Copie

    tabs = [
        { 'AFFECTION_FDF', 'A18:S' },
        { 'AFFECTION_SJO', 'A18:S' },
    ],
};

var FDF = {
    
    // ID: '1XsVb3m4ntFICipgvXO5Jsdu54JAKf5BJpvlDtFCZeHw',
    ID: '1BnaxNgEar3X-mo9l_5gvHXZ6KzdbPNYQj8SgA4fFj8I', // Copie
    
    tabs: [
        '1.1_Mat_IUFM',
        '1.2_Ele_IUFM',
        '1.3_PRI_EUG_REV',
        '1.4_Mat_PDN',
        '1.5_Ele_PDN',
        '8.1_MAT_DILL_A',
        '8.2_MAT_DILL_B',
        '8.3_ELE_DILL_AB',
        '8.4_ELE_DILL_C',
        '8.5_ELE_DILL_D',
    ],
};


var STJO = {

    // ID: '1-JVQ-3kYWhVkwG5MYjkVGjy0X4qWCk0BfZj5gKAzgwU',
    ID: '1C65CQYISbl3yIGGM247UIVtwRBzylHcw1EkhWjRw0eY', // Copie

    tabs: [
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
};




var Employee = {
    /*
        Return a 2D array
        @params
            row (array) -> Row from Hours Count file

        @return
            An array of arrays - each array represent am employee's affectation
    */
    hours_count_to_recap_suivi: function(row) {

        // Return var
        var rows = [];


        // Part 0 - Configuration
        // Employee type can be either DAP, ANIM or blank
        // As we can only know if he's a DAP
        // Default value is blank
        var dap = '';

        if (row[ CONST.SRC_DIR ] == 'TRUE')
            dap = 'DAP';


        // Nested fn used to create sub row with given values
        var subrow = function (
                        affect_1, affect_2, affect_3,
                        h_morn, h_noon, h_even) {
            return [
                row[ CONST.SRC_FULLNAME     ],  // Fullname
                     dap                     ,  // DAP or blank
                     affect_1                ,  // PERI / MERC_PX / NOEL / CARN ...
                     affect_2                ,  // CENTRE / GARDERIE
                     affect_3                ,  // PLUS/MOINS 6yo
                row[ CONST.SRC_SCHOOL       ],  // School
                     h_morn                  ,  // H morning
                     h_noon                  ,  // H noon
                     h_even                  ,  // H evening
                row[ CONST.SRC_WORK_HOUR    ],  // Sum work hours
                row[ CONST.SRC_LEAV_HOUR    ],  // Sum leave hours
                row[ CONST.SRC_M_START      ],  // Contract start month
                row[ CONST.SRC_M_END        ],  // Contract end month
            ];
        };


        // Part 1 - PERI
        rows.push(subrow(
                'PERI', '', '',
                row[ CONST.SRC_H_MORN ], row[ CONST.SRC_H_NOON ], row[ CONST.SRC_H_EVEN ]
        ));


        // Part 2 - ALSH
        var affects = [
            'MERC_P1', 'MERC_P2', 'MERC_P3',
            'TOUS', 'NOEL', 'CARN',
            'PAQU', 'JUIL', 'AOUT'
        ];

        // Loop through P1 to AOUT
        for (var i = 10; i < 19; ++i) {

            // Logger.log('Cell %s with value %s and type %s for name %s', i, row[i], typeof(row[i]), row[ CONST.SRC_FULLNAME ]);

            // If cell is not empty
            if (row[i] !== undefined) {            

                if (row[i] != '') {

                    /*
                        AFFECT 1
                            PERI/MERC_PX/NOEL/...
                    */
                    var affect_1 = affects[i - 10];


                    /*
                        AFFECT 2/3 + HOURS
                            CENTRE/GARDERIE
                            PLUS/MOINS 6yo
                            HOURS for CENTRE - 0, 8, 0
                            HOURS for GARDERIE - 2, 0, 2
                    */
                    var affect_2 = '';
                    var affect_3 = '';
                    var h_morn = 0;
                    var h_noon = 0;
                    var h_even = 0;


                    if (row[i] == 'C_MAT' || 
                        row[i] == 'C_MAT_DIR') {

                        affect_2 = 'CENTRE';
                        affect_3 = 'MOINS';

                        h_morn = 0;                   
                        h_noon = 8;                   
                        h_even = 0;
                    }
                    else if (row[i] == 'G_MAT' || 
                             row[i] == 'G_MAT_DIR') {

                        affect_2 = 'GARDERIE';
                        affect_3 = 'MOINS';

                        h_morn = 2;                   
                        h_noon = 0;                   
                        h_even = 2;
                    }
                    else if (row[i] == 'C_ELE' || 
                             row[i] == 'C_ELE_DIR') {

                        affect_2 = 'CENTRE';
                        affect_3 = 'PLUS';

                        h_morn = 0;                   
                        h_noon = 8;                   
                        h_even = 0;              
                    }
                    else if (row[i] == 'G_ELE' || 
                             row[i] == 'G_ELE_DIR') {

                        affect_2 = 'GARDERIE';
                        affect_3 = 'PLUS';

                        h_morn = 2;                   
                        h_noon = 0;                   
                        h_even = 2;              
                    }
                    else {
                        Logger.log('Error - No affect_2 found for %s', row[ CONST.SRC_FULLNAME ]);
                    }

                    rows.push(subrow(
                            affect_1, affect_2, affect_3,
                            h_morn, h_noon, h_even
                    ));
                }
            }   
        }

        Logger.log('%s', rows.length);
        return rows;
    },


    /*
        Return RECAP header

        @return
            header (array) - array of (string) with RECAP header
    */
    hours_count_to_recap_suivi_header: function() {
        return [
            'Nom Prénom',
            'Qualité',
            'Affectation',
            'Centre/Garderie',
            'Plus/Moins 6 ans',
            'Ecole',
            'H MAT',
            'H INT',
            'H AM',
            'H Travail',
            'H Congé',
            'Début contrat',
            'Fin contrat',
        ];
    },
};


function main_test() {

    const rows = [
        [
            'ABLANA Viviane',
            '121,3333333', '133,4666667',
            'SEPT. 2019', 'AOÛT 2020',
            'VRAI',                         // or true
            'DUR',                          // School
            '2', '0', '2',                  // PERI
            'G_MAT_DIR',                    // P1
            '',                             // P2
            'C_MAT_DIR',                    // P3
            '',                             // TOUS
            'G_ELE_DIR',                    // NOEL
            '',                             // CARN
            'C_ELE_DIR',                    // PAQU
            '',                             // JUIL
            '',                             // AOUT
        ],
        [
            'ADELAIDE Gabrielle Marie-Georges',
            '86,4', '95,04',
            'SEPT. 2019', 'AOÛT 2020',
            'FAUX',                         // or true
            'HM',                           // School
            '2', '2', '2',                  // PERI
            '',                             // P1
            'C_ELE',                        // P2
            '',                             // P3
            'G_ELE',                        // TOUS
            '',                             // NOEL
            'C_MAT',                        // CARN
            '',                             // PAQU
            'G_MAT',                        // JUIL
            'C_MAT',                        // AOUT
        ],
    ];

    var r = [];

    for (var i = 0; i < rows.length; ++i) {
        r = r.concat(Employee.hours_count_to_recap_suivi(rows[i]));
    }

    for (var i = 0; i < r.length; ++i) {
        Logger.log(r[i]);
    }

}

function main_FdF() {
    Logger.log('Fort-de-France');

    main(SETTINGS.SRC_NAME_RANGE_FDF, SETTINGS.DST_FDF_ID, SETTINGS.DST_FDF_NAME_RANGE);
}


function main_STJO() {
    Logger.log('Saint-Joseph');

    main(SETTINGS.SRC_NAME_RANGE_SJO, SETTINGS.DST_SJO_ID, SETTINGS.DST_SJO_NAME_RANGE);
}


function main(src_name_range, dst_id, dst_name_range) {

    var src_values = Sheets.Spreadsheets.Values.get(SETTINGS.SRC_ID, src_name_range).values;
    if (!src_values) {
        Logger.log('No data found for SRC.');
        return;
    }


    // CORE
    var rows = [];

    for (var i = 1; i < src_values.length; ++i) {

        // Filter Spreadsheets value
        if (src_values[i][ CONST.SRC_FULLNAME ] === '')
            continue;

        // Logger.log('%s', src_values[i]);
        rows = rows.concat(Employee.hours_count_to_recap_suivi(src_values[i]));
    }


    // DEBUG - Get final rows length
    // Logger.log('%s', rows.length);


    /*
        Save
    */
    var dst_sheet = SpreadsheetApp
                    .openById(dst_id)
                    .getSheetByName(dst_name_range);

    dst_range = dst_sheet.getRange(1, 1, 1, 13);

    var headers = [Employee.hours_count_to_recap_suivi_header()];
    dst_range.setValues(headers);

    dst_range = dst_sheet.getRange(2, 1, rows.length, 13);
    dst_range.setValues(rows);
}

