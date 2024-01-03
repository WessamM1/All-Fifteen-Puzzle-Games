
'use strict';
var port = process.env.port || 1337;
var express = require('express');
var app = express();

var cors = require("cors");
app.use(cors());

var bodyParser = require('body-parser')
app.use(bodyParser.json());

function shuffle() {
    var myArr = new Array();
    for (var j = 0; j < 15; j++) {
        myArr[j] = j + 1;
    }
    myArr[15] = -1;

    for (var ii = 14; ii > 0; ii--) {
        var rnd = Math.floor(Math.random() * ii);
        var tmp = myArr[ii];
        myArr[ii] = myArr[rnd];
        myArr[rnd] = tmp;
    }

    var arrTextAndColor = new Array(15);
    for (var i = 0; i < 15; i++) {
        arrTextAndColor[i] = new Object();
        arrTextAndColor[i].str = myArr[i];

        arrTextAndColor[i].R = 100 + Math.floor(Math.random() * 155);
        arrTextAndColor[i].G = 100 + Math.floor(Math.random() * 155);
        arrTextAndColor[i].B = 100 + Math.floor(Math.random() * 155);
    }
    var resultJsonString = JSON.stringify(arrTextAndColor);
    return resultJsonString;
}


app.get('/', function (request, response) {
    response.end();
});

app.post('/shuffle', function (request, response) {
    var result = shuffle();
    response.send(result.toString());
});

app.post('/myClick', function (request, response) {

    console.log(request);

    var indexPushed = request.body.indexPushed;

    var TextAndColorPushed = request.body.TextAndColorPushed;
    var indexEmpty = request.body.indexEmpty;
    var TextAndColorEmpty = request.body.TextAndColorEmpty;

    //var returnTextAndColor = new Object();
    //returnTextAndColor.str ;
    //returnTextAndColor.R = "; returnTextAndColor.G = "; returnTextAndColor = ";

    var returnTextAndColor = {
        str: '',
        R: '',
        G: '',
        B: ''
    };

    var i1 = indexPushed % 4;
    var j1 = indexPushed / 4;
    if (j1 != 0)
        j1 = Math.floor(j1);


    var i2 = indexEmpty % 4;
    var j2 = indexEmpty / 4;
    if (j2 != 0)
        j2 = Math.floor(j2);


    if (Math.abs(i1 - i2) + Math.abs(j1 - j2) == 1) {
        returnTextAndColor.R = Math.floor((TextAndColorPushed.R + TextAndColorEmpty.R) / 2);
        returnTextAndColor.G = Math.floor((TextAndColorPushed.G + TextAndColorEmpty.G) / 2);
        returnTextAndColor.B = Math.floor((TextAndColorPushed.B + TextAndColorEmpty.B) / 2);

        if (i1 > i2)
            returnTextAndColor.str = "Left";
        if (i1 < i2)
            returnTextAndColor.str = "Right";
        if (j1 > j2)
            returnTextAndColor.str = "Up";
        if (j1 < j2)
            returnTextAndColor.str = "Down";
    }
    else
        returnTextAndColor.str = "Error";
    var resultJsonString = JSON.stringify(returnTextAndColor);
    response.send(resultJsonString.toString());
});

app.post('/myCheck', function (request, response) {

    var counter = 1;
    var i;
    var result = "true";


    while (counter <= 2) {
        for (i = 0; i < 15; i++) {
            var tempStr = request.body[i].str;
            var tempTabIndex = request.body[i].tabIndex;
            

            if (tempStr == counter.toString() && tempTabIndex.toString() == counter.toString() - 1) {
                counter++;
                break;
            }
        }
        if (i == 15) {
            result = "false";
            break;
        }
    }
    response.send(result);

});


app.listen(port);
console.log('Server running on port ' + port);
