import { questions } from '../questions/questions.js'

let shuffledQuestions = shuffledAnswers(questions)

let points = 0

let index = 0

const TIME_PER_QUESTION = 30

let timeouts = []
let timeCircle = document.querySelector('.tondo')

let inputButtons = []
const INPUT_ATTRIBUTE_NAME = 'question'
const QUESTION_CLASS_NAME = 'question'
const ANSWERS_CONTAINER_ID_NAME = 'answers'
const PROCEED_BTN_ID_NAME = 'proceedBtn'
const QUESTION_TEXT_ID_NAME = 'titleQuiz'
const QUESTION_NUMBER_ID_NAME = 'numeroDomanda'
const MAX_QUESTIONS = shuffledQuestions.length

let answersContainer = document.querySelector('#' + ANSWERS_CONTAINER_ID_NAME)
let questionContainer = document.querySelector('#' + QUESTION_TEXT_ID_NAME)
let questionNumberTag = document.querySelector('#' + QUESTION_NUMBER_ID_NAME)
let backslashTag = document.querySelector('#backslash')
let maxQuestionNumberTag = document.querySelector('#numeroDomandaMax')
let currentInputButtons = []

window.onload = function load(){
    nextQuestion()

    const btn = document.querySelector('#' + PROCEED_BTN_ID_NAME)
    btn.addEventListener('click', nextQuestion)

    let timeContainer = document.querySelector('.seconds')
    timeContainer.style.userSelect = 'none'
}

function nextQuestion() {
    for(let timeout of timeouts){
        clearTimeout(timeout)
    }

    if(index > 0){
        const previousQuestion = shuffledQuestions[index - 1]
        inputButtons = document.querySelectorAll('input[type="radio"]')
        for(const inputButton of inputButtons){
            if(inputButton.checked){
                if(inputButton.value === previousQuestion.correct_answer){
                    points++
                }
            }
        }
    }

    if(index >= shuffledQuestions.length){
        showResults()
        return
    }

    questionNumberTag.innerHTML = index + 1
    backslashTag.innerHTML = '/'
    maxQuestionNumberTag.innerHTML = MAX_QUESTIONS
    questionNumberTag.style.userSelect = 'none'
    inputButtons = []
    currentInputButtons = []
    showQuestionAndAnswer()

    timeout()
}


function showQuestionAndAnswer() {
    const question = shuffledQuestions[index]

    let answers = question.incorrect_answers
    answers.push(question.correct_answer)
    answers = shuffledAnswers(answers)

    questionContainer.innerHTML = ''
    answersContainer.innerHTML = ''

    let h2 = document.createElement('h2')
    h2.className = QUESTION_CLASS_NAME
    h2.style.userSelect = 'none'
    let p1 = document.createElement('p')
    p1.style.margin = '0px'
    let p2 = document.createElement('p')
    p2.style.margin = '0px'

    let currentQuestion = question.question
    let arrayCharsQuestion = currentQuestion.split(' ')
    let firstHalfQuestion = arrayCharsQuestion.slice(0, arrayCharsQuestion.length/2).join(' ')
    let secondHalfQuestion = arrayCharsQuestion.slice(arrayCharsQuestion.length/2, arrayCharsQuestion.length).join(' ')
    p1.innerHTML = firstHalfQuestion
    p2.innerHTML = secondHalfQuestion

    h2.appendChild(p1)
    h2.appendChild(p2)
    questionContainer.appendChild(h2)

    for(let i = 0; i < answers.length; i++) {
        let div = document.createElement('div')
        div.className = 'item'

        answersContainer.appendChild(div)

        let input = document.createElement('input')
        input.setAttribute('type', 'radio')
        input.setAttribute('name', INPUT_ATTRIBUTE_NAME)
        input.value =  answers[i]

        currentInputButtons.push(input)

        div.appendChild(input)

        let label = document.createElement('label')
        label.style.userSelect = 'none'
        label.style.display = 'inline-block'
        label.innerHTML = answers[i]
        div.appendChild(label)

        div.addEventListener('click', function answersClick(){
            let children = this.childNodes
            let input = children[0]
            if(!input.checked){
                input.checked = true
            } else {
                input.checked = false
            }
        })
    }

    let maxLabelLength = currentInputButtons[0].parentNode.childNodes[1].offsetWidth

    for (let i = 1; i < currentInputButtons.length; i++) {
        if(currentInputButtons[i].parentNode.childNodes[1].offsetWidth > maxLabelLength) {
            maxLabelLength = currentInputButtons[i].parentNode.childNodes[1].offsetWidth
        }
    }

    for (let i = 0; i < currentInputButtons.length; i++) {
       let label = currentInputButtons[i].parentNode.childNodes[1]
       label.style.minWidth = maxLabelLength + 'px'
    }
    index++
}

