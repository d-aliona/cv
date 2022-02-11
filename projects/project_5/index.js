/* START TASK 1: Your code goes here */

let firstCol = document.querySelectorAll('.firstCol');

for (let i = 0; i < firstCol.length; i++) {
    firstCol[i].addEventListener('click', toggleColor.bind(null, firstCol[i].parentNode, 'blue'));
}

let usualCell = document.querySelectorAll('.cell');

for (let i = 0; i < usualCell.length; i++) {
    usualCell[i].addEventListener('click', toggleColor.bind(null, usualCell[i], 'yellow'));
}

let spec = document.getElementById('specialCell');
spec.addEventListener('click', toggleColor.bind(null, document.getElementById('table'), 'green'));

function toggleColor(el, color) {
    if (el.style.backgroundColor === '') {
        el.style.backgroundColor = color;
    } else {
        el.style.backgroundColor = '';
    }
}

/* END TASK 1 */

/* START TASK 2: Your code goes here */

let input = document.querySelector('input');
let message = document.getElementById('message');
let button = document.querySelector('button');
let regex = /^(\+380)[0-9]{9}$/;

input.addEventListener('input', validateData);
button.addEventListener('click', messageSuccessSend);

function validateData() {
    if (regex.test(input.value)) {
        button.disabled = false;
        input.style.border = '2px solid black';
        message.style.visibility = 'hidden';
    } else {
        message.style.visibility = 'visible';
        input.style.border = '2px solid red';
        button.disabled = true;
        
        if (input.value === '') {
            input.style.fontSize = '80%';
        } else {
            input.style.fontSize = '100%';
        }
    }
}

function messageSuccessSend() {
    message.style.backgroundColor = 'green';
    message.innerText = 'Data was successfully sent';
    message.style.visibility = 'visible';
}

/* END TASK 2 */

/* START TASK 3: Your code goes here */
const two = 2;
const delay = 3000;
let scoreA = 0;
let scoreB = 0;
let timeId;
let court = document.getElementById('court-container');
let ball = document.getElementById('ball-container');
let elemAlertScore = document.getElementById('alertScore');

let zoneA = document.getElementById('scoreZoneA');
let zoneB = document.getElementById('scoreZoneB');
let scoreEvent = new Event('score');

court.addEventListener('click', moveBall);
zoneA.addEventListener('click', scoreTeamB);
zoneA.addEventListener('score', showMessageB);
zoneB.addEventListener('click',scoreTeamA);
zoneB.addEventListener('score',showMessageA);

function scoreTeamA() {
    scoreA++;
    if (elemAlertScore !== '') {
        clearTimeout(timeId);
    }
    document.getElementById('scoreA').innerText = scoreA;
    this.dispatchEvent(scoreEvent);
} 

function scoreTeamB() {
    scoreB++;
    if (elemAlertScore !== '') {
        clearTimeout(timeId);
    }
    document.getElementById('scoreB').innerText = scoreB;
    this.dispatchEvent(scoreEvent);
} 

function showMessageA() {
    elemAlertScore.style.color = 'blue';
    elemAlertScore.innerText = 'Team A score!';
    timeId = setTimeout(clearScoreBoard, delay);
}

function showMessageB() {
    elemAlertScore.style.color = 'red';
    elemAlertScore.innerText = 'Team B score!';
    timeId = setTimeout(clearScoreBoard, delay);
}

function moveBall(e) {
    let rect = this.getBoundingClientRect();
    ball.style.left = e.clientX - rect.left - ball.offsetWidth / two + 'px';
    ball.style.top = e.clientY - rect.top - ball.offsetWidth / two + 'px';
}

function clearScoreBoard() {
    elemAlertScore.innerText = '';    
}

/* END TASK 3 */
