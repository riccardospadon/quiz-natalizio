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