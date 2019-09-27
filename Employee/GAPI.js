var GAPI = {

    getValues: function(id, rangeName) {
        var values = Sheets.Spreadsheets.Values.get(id, rangeName).values;
        if (!values) {
            return false;
        }
        return values;
    },



};