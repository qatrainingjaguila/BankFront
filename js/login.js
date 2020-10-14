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
        renderAccount(data);
    }).catch(error => console.log(error));
});

function renderAccount(data){   //REFACTORING REQUIRED
    loginDiv.style.display = "none";
        accountOutput.innerHTML = '';

        /* Welcome message */
        const greeting = document.createElement("h1");
        greeting.className = "big-heading aligned";
        greeting.id = "subpagetitle";
        greeting.innerText = "Hello " + data.firstName + "!";
        accountOutput.appendChild(greeting);

        /* Balance */
        const showBalance = document.createElement("p");
        showBalance.className = "aligned formTitle";
        showBalance.innerText = "Balance: £" + data.balance;
        accountOutput.appendChild(showBalance);

         /* payment */
        const payTitle = document.createElement("h1");
        payTitle.className = "big-heading aligned";
        payTitle.id = "subpagetitle";
        payTitle.innerText = "Make a Payment";
        accountOutput.appendChild(payTitle);

        const paymentForm = document.createElement("form");
        paymentForm.className = "aligned";
        paymentForm.innerHTML = '';
        
        const payeeLabel = document.createElement("label");
        payeeLabel.htmlFor = 'payeeInput';
        payeeLabel.innerText = "Enter account no. of payee";
        paymentForm.appendChild(payeeLabel);

         /* input div */
        const newDiv = document.createElement('div');
        newDiv.innerHTML = '<input class="w-50 form-control loginput" id="payeeInput" name = "payee"/>';
        paymentForm.appendChild(newDiv);

        const amountLabel = document.createElement("label");
        amountLabel.htmlFor = 'amountInput';
        amountLabel.innerText = "Enter amount";
        paymentForm.appendChild(amountLabel);

        /* input div */
        const newDiv2 = document.createElement('div');
        newDiv2.innerHTML = '<input class="w-50 form-control loginput" id="amountInput" name = "amount"/>';
        paymentForm.appendChild(newDiv2);

        const payButton = document.createElement("button");
        payButton.className = "btn btn-lg btn btn-lg btn-light explore-button";
        payButton.type = "submit";
        payButton.innerText = "Pay";
        paymentForm.appendChild(payButton);

        paymentForm.addEventListener("submit", function (event){
            event.preventDefault();
            console.log(this.payee.value);
            console.log(this.amount.value);
            const payer = data.accountNumber; 
            const amount = this.amount.value;
            const payee = this.payee.value; //TODO:currently takes id, not accNo
            makePayment(accountNumber,amount,payee);
        })

        accountOutput.appendChild(paymentForm);

          /* Update Details */
          const updateTitle = document.createElement("h1");
          updateTitle.className = "big-heading aligned";
          updateTitle.id = "subpagetitle";
          updateTitle.innerText = "Update Details";
          accountOutput.appendChild(updateTitle);
  
          const updateForm = document.createElement("form");
          updateForm.className = "aligned";
          updateForm.innerHTML = '';
          
          const firstNameLabel = document.createElement("label");
          firstNameLabel.htmlFor = 'updateFirstNameInput';
          firstNameLabel.innerText = "First Name:";
          updateForm.appendChild(firstNameLabel);
  
           /* input div */
          const newDiv3 = document.createElement('div');
          newDiv3.innerHTML = '<input class="w-50 form-control loginput" id="updateFirstNameInput" name = "firstName"/>';
          updateForm.appendChild(newDiv3);
  
          const lastNameLabel = document.createElement("label");
          lastNameLabel.htmlFor = 'updateLastNameInput';
          lastNameLabel.innerText = "Last Name:";
          updateForm.appendChild(lastNameLabel);
  
          /* input div */
          const newDiv4 = document.createElement('div');
          newDiv4.innerHTML = '<input class="w-50 form-control loginput" id="updateLastNameInput" name = "lastName"/>';
          updateForm.appendChild(newDiv4);

         /* TODO: UPDATE BALANCE - ALTER TO USE DROPDOWN OPTIONS */
          const newBalanceLabel = document.createElement("label");
          newBalanceLabel.htmlFor = 'updateBalanceInput';
          newBalanceLabel.innerText = "Update Balance:";
          updateForm.appendChild(newBalanceLabel);
  
          /* input div */
          const newDiv5 = document.createElement('div');
          newDiv5.innerHTML = '<input class="w-50 form-control loginput" id="updateBalanceInput" name = "newBalance"/>';
          updateForm.appendChild(newDiv4);
  
          const updateButton = document.createElement("button");
          payButton.className = "btn btn-lg btn btn-lg btn-light explore-button";
          payButton.type = "submit";
          payButton.innerText = "Update details";
          updateForm.appendChild(payButton);
  
          updateForm.addEventListener("submit", function (event){
              event.preventDefault();
              console.log(this.firstName.value);
              console.log(this.lastName.value);
              const newFirstName = this.firstName.value
              const newLastName = this.lastName.value
              const newBalance = this.newBalance.value;
              updateAccount(newFirstName,newLastName,newBalance,data.id); //TODO
          })

    }

    function makePayment(accountNumber,amount,payee){
        const dataBody = {
            userId:accountNumber.value,   //TODO: in spring refers to id not accNo
            amount:amount.value,
            recipientId:payee.value
        }

        fetch("http://localhost:8080/payment/createPayment",{
            method:"POST",
            body: JSON.stringify(dataBody),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(response=>{
            console.log(response);
        }).catch(error=>console.error(error));

        }

        /*  CURRENT BACKEND TAKES IN ID  */
    function updateAccount(newFirstName,newLastName,newBalance,id){
        const data = {
            firstName:newFirstName.value,
            lastName:newLastName.value,
            balance:newBalance.value
        }
        fetch("http://localhost:8080/account/updateAccount/?id=" + id,{
            method:"PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
            }
            }).then(response=>{
                console.log(response);
                renderAccount(data);
            }).catch(error=>console.error(error));
        } //dev test
    
    