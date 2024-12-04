window.onload = function onLoad() {
    const button = document.querySelector('.cta')
    button.disabled = true
    resetCheckBox()
    proceedUnlock()
}

function proceedUnlock() {
    const checkbox = document.querySelector('input')
    const button = document.querySelector('.cta')
    if(checkbox.checked) {
        button.disabled = false
        button.style.cursor = 'pointer'
    } else{
        button.disabled = true
        button.style.cursor = 'not-allowed'
    }
}

function resetCheckBox() {
    const checkbox = document.querySelector('input')
    checkbox.checked = false 
}

function proceed() {
    if(screen.width >= 1400) {
        window.location.href = '../quiz/quiz.html'
    }
    else {
        window.location.href = '../wrongScreen/wrongScreen.html'
    }
}

