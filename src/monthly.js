function generateMonthly(str) {
    'use strict';

    var obj = {},
        fileArray = str.split('\n'),
        item,
        lineItem,
        date,
        year,
        month;
    
    for (item in fileArray) {
        lineItem = fileArray[item].split(',');
        date = lineItem[0];
        year = Number(date.substr(0,4));
        month = Number(date.substr(4));
        
        if (!obj[year]) {
            obj[year] = {};
        }

        obj[year][month] = [];

        for (var i = 1; i < lineItem.length; i++) {
            var value = lineItem[i];

            if (!isNaN(Number(value))) {
                value = Number(value);
            } 

            obj[year][month].push(value);
        }
    }

    return obj;
}
