const balance = document.getElementById('balance'),
    moneyPlus = document.getElementById('money-plus'),
    moneyMinus = document.getElementById('money-minus'),
    listOfTransactions = document.getElementById('list'),
    form = document.getElementById('form'),
    textInput = document.getElementById('text'),
    amount = document.getElementById('amount');

    const dummyTransactions = [
        {id:1, text: "Flowers", amount: -30},
        {id:2, text: "Cards", amount: -55},
        {id:3, text: "Salary", amount: 500},
        {id:4, text: "Chocolates", amount: -120}
    ];

    let transactions = dummyTransactions;

    //add transactions
    function addTransaction(e){
        e.preventDefault();

        if (text.value.trim() === '' || amount.value.trim() === '') {
            alert('Please Enter Transaction');
        } else {
            const transaction = {
                id: generateID(),
                text: text.value,
                amount: +amount.value
            };

            //console.log(transaction);
            transactions.push(transaction);
            addTransactionDOM(transaction);
            updateBalances();
            text.value = '';
            amount.value = '';
        }
    }

//generate random id
function generateID(){
    // let id = 0
    
    // console.log(id);

    // return id += 1;

    return Math.floor(Math.random() * 200);
}

    // add to dom
    function addTransactionDOM(transaction){
        //get positive or negative
        const sign = transaction.amount < 0 ? '-' : '+';

        const item = document.createElement('li');

        // add class based on value
        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  
        item.innerHTML = `
            ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id}">x</button>
            `;
            listOfTransactions.appendChild(item);
            
    }

//remove from dom
function removeTransaction(transactionID){
    transactions = transactions.filter(transaction => transaction.id !== transactionID);

    init();
}

//update balances
function updateBalances(){
    const amounts = transactions.map(transaction => transaction.amount);
    //console.log(amounts);

    const amountsTotal = 
    amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    //console.log(amountsTotal);
    const income = amounts
    .filter(item => item > 0)
    .reduce((acc,item) => acc += item, 0)
    .toFixed(2);

    //console.log(income);

    const expense =
        Math.abs(
         amounts.filter(item => item < 0)
        .reduce((acc,item) => acc += item,0).toFixed(2)
        );
    //console.log(expense);

    balance.innerText =`R ${amountsTotal}`;
    moneyPlus.innerText = `R ${income}`;
    moneyMinus.innerText =`R ${expense}`;
        
}
    
//initialise app
function init(){
    listOfTransactions.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateBalances();
}

init();

//event listners

form.addEventListener('submit', addTransaction);
