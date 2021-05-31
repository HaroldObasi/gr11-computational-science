document.querySelector(".custom-btn1").addEventListener("click", function(event){
    event.preventDefault()
    let error = document.querySelector(".error"); 
    let num = Number(document.querySelector("#num").value);
    iteration = document.querySelector("#iteration");

    iteration.innerHTML = ""

    if(num < 1){
        error.style.display = "block"
    }else{
        iteration.style.display = "block"
        k0 = 0;
        e = 0.0005;
        k1 = num;

        x = true;
        count = 1
        while(x){
            
            var text = document.createElement("DIV");
            

            k0 = (k1 + (num/k1))/2;
            k1 = k0

            x = Math.abs((num - k0**2)) > e;
            text.innerHTML = "Iteration "+count + " is "+ k0;
            text.classList.add("form-label")

            document.getElementById("iteration").appendChild(text);

            console.log(k0);
            console.log("x is: "+ x)
            count += 1
        }

        text.innerHTML = "The final answer is "+ k1;
        error.style.display = "none"; 
        num = ""
    }

})

document.querySelector("#num").value = ""