describe("monthly", function () {
    "use strict";

    describe("function definition", function () {

        it("should define a function named generateMonthly", function () {
            expect(typeof(generateMonthly)).toBe("function");
        });

    });

    describe("parsing from test file data/USC00010008.prcp.dat", function () {

        var loadingFinished = false,
            data,
            n;

        $.ajax({
            url : '../data/USC00010008.prcp.dat',
            dataType : 'text',
            success : function (response) {
                loadingFinished = true;
                data = response;
            }
        });

        beforeEach(function () {
            waitsFor(function() {
                if (loadingFinished) {
                    n = generateMonthly(data);
                }
                return loadingFinished;
            });
        });

        describe("generate monthly", function () {

            it("should accurately store a year", function () {
                expect(n[1948]).toEqual(jasmine.any(Object));
                expect(n[1948]).not.toEqual(jasmine.any(String));
                expect(n[1947]).toBe(undefined);
            });

            it("should accurately store a month", function () {
                expect(n[1948][7]).toEqual(jasmine.any(Array));
                expect(n[1948][7]).not.toEqual(jasmine.any(String));
                expect(n[1948][6]).toBe(undefined);
            });

            it('should store monthly values in an array', function () {
                expect(n[1948][12][0]).toEqual(0);
                expect(n[1949][11][12]).toEqual(173);
                expect(n[1950][4][2]).toEqual(15);
                expect(n[1950][12][15]).toEqual(0);
                expect(n[2011][6][28]).toEqual(102);
                expect(n[2013][1][1]).toEqual('M');
            });

            it('should store numbers as numbers and letters as strings', function () {
                expect(n[2007][12][28]).toEqual(jasmine.any(String));
                expect(n[2007][12][28]).not.toEqual(jasmine.any(Number));
                expect(n[2006][10][3]).toEqual(jasmine.any(Number));
                expect(n[2006][10][3]).not.toEqual(jasmine.any(String));
                
            });

        });
    });
});
