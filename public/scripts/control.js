let error = document.querySelector(".error");

document.querySelector(".custom-btn1").addEventListener("click",function (event){
    let val = Number(document.querySelector("#date").value);
    if(typeof(val) === "number" && val >= 1 && val <= 31) {
        
        error.style.display = "none"
    } else {
        event.preventDefault();
        console.log("incorrect")
        error.style.display = "block"
    }
})