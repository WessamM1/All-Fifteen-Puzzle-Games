import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
} from "react-native";

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 17000000)
        .toString(16)
        .padStart(6, "0");
    return `#${randomColor}`;
};

const initAnimatedValues = [
    new Animated.ValueXY({ x: 0, y: 0 }),
    new Animated.ValueXY({ x: 60, y: 0 }),
    new Animated.ValueXY({ x: 120, y: 0 }),
    new Animated.ValueXY({ x: 180, y: 0 }),
    new Animated.ValueXY({ x: 0, y: 60 }),
    new Animated.ValueXY({ x: 60, y: 60 }),
    new Animated.ValueXY({ x: 120, y: 60 }),
    new Animated.ValueXY({ x: 180, y: 60 }),
    new Animated.ValueXY({ x: 0, y: 120 }),
    new Animated.ValueXY({ x: 60, y: 120 }),
    new Animated.ValueXY({ x: 120, y: 120 }),
    new Animated.ValueXY({ x: 180, y: 120 }),
    new Animated.ValueXY({ x: 0, y: 180 }),
    new Animated.ValueXY({ x: 60, y: 180 }),
    new Animated.ValueXY({ x: 120, y: 180 }),
];

const values = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,
];

let anotherBoard = [];

export default function App() {
    const [board, setBoard] = useState([]);
    const [animationValues, setAniVals] = useState(initAnimatedValues);
    const [toVALUE, setToValue] = useState({ x: 180, y: 180 });
    const [toInd, setInd] = useState(15);
    const colorat = useState(Array.from({ length: 16 }, () => generateColor()))[0];

    useEffect(() => {
        reINIT();
    }, []);

    const reINIT = () => {
        const shuffled = shuffle(values);
        setBoard(shuffled);
        setAniVals(initAnimatedValues);
        setToValue({ x: 180, y: 180 });
        setInd(15);
        anotherBoard = [...shuffled];
    };

    const animateButton = (i, value) => {
        console.log(value);
        if (anotherBoard[0] === 1 && anotherBoard[1] === 2) {
            console.log("success");
            if (confirm("You Won!, One More game??!")) {
                reINIT();
            }   
        }

        const wentRight: boolean = animationValues[i].x._value + 60 == toVALUE.x && animationValues[i].y._value == toVALUE.y;
        const wentLeft: boolean = animationValues[i].x._value - 60 == toVALUE.x && animationValues[i].y._value == toVALUE.y;
        const wentDown: boolean = animationValues[i].y._value + 60 == toVALUE.y && animationValues[i].x._value == toVALUE.x;
        const wentUp: boolean = animationValues[i].y._value - 60 == toVALUE.y && animationValues[i].x._value == toVALUE.x;
       

         console.log("i: "+i);
        // console.log("before arr[i]: "+anotherBoard[i]);
        // console.log("arr[i+1]: "+anotherBoard[i+1]);
        // console.log("arr[i+4]: "+anotherBoard[i+4]);

        if (wentRight || wentLeft || wentDown || wentUp) {

            if (wentRight) {
                const temp = anotherBoard[i + 1];
                anotherBoard[i + 1] = anotherBoard[i];
                anotherBoard[i] = temp;
            }
            else if (wentLeft) {
                const temp = anotherBoard[i-1];
                anotherBoard[i-1] = anotherBoard[i];
                anotherBoard[i] = temp;
              } else if (wentUp) {
                const temp = anotherBoard[i-4];
                anotherBoard[i-4] = anotherBoard[i];
                anotherBoard[i] = temp;
              } else if (wentDown) {
                const temp = anotherBoard[i + 4];
                anotherBoard[i + 4] = anotherBoard[i];
                anotherBoard[i] = temp;
              }
            // console.log("============================");
            // console.log("i: "+i);
            // console.log("after arr[i]: "+anotherBoard[i]);
            
            // console.log("arr[i+1]: "+anotherBoard[i+1]);
            // console.log("arr[i+4]: "+anotherBoard[i+4]);
            
            Animated.timing(animationValues[i], {
                toValue: toVALUE,
                duration: 200,
                useNativeDriver: false,
            }).start();
            setInd(i);
            //i= anotherBoard.indexOf(value);
            setToValue({
                x: animationValues[i].x._value,
                y: animationValues[i].y._value,
            });
            
        }
        console.log(anotherBoard);
        // console.log("============================");
        // console.log("============================");
        //console.log("============================");
    };

    const shuffle = (array) => {
        var currentIndex = array.length - 1,
            temporaryValue,
            randomIndex;

        
        while (0 !== currentIndex) {
            
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    return (
        <View style={styles.container}>
            {board.map((n, i) =>
                i !== 15 ? (
                    <Animated.View
                        style={{
                            position: "absolute",
                            width: 60,
                            height: 60,
                            top: animationValues[i].y,
                            left: animationValues[i].x,
                        }}
                        key={i}

                    >
                        <TouchableOpacity
                            style={[styles.myButtons, { backgroundColor: colorat[i] }]}
                            
                            onPress={(e) => animateButton(i,n)}
                        >
                            <Text>{n}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : null
            )}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    myButtons: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