function shuffledAnswers(arr){
    return arr.sort(() => Math.random() - 0.5)
}

function showResults() {
    let resultsContainer = document.querySelector('.results')
    let testContainer = document.querySelector('.testing')
    let bottomPart = document.querySelector('.bottom')
    let pointsText = document.querySelector('#points')

    let percentage = (points/MAX_QUESTIONS) * 100
    pointsText.innerHTML = points + '/' + MAX_QUESTIONS + ' (' + percentage + '%)'
    let wrongPointsText = document.querySelector('#wrong-points')
    let wrongPercentage = ((MAX_QUESTIONS - points) / MAX_QUESTIONS)*100
    wrongPointsText.innerHTML = (MAX_QUESTIONS - points) + '/' + MAX_QUESTIONS + ' (' + wrongPercentage + '%)'

    let finalText = document.querySelector('#finalText')

    const PASSED_TEXT_POINTS = Math.ceil((shuffledQuestions.length*6)/10)

    //TODO: AGGIUNGERE IL TESTO PER IL 100% DELLE RISPOSTE ESATTE
    if(points >= PASSED_TEXT_POINTS){
        finalText.innerHTML = 'Congratulazioni! Hai superato il test, ma non hai ottenuto il punteggio massimo, quindi niente regalo AHAH!'
        finalText.style.color = 'aquamarine'
    } else {
        finalText.innerHTML = 'Mi dipiace ma niente regalo AHAHAH'
        finalText.style.color = 'black'
    }

    let circularResults = document.querySelector('.circularPercentageVisualization')
    let pointsDeg = (percentage*360)/100
    circularResults.style.background = 'conic-gradient(#00FFFF 0deg ' + pointsDeg + 'deg, #9D1D8F ' + pointsDeg + 'deg 360deg)'

    resultsContainer.style.display = 'block'
    testContainer.style.display = 'none'
    bottomPart.style.display = 'none'
}

function setTime(timeRemaining, timeout){
    let time = document.querySelector('#time')
    timeouts.push(
        setTimeout(function(){
            time.innerHTML = timeRemaining
            let currentTimePercentage = (timeRemaining/TIME_PER_QUESTION)*100
            let currentGrade = (360*currentTimePercentage)/100
            timeCircle.style.background = `conic-gradient(#00FFFF 0deg ${currentGrade}deg, transparent ${currentGrade}deg 360deg)`
            // timeCircle.style.background = 'conic-gradient(transparent 0deg ' + (360 - currentGrade) + 'deg, #00FFFF ' + (360 - currentGrade) + 'deg 360deg) 1'
            
            if(timeRemaining === 0){
                nextQuestion()
            }
        }, timeout)
    )
}

function timeout(timeout = 1000){
    let _start = TIME_PER_QUESTION
    let currentTime = TIME_PER_QUESTION
    while(currentTime >= 0){
        let timeValue = (_start - currentTime) + 1
        setTime(currentTime--, timeValue*1000)
    }
}