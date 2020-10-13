const loginForm = document.getElementById("loginForm");
const loginDiv = document.getElementById("loginDiv");
const accountOutput = document.getElementById("accountDiv");

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let accountNumber = this.accountNumber.value;
    const data = {
        pass:this.pass.value
    }
    console.log(data)

    fetch("http://localhost:8080/account/login/?acc=" + accountNumber, { //Login request
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(response => { // Receive response
        console.log(response);
        return response.json(); // Convert response body to json
    }).then(data => { //json data from previous .then()
        console.log(data.firstName);
        this.reset();
        loginDiv.style.display = "none";
        accountOutput.innerHTML = '';
        //const name = data.firstName;
        const greeting = document.createElement("h1");
        greeting.className = "big-heading aligned";
        greeting.id = "subpagetitle";
        greeting.style.display = "block";
        greeting.innerText = "Hello " + data.firstName + "!";
        accountOutput.appendChild(greeting);
    }).catch(error => console.log(error));
});