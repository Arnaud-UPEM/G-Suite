var GAPI = {

    getValues: function(id, rangeName) {
        var values = Sheets.Spreadsheets.Values.get(id, rangeName).values;
        if (!values) {
            return false;
        }
        return values;
    },


    updateValues: function(data, id, rangeName, valueInputOption = 'USER_ENTERED') {
        var v = Sheets.newValueRange();
            v.values = data;

        var result = Sheets.Spreadsheets.Values.update(v, id, rangeName, {
            valueInputOption: valueInputOption
        });
    },
};