const createForm = document.getElementById("createForm");

createForm.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(this.name);
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
        //renderDucks();
        this.reset();
    }).catch(error => console.log(error));
});