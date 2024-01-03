package main

import (
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"strconv"
)

var parsedData struct {
	BackColorPushed    string
	BackColorEmpty     string
	IndexPushed        int
	TextAndColorPushed TextAndColor
	IndexEmpty         int
	TextAndColorEmpty  TextAndColor
}

type TextAndColor struct {
	Str string
	R   int
	G   int
	B   int
}

type IndexPushEmptyTextAndColor struct {
	IndexPushed        int
	TextAndColorPushed TextAndColor
	IndexEmpty         int
	TextAndColorEmpty  TextAndColor
}

type TextAndTabIndex struct {
	Text     string
	TabIndex int
}

func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Content-Type", "application/json")
}

func Shuffle(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	var Arr [15]int
	for i := 0; i < 15; i++ {
		Arr[i] = i + 1
	}

	for i := 14; i > 0; i-- {
		tmpR := rand.Intn(i)
		tmp := Arr[i]
		Arr[i] = Arr[tmpR]
		Arr[tmpR] = tmp
	}
	var TextAndColorArr []TextAndColor
	for i := 0; i < 15; i++ {
		tmpStr := strconv.Itoa(Arr[i])
		tmpR := 150 + rand.Intn(156)
		tmpG := 150 + rand.Intn(156)
		tmpB := 150 + rand.Intn(156)

		TextAndColorArr = append(TextAndColorArr, TextAndColor{Str: tmpStr, R: tmpR, G: tmpG, B: tmpB})
	}
	res, _ := json.Marshal(TextAndColorArr)
	io.WriteString(w, string(res))
}

func MyClick(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	body, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Println(err)
	}

	var data struct {
		BackColorPushed    string
		BackColorEmpty     string
		IndexPushed        int
		TextAndColorPushed TextAndColor
		IndexEmpty         int
		TextAndColorEmpty  TextAndColor
	}

	err = json.Unmarshal(body, &data)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}

	indexPushed := data.IndexPushed
	indexEmpty := data.IndexEmpty
	i1 := indexPushed % 4
	i2 := indexEmpty % 4
	j1 := indexPushed / 4
	j2 := indexEmpty / 4

	var resTextAndColor = new(TextAndColor)
	if Abs(i1-i2)+Abs(j1-j2) != 1 {
		resTextAndColor.Str = "nothing"
	} else {

		if j1 < j2 {
			resTextAndColor.Str = "Down"
		}
		if j1 > j2 {
			resTextAndColor.Str = "Up"
		}
		if i1 < i2 {
			resTextAndColor.Str = "Right"
		}
		if i1 > i2 {
			resTextAndColor.Str = "Left"
		}
	}
	fmt.Printf(resTextAndColor.Str + "\n")
	ToMove := resTextAndColor.Str

	res, _ := json.Marshal(ToMove)
	io.WriteString(w, string(res))
}

func main() {
	http.HandleFunc("/Shuffle", Shuffle)
	http.HandleFunc("/MyClick", MyClick)
	http.ListenAndServe(":3333", nil)
}
