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
            it('should store the station id', function () {
                expect(n.meta['station']).toEqual('USC00010008');
            });

            it('should accurately store the year', function () {
                expect(n.data[1948]).toEqual(jasmine.any(Object));
            });

            it('should accurately store the month', function () {
                expect(n.data[1948][7]).toEqual(jasmine.any(Object));
            });

            it('should accurately store the element type', function () {
                expect(n.data[1948][7]['PRCP']).toEqual(jasmine.any(Array));
            });

        });
    });
});