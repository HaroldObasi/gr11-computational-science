const express = require("express");
const bodyParser = require("body-parser")

const port = process.env.PORT || 3001

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

let password = ""

app.get("/", (req, res) => {
    res.sendFile(__dirname+ "/home.html");
    
})


app.get("/passGen", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});


app.post("/passGen", (req, res) => {
    name  = req.body.name;
    day = req.body.date;

    day = parseInt(day, 10);

    if (day > 31 || day <= 0){
        
        res.redirect("/passGen");
    }
    // =====================================================================================================
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const noLetters = letters.length;
    var count = 0;

    const daysInMonth = 31
    
    function findLetterPos(letter){
        letter = letter.toLowerCase();
        var count = 0;

        while(count < noLetters){
            if (letters[count] === letter){
                break;
            } else{
                count += 1
            }
        }
    return(count+1);
    }

    function wordToNum(word){
        word = word.toLowerCase();
        var wordLength = word.length;

        
        var index = 0;
        var active ;
        var posString = [];

        while(index < wordLength){
            var active = word[index]
            posString.push(findLetterPos(active));
            index++
        }
    return(posString)
    }

    var sum = wordToNum(name).reduce(function(a, b){
        return a + b;
    }, 0);

    // const subday = 31 - day;

    function lastTwoDigits(sum){
        sum = sum.slice(sum.length - 2);
        return sum;
    }

    if(sum > 99){
        sum = sum.toString(10)
        sum = lastTwoDigits(sum)
    }else if(sum < 10){
        sum = sum.toString(10)
        sum = "0"+sum
    }

    var subday = 31 - day;
    if(subday < 9){
        subday = subday.toString(10);
        subday = "0"+subday
    }

    console.log(typeof subday)
    password = sum.toString(10)+subday.toString(10)
    res.redirect("/success")
})

app.get("/password", (req, res) => {
    res.json({ password: `${password}` });
})

app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/success.html")
})

app.get("/sqr", (req, res) => {
    res.sendFile(__dirname + "/sqr.html")
})

app.post("/sqr", (req, res) => {

})

app.get("/studentScores", (req, res) => {
    res.sendFile(__dirname + "/student.html")
})




app.listen(port, () => {
    console.log("app started on port 3001")
})