const createForm = document.getElementById("createForm");
const modalBody = document.querySelector(".modal-body");


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
        console.log(data.accountNumber);
        modalBody.innerHTML = '';
        const bespokeMessage = document.createElement("p");
        bespokeMessage.innerText = "Your account number is " + data.accountNumber;
        const warningMessage = document.createElement("p");
        warningMessage.innerText = "You will use this to login";
        modalBody.appendChild(bespokeMessage);
        modalBody.appendChild(warningMessage);
        this.reset();        
    }).catch(error => console.log(error));
});
