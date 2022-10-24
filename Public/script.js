let thoughtHistoryDiv = document.getElementById('thought-history');
let thoughtText = document.getElementById('thought-text');
let thoughtInputField = document.getElementById('thought-input');
let thoughtSubmitBtn = document.getElementById('thought-submit');

let thoughtHistory = [];

window.addEventListener('load', () => {
    fetchPrevious()
    historyCheck()

    thoughtSubmitBtn.addEventListener('click', () => {
        if (thoughtInputField.value) {
            thoughtSubmitBtn.innerText = "SUBMITTING..."
            fetch('/new-thought', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ thought: thoughtInputField.value })
            })
            .then(response => response.json())
            .then(data => {
                let newThought = document.createElement('p');
                newThought.innerHTML = data.content.thought;
                newThought.className = "text1"
                thoughtHistoryDiv.insertBefore(newThought, thoughtHistory.firstChild);
                thoughtInputField.value = ""
                thoughtSubmitBtn.innerText = "SUBMIT THOUGHT"
                historyCheck()
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            thoughtText.innerText = "Enter a thought to submit it."
            setTimeout(() => {
                historyCheck()
            }, 2000)
        }
        
    });

    thoughtSubmitBtn.addEventListener('mouseenter', () => {
        thoughtSubmitBtn.style.backgroundColor = "#000000"
        thoughtSubmitBtn.style.color = "#FFFFFF"
    });

    thoughtSubmitBtn.addEventListener('mouseleave', () => {
        thoughtSubmitBtn.style.backgroundColor = "#FFFFFF"
        thoughtSubmitBtn.style.color = "#000000"
    });
})

function fetchPrevious () {
    fetch('/thought-history')
    .then(response => response.json())
    .then(data => {
        thoughtHistory = data.data

        if (thoughtHistory.length > 0) {
            for (let i = 0; i < thoughtHistory.length; i++){
                let newThought = document.createElement('p');
                newThought.innerHTML = thoughtHistory[i].thought;
                newThought.className = "text1"
                thoughtHistoryDiv.appendChild(newThought);
            }
        }

        historyCheck()

    })
    .catch(error => {
        console.log(error);
    })
}

function historyCheck () {
    if (thoughtHistory.length === 0) {
        thoughtText.innerText = "No thoughts yet. Be the first to add a thought!"
    } else {
        thoughtText.innerText = "Here are some things that were on visitors minds :)"
    }
}