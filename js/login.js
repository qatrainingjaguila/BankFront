const loginForm = document.getElementById("loginForm");
const loginDiv = document.getElementById("loginDiv");

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