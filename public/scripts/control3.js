class Student {
    name = "";
    course = "Mathematics";
    
    constructor(name, cgpa, score){
        this.name = name;
        this.cgpa = cgpa;
        this.score = score;
    }
}

const studentList = [];

document.querySelector(".custom-btn1").addEventListener("click", function(event){
    event.preventDefault()
    
    let error = document.querySelector(".error");

    condition1 = (document.querySelector("#fullName").value === "" || 
    document.querySelector("#score").value === "" || 
    document.querySelector("#cgpa").value === "")

    console.log(condition1)
    // let fname = document.querySelector("#fullName").value;
    // let score = parseInt(document.querySelector("#score").value, 10);
    // let cgpa = parseInt(document.querySelector("#cgpa").value, 10);

    if (condition1){
        error.style.display = "block"
    }else if (condition1 === false){
        let fname = document.querySelector("#fullName").value;
        let score = parseInt(document.querySelector("#score").value, 10);
        let cgpa = parseInt(document.querySelector("#cgpa").value, 10);
        studentList.push(new Student(fname, cgpa, score));

        document.querySelector("#fullName").value = "";
        document.querySelector("#score").value = "";
        document.querySelector("#cgpa").value = "";

        PrintAll(studentList);
        error.style.display = "none"
    }

    // let fname = document.querySelector("#fullName").value;
    // let score = parseInt(document.querySelector("#score").value, 10);
    // let cgpa = parseInt(document.querySelector("#cgpa").value, 10);
    // studentList.push(new Student(fname, cgpa, score));

    // document.querySelector("#fullName").value = "";
    // document.querySelector("#score").value = "";
    // document.querySelector("#cgpa").value = "";

    // PrintAll(studentList);
});

function averageScore(list){
    let {score: sum} = list.reduce((acc, curr) => ({score: acc.score + curr.score}))
    return(sum/list.length)
}

function standardDeviation(list){
    // const mean = averageScore(list);
    // const reducer = (acc, curr) => {acc + ((curr.score - mean)**2)};
    // let {score: val} = list.reduce((acc, curr) => ({score: acc.score + ((curr.score - mean)**2)}))
    // console.log(val)
    // return Math.sqrt(val/list.length - 1);
    let numerator = 0;
    let mean = averageScore(list);
    let length = list.length
    list.forEach(e=>{
        numerator = numerator + (e.score - mean)**2;
    })
    return Math.sqrt(numerator/length - 1);
}

document.querySelector("#pass").addEventListener("click", function(event){
    event.preventDefault()

    // let mean = averageScore(studentList);
    PrintPass(studentList,averageScore(studentList));
})

function PrintPass(list, mean){
    document.querySelector(".list-header").innerText = "LIST OF STUDENTS THAT PASSED";
    let ListElem = document.querySelector(".list");
    ListElem.innerHTML = "";
    
    list.forEach(e => {
        let passItem = document.createElement("li");
        passItem.innerHTML = `${e.name} has ${(e.score >= mean) ? "Passed" : "Failed"}`;
        ListElem.appendChild(passItem);
    });
}

function PrintAll(list){
    document.querySelector(".message").innerText = "Student Data Submitted";
    setTimeout(function(){
        document.querySelector(".message").innerText = "";
    }, 3000);
    document.querySelector(".list-header").innerText = "STUDENT LIST";

    let ListElem = document.querySelector(".list");
    ListElem.innerHTML = "";

    list.forEach(e => {
        let student = document.createElement("li");
        student.innerHTML = `NAME: ${e.name},   SCORE:${e.score}`;
        ListElem.appendChild(student);
    });
}

function grade(list){
    const mean = averageScore(list);
    const std = standardDeviation(list);

    console.log(`the average is ${mean}, the std is ${std}`)

    document.querySelector(".list-header").innerText = "STUDENTS SCORES AND GRADES";
    let gradeList = document.querySelector(".list");
    gradeList.innerHTML = "";
    list.forEach(e=>{
        let grading = document.createElement("li")
        let grade = "";
        if (e.score < mean) {
            grade = "F"
        }else if(e.score === mean){
            grade = "D"
        }else if(e.score > mean && e.score < (mean + std)){
            grade = "C"
        }else if(e.score > (mean + std) && e.score < (mean + 2 * std)){
            grade = "B"
        }else if(e.score === (mean + 2 * std)){
            grade = "A"
        }
        grading.innerHTML = `NAME: ${e.name}, GRADE: ${grade}`;
        gradeList.appendChild(grading);

        console.log(`${e.name} got ${e.score} : ${grade}`);
    });
}

document.querySelector("#grade").addEventListener("click", function(event){
    event.preventDefault()
    grade(studentList)
})