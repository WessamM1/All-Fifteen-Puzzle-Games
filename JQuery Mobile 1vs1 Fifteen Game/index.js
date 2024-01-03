

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);


    function onDeviceReady() {
        $('[data-role="myComponent"]').myComponent();

        $("#myComp0").myComponent ("Initialize", 0);
        $("#myComp1").myComponent ("Initialize", 1);
    };

    function WonGame(index) {
        var str = "#result_" + index;
        var temp = $(str).html();
        temp++;
        $(str).html(temp)

        $("#myComp0").myComponent("shuffle", 0);
        $("#myComp1").myComponent("shuffle", 1);
    }

    $('[data-role="content"]').on("won", function (event, currGameIndex) {
        WonGame(currGameIndex);
    });


    $(window).on('orientationchange', function (e) {
        var orientation = window.orientation;
        switch (orientation) {
            case 90: case -90:
                $("#myComp1").css("left", "340px");
                $("#myComp1").css("top", "60px");
                break;
            case 0: case 180:
                $("#myComp1").css("left", "20px");
                $("#myComp1").css("top", "380px");
        }
    });

    $.widget("ABCD.myComponent",
        {
            options: {
                IndexEmpty: -1,
                GameIndex: -1
            },
            getOptions: function () {
                return {
                    IndexEmpty: this.options.IndexEmpty,
                    GameIndex: this.options.GameIndex
                };
            },

            setIndexEmpty: function (IndexEmpty) {
                this.options.IndexEmpty = IndexEmpty;
            },

            Initialize: function (GameIndex) {
                var elem = this.element;

                for (var i = 0; i < 15; i++) {
                    var myButton = $("<button class='buttonAbsolutePosition'></button>");

                    myButton.attr('id', i + GameIndex * 100);
                    myButton.css({
                        "top": Math.floor(i / 4) * 70 + "px",
                        "left": (i % 4) * 70 + "px"
                    });
                    myButton.click(this.myClick);
                    myButton.appendTo(elem);
                }
                this.shuffle(GameIndex);
            },


            shuffle: function (GameIndex) {
                
                var array = new Array();

                for (var j = 0; j < 15; j++) {
                    array[j] = j + 1;
                }
                array[15] = -1;

                for (var ii = 14; ii > 0; ii--) {
                    var rnd = Math.floor(Math.random() * ii);
                    var tmp = array[ii];
                    array[ii] = array[rnd];
                    array[rnd] = tmp;
                }

                for (var i = 0; i < 15; i++) {
                    var str = "#" + (i + GameIndex * 100);

                    var R = 100 + Math.floor(Math.random() * 155);
                    var G = 100 + Math.floor(Math.random() * 155);
                    var B = 100 + Math.floor(Math.random() * 155);
                    $(str).css("background-color", "rgb(" + R + "," + G + "," + B + ")");

                    $(str).text(array[i].toString());
                    $(str).attr('tabindex', i);

                    var row = Math.floor(i / 4);
                    var column = i % 4;

                    $(str).css("left", 10 + column * 70);
                    $(str).css("top", 10 + row * 70);
                }

                this.options.IndexEmpty = 15;
                this.options.GameIndex = GameIndex;

            },

            myClick: function (e) {
                console.log("aaaaa");
                var allOptions = $(this).parent().myComponent("getOptions");
                var currTabIndex = e.target.tabIndex;

                var i1 = currTabIndex % 4;
                var j1 = currTabIndex / 4;
                if (j1 != 0)
                    j1 = Math.floor(j1);
                console.log("bbbbb");
                var i2 = allOptions.IndexEmpty % 4;
                var j2 = allOptions.IndexEmpty / 4;
                if (j2 != 0)
                    j2 = Math.floor(j2);
                console.log("ccccc");
                if (Math.abs(i1 - i2) + Math.abs(j1 - j2) == 1) {
                    if (i1 > i2)
                        $(this).animate({ left: '-=70', }, 200);
                    if (i1 < i2)
                        $(this).animate({ left: '+=70', }, 200);
                    if (j1 > j2)
                        $(this).animate({ top: '-=70', }, 200);
                    if (j1 < j2)
                        $(this).animate({ top: '+=70', }, 200);

                    console.log("asdasd");
                    $(this).attr('tabindex', allOptions.IndexEmpty);
                    $(this).parent().myComponent("setIndexEmpty", currTabIndex);
                }
                setTimeout(function () {
                    var counter = 1;
                    var counter1 = 1;
                    while (counter <= 2 && counter1 <= 2) {
                        for (var i = 0; i < 15; i++) {
                            var str = "#" + (i + allOptions.GameIndex);
                            var str1 = "#" + (100+ i + allOptions.GameIndex);

                            if ($(str).text() == counter && $(str).attr('tabindex') == counter - 1) { 
                                counter++;
                                break;
                            }
                            if ($(str1).text() == counter1 && $(str1).attr('tabindex') == counter1 - 1) {
                                counter1++;
                                break;
                            }
                        }

                        if (i == 15)
                            return;
                    }
                    $('[data-role="content"]').trigger("won", [allOptions.GameIndex]);
                }, 250);
            }
        });
})();
