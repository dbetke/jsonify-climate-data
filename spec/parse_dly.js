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

            it('should accurately store the element', function () {
                expect(n.data['PRCP']).toEqual(jasmine.any(Object));
            });

            it('should accurately store the year', function () {
                expect(n.data['SNWD'][1948]).toEqual(jasmine.any(Array));
            });

            it('should accurately store the element month', function () {
                expect(n.data['PRCP'][1948][7]).toEqual(jasmine.any(Array));
            });

            it('should accurately store the data object value', function () {
                expect(n.data['SNWD'][1948][6][28].value).toEqual(-9999);
                expect(n.data['PRCP'][1948][8][3].value).toEqual(1369);
                expect(n.data['SNOW'][1958][0][0].value).toEqual(0);
                expect(n.data['PRCP'][2001][8][5].value).toEqual(0);
                expect(n.data['PRCP'][2011][6][9].value).toEqual(406);
                expect(n.data['PRCP'][2013][0][3].value).toEqual(25);
            });

            it('should accurately store the data object mFlag', function () {
                expect(n.data['SNWD'][1948][6][28].mflag).toEqual("");
                expect(n.data['PRCP'][1948][8][3].mflag).toEqual("");
                expect(n.data['SNOW'][1958][0][0].mflag).toEqual("T");
                expect(n.data['PRCP'][2001][8][5].mflag).toEqual("T");
                expect(n.data['PRCP'][2011][6][9].mflag).toEqual("");
                expect(n.data['PRCP'][2013][0][3].mflag).toEqual("");
            });

            it('should accurately store the data object qFlag', function () {
                //there are no q flags in the test file, all are blank
                expect(n.data['SNWD'][1948][6][28].qflag).toEqual("");
                expect(n.data['PRCP'][1948][8][3].qflag).toEqual("");
                expect(n.data['SNOW'][1958][0][0].qflag).toEqual("");
                expect(n.data['PRCP'][2001][8][5].qflag).toEqual("");
                expect(n.data['PRCP'][2011][6][9].qflag).toEqual("");
                expect(n.data['PRCP'][2013][0][3].qflag).toEqual("");
            });

            it('should accurately store the data object sFlag', function () {
                expect(n.data['SNWD'][1948][6][28].sflag).toEqual("");
                expect(n.data['PRCP'][1948][8][3].sflag).toEqual("0");
                expect(n.data['SNOW'][1958][0][0].sflag).toEqual("0");
                expect(n.data['PRCP'][2001][8][5].sflag).toEqual("0");
                expect(n.data['PRCP'][2011][6][9].sflag).toEqual("K");
                expect(n.data['PRCP'][2013][0][3].sflag).toEqual("H");
            });

        });
    });
});