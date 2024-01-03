const WebSocket = require('ws');
const port = 5000;
const wsServer = new WebSocket.Server({ port: port });
wsServer.on('connection', function connection(ws) {
    console.log("wsClient connected");
    ws.on('message', function incoming(message) {
        wsServer.clients.forEach(function (client) {
            let temp = JSON.parse(message);
            if (temp.action == "shuffle") {
                var Arr = new Array();
                for (var i = 0; i < 15; i++) {
                    Arr[i] = i + 1;
                }
                Arr[15] = -1;
                for (var j = 14; j > 0; j--) {
                    var R = Math.floor(Math.random() * j);
                    var ttemp = Arr[j];
                    Arr[j] = Arr[R];
                    Arr[R] = ttemp;
                }
                var arrTextAndColor = new Array(15);
                for (var x = 0; x < 15; x++) {
                    arrTextAndColor[x] = new Object();
                    arrTextAndColor[x].str = Arr[x];
                    arrTextAndColor[x].R = 150 + Math.floor(Math.random() * 105);
                    arrTextAndColor[x].G = 150 + Math.floor(Math.random() * 105);
                    arrTextAndColor[x].B = 150 + Math.floor(Math.random() * 105);
                }
                let JsonObj = {
                    action: "shuffle",
                    arrTextAndColor: arrTextAndColor
                };
                client.send(JSON.stringify(JsonObj));
            }
            if (temp.action == "whereTo") {
                var indexEmpty = temp.indexEmpty;
                var TextAndColorEmpty = temp.TextAndColorEmpty;
                var indexPushed = temp.indexPushed;
                var TextAndColorPushed = temp.TextAndColorPushed;
                var backColorPushed = temp.backColorPushed;
                var arr_backColor_Pushed = backColorPushed.split(",");
                var backColorEmpty = temp.backColor_Empty;
                var arr_backColor_Empty = backColorEmpty.split(",");
                var i1 = indexPushed % 4;
                var j1 = indexPushed / 4;
                if (j1 != 0)
                    j1 = Math.floor(j1);
                var i2 = indexEmpty % 4;
                var j2 = indexEmpty / 4;
                if (j2 != 0)
                    j2 = Math.floor(j2);
                let messagee;
                let backcolorarray = colorAVG(arr_backColor_Pushed, arr_backColor_Empty);
                if (Math.abs(i1 - i2) + Math.abs(j1 - j2) == 1) {
                    messagee = {
                        action: "whereTo",
                        MoveOrNot: "Yes",
                        arr_backcolor: backcolorarray,
                        indexPushed: indexPushed
                    };
                }
                else {
                    messagee = {
                        action: "whereTo",
                        MoveOrNot: "No",
                        arr_backcolor: backcolorarray,
                        indexPushed: indexPushed
                    };
                }
                client.send(JSON.stringify(messagee));
            }
            if (temp.action == "gameOver") {
                var b1 = temp.b1;
                var b2 = temp.b2;
                let m;
                if (b1 == "1" && b2 == "2") {
                    m = {
                        action: "gameOver",
                        IsOver: "Yes"
                    };
                }
                else {
                    m = {
                        action: "gameOver",
                        IsOver: "No"
                    };
                }
                client.send(JSON.stringify(m));
            }
        });
    });
});
function colorAVG(pushedcolor, backgroundColor) {
    let arr = [0, 0, 0];
    arr[0] = Math.floor((parseInt(pushedcolor[0]) + parseInt(backgroundColor[0])) / 2);
    arr[1] = Math.floor((parseInt(pushedcolor[1]) + parseInt(backgroundColor[1])) / 2);
    arr[2] = Math.floor((parseInt(pushedcolor[2]) + parseInt(backgroundColor[2])) / 2);
    return arr;
}
console.log('WebSocket server is listening on localhost:' + port);
//# sourceMappingURL=server.js.map