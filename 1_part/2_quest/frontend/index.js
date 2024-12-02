var user_input = document.getElementById("user_input")
var pass_input = document.getElementById("pass_input")
var login_button = document.getElementById("login_button")


// function สำหรับ fetch backend
async function fetch_backend(obj, route){
    let fullPath = "http://localhost:3000" + route;
    const response = await fetch(fullPath,{
            method: 'POST', 
            headers: { 'Content-Type' : "application/json"},
            body: JSON.stringify(obj),
    });
    const json = await response.json();
    //console.log(json)
    return json
}

//event listener สำหรับปุ่ม login 
login_button.addEventListener("click", async function(){
    let username = user_input.value;
    let password = pass_input.value;
    if (username == '' || password == ''){
        alert("Please enter your username and password");
        return
    }
    const userObj = {
        "username" : username,
        "password" : password.toString()
    }
    const res = await fetch_backend(userObj, "/login")
    if (res.status == "success"){
        alert("login successfully")
    }else if(res.status == "error"){
        alert("login fail, error")
    }else{
        alert("Error with backend server")
    }
    console.log(res)

})