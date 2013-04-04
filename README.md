JSONify-Climate-Data
==================

A javascript program for parsing climate data from <a href="http://www1.ncdc.noaa.gov/pub/data/ghcn/daily/">NOAA's Daily Global Historical Climatology Network datasets</a> as well as raw monthly data files.


Installation
==========

Clone this repository and add desired NOAA datasets to the Data directory.

To parse daily data files: <br />
  Load the data file as text, then use the parse_dly function to process the data.

To parse raw monthly data files: <br />
   Load the data file as text, then use the generateMonthly function to process the data.

See test.html for an example. 


Usage
==========
        
The daily object is returned with meta data (the station information) and the values.  The format is as follows:

    obj.meta = {
                 'station' :  //string
               }
               
    obj.data = {  
                  year :  {  
                             month : { 
                                        element : [ 
                                                    { 'value' :   , //integer
                                                      'mflag' :   , //string 
                                                      'qflag' :   , //string 
                                                      'sflag' :     //string  
                                                    }  
                                                  ]  //array of objects
                                      }
                          }
               }
               
The monthly object is returned with the values.  The format is as follows:
               
    obj = {  
            year :  {  
                      month : { 
                                [ ] //array of integers
                              }
                    }
          }
               
    
Examples
==========

<b>Accessing daily data from the .dly files :<b> 

When parsing the USC00010008.dly stored in the Data directory, these are some examples of the data which can be accessed.

<i>From <a href="https://github.com/dbetke/jsonify-climate-data/blob/master/data/USC00010008.dly#L2357">line 2357 of the data file</a></i>

    obj.meta['station'] //will return 'USC00010008'

    //December 1, 2010 precipitation data
    
    obj.data[2010][12]['PRCP'][0].value //will return 483
    obj.data[2010][12]['PRCP'][0].mflag //will return ''
    obj.data[2010][12]['PRCP'][0].qflag //will return ''
    obj.data[2010][12]['PRCP'][0].sflag //will return K


<b>Accessing raw monthly data from the .dat files :</b>

When parsing the USC00010008.prcp.dat stored in the Data directory, these are some examples of the data which can be accessed.


<i>From <https://github.com/dbetke/jsonify-climate-data/blob/master/data/USC00010008.prcp.dat#L1">line 1 of the data file</a></i>

    //July 2, 1948 value
    
    obj[1948][7][1] //will return 46

    

Additional Resources
==========

For information regarding how to read the climate data normals, including what the flags mean, reference NOAA's <a href="http://www1.ncdc.noaa.gov/pub/data/ghcn/daily/readme.txt">README</a> file.

