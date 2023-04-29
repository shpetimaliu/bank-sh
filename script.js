'use strict';

const account1 = {
  owner: 'Shpetim Aliu',
  movements: [5612, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2020-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2021-05-27T17:01:17.194Z',
    '2022-07-11T23:36:17.929Z',
    '2022-07-27T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'xk-KS', // xk-KS
};

const account2 = {
  owner: 'ShputZz K. Aliu',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  
  movementsDates: [
    '2020-11-18T21:31:17.178Z',
    '2020-12-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2022-07-11T23:36:17.929Z',
    '2022-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'xk-KS', // xk-KS
};

const account3 = {
  owner: 'Shpeta B. Aliu',
  movements: [200, -20, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2020-02-18T21:31:17.178Z',
    '2020-07-23T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-03-01T10:17:24.185Z',
    '2021-07-08T14:11:59.604Z',
    '2022-03-27T17:01:17.194Z',
    '2022-05-11T23:36:17.929Z',
    '2022-09-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'xk-KS', // xk-KS
};

const account4 = {
  owner: 'Shpetim N. Aliu',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-10-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2021-01-01T10:17:24.185Z',
    '2021-01-08T14:11:59.604Z',
    '2022-02-27T17:01:17.194Z',
    '2022-03-11T23:36:17.929Z',
    '2022-08-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'xk-KS', // xk-KS
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const formatMovmentDate = function(date){
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    
    const daysPassed = calcDaysPassed(new Date(), date);

    if(daysPassed === 0) return 'Today';
    if(daysPassed === 1) return 'Yesterday';
    if(daysPassed <= 7) return `${daysPassed} days ago`;
    else{
      const day = `${date.getDate()}`.padStart(2, 0);
      const month = `${date.getMonth() + 1}`.padStart(2, 0);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } 
};


// Shfaqja e pagesav pranimit dhe terheqjes se parave

const displayMovements = function (acc, sort = false){
  containerMovements.innerHTML = '';

  const movs = sort
  ? acc.movements.slice().sort((a, b) => a - b)
  : acc.movements;



  movs.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovmentDate(date);
    

    const html = `   
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
    `


    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


const calcDisplayBalence = function(acc) {
  acc.balance  = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`
};
/////////////////////////////////////
const calcDisplaySummary = function(acc){
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate/100).filter((int, i, arr) => {
    return int >= 1;
  }).reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};


const createUsername = function (accs) {
accs.forEach(function (acc) {
  acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
}); 
};

createUsername(accounts);


const updateUI = function(acc) {
     // Display movements
     displayMovements(acc);

     // Display Balance
     calcDisplayBalence(acc);
  
     // Display summary
     calcDisplaySummary(acc);
  
};

const startLogOutTimer = function(){
    const tick = function(){
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

   

    if(time === 0){
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };

  let time = 600; 

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};




// Event handler
let currentAccount, timer; 

btnLogin.addEventListener('click', function(e)  {
  // Prevent form from submitting - Parandaloni paraqitjen e formularit
  
  e.preventDefault();
  
   currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

   if(currentAccount.pin === +(inputLoginPin.value)){

    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    
    // Create current date and time 
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;



    // Clear input fields 
   inputLoginUsername.value = inputLoginPin.value = '';
   inputLoginPin.blur();

    if(timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI 
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});


btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = +(inputTransferAmount.value);
  const reciverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && reciverAcc && currentAccount.balance >= amount && reciverAcc?.username !== currentAccount.username) {
  
    //  Doing the transfer 
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAcc.movementsDates.push(new Date().toISOString());


    // Update UI 
    updateUI(currentAccount);


  };
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = +(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
   setTimeout(function(){ 
    // Add movement
    currentAccount.movements.push(amount);
     // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);}, 2500 );
  }
  inputLoanAmount.value = '';
})



btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if(inputCloseUsername.value === currentAccount.username && +(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
