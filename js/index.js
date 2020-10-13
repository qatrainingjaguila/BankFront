const createForm = document.getElementById("createForm");
const loginForm = document.getElementById("loginForm");
const accountOutput = document.getElementById("accountDiv");
const loginDiv = document.getElementById("loginDiv");

createForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        balance: this.balance.value,
        pass:this.pass.value
    }

    fetch("http://localhost:8080/account/createAccount", { //Make request
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(response => { // Receive response
        return response.json(); // Convert response body to json
    }).then(data => { //json data from previous .then()
        this.reset();        
    }).catch(error => console.log(error));
});

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
        console.log(data);
        this.reset();
        loginDiv.style.display = "none";
    }).catch(error => console.log(error));
});