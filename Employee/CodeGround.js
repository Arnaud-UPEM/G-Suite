function Test_1() {
    var Toto = function () {
        this.toto = 0;
    };

    var Totos = function () {

        this.totos = [];   // List of Employee


        this.get = function (index) {
            return this.totos[index];
        };
    };

    var totos = new Totos();
    totos.totos.push(new Toto());
    totos.totos.push(new Toto());
    totos.totos.push(new Toto());
    totos.totos.push(new Toto());
    totos.totos.push(new Toto());

    Logger.log('%s', totos.totos);

    var t = totos.get(2);
    t.toto = 5;

    Logger.log('%s', totos.totos);
}