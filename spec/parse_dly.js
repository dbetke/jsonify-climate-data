describe("parse_dly", function () {
    "use strict";

    describe("function definition", function () {

        it("should define a function named parse_dly", function () {
            expect(typeof(parse_dly)).toBe("function");
        });

    });

    describe("parsing from test file data/USC00010008.dly", function () {

        var loadingFinished = false,
            data,
            n;

        $.ajax({
            url : '../data/USC00010008.dly',
            dataType : 'text',
            success : function (response) {
                loadingFinished = true;
                data = response;
            }
        });

        beforeEach(function () {
            waitsFor(function() {
                if (loadingFinished) {
                    n = parse_dly(data);
                }
                return loadingFinished;
            });
        });

        describe('parse_dly', function () {
           it('should do something', function () {
               //..
           }); 
        });
    });
});