function parse_dly(str) {
    'use strict';

    var obj = {},
        fileArray = str.split('\n'),
        item;
    
    obj.meta = {};
    obj.data = {};

    function generateValues(subst) {
        //process the line substring which contains only the values
        var line = subst,
            width = 8, //fixed number of characters for values and flags
            val,
            mflag,
            qflag,
            sflag,
            dataObj,
            dataArray = [];

        while (line.length > 0) {
            val = Number(line.substr(0,5));
            mflag = line.substr(5,1).trim();
            qflag = line.substr(6,1).trim();
            sflag = line.substr(7,1).trim();

            //store each value and flags in an object, then push to the array
            dataObj = {'value' : val, 'mflag' : mflag, 'qflag' : qflag, 'sflag' : sflag};
            dataArray.push(dataObj);

            //remove the value and flags that have been added to the array
            line = line.substr(width);
        }

        return dataArray;
    }
    
    for (item in fileArray) {
        if (fileArray[item] !== "") {

            //split out based on fixed number of characters for each element on the line
            var station = fileArray[item].substr(0,11),
                year = Number(fileArray[item].substr(11,4)),
                month = Number(fileArray[item].substr(15,2)),
                element = fileArray[item].substr(17,4),
                //pass the rest of the line (containing only values) to the generateValues method to generate dataArray
                dataArray = generateValues(fileArray[item].substr(21));

            obj.meta['station'] = station;
/*
            if (!obj.data[year]) {
                obj.data[year] = {};
            }

            if (!obj.data[year][month]) {
                obj.data[year][month] = {};
            }

            if (!obj.data[year][month][element]) {
                if (dataArray.length !== 0) {
                    obj.data[year][month][element] = dataArray;
                }
            }
*/

            if (obj.data[element] === undefined) {
                obj.data[element] = {};
            }
            if (obj.data[element][year] === undefined) {
                obj.data[element][year] = [];
            }
            obj.data[element][year][month-1] = dataArray;

        }
    }

    return obj;
}
