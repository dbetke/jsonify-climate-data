function parse_dly(str) {
    'use strict';

    var obj = {},
        fileArray = str.split('\n'),
        item;
    
    obj.meta = {};
    obj.data = {};

    function generateValues(substr) {
        //handle substring (column widths alternate: 5, 3, 5, 3...)
    }

    for (item in fileArray) {
        var station = fileArray[item].substr(0,11),
            year = Number(fileArray[item].substr(11,4)),
            month = Number(fileArray[item].substr(15,2)),
            element = fileArray[item].substr(17,4),
            dataArray = generateValues(fileArray[item].substr(21));

        obj.meta['station'] = station;

        if (!obj.data[year]) {
            obj.data[year] = {};
        }

        if (!obj.data[year][month]) {
            obj.data[year][month] = {};
        }

        if (!obj.data[year][month][element]) {
            obj.data[year][month][element] = [];
        }

        //push dataArray

    }
    
    console.log(obj);
    return obj;
}