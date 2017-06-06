// const dogs = require('./dogs.json')
var NUMBER_OF_ROUNDS = 10
var rounds_played = 0
var correct_rounds = 0
var current_dog_pair = null


// Grabs 2 dogs from the (global) dog list
// You can tune the difficulty by passing in the maximim and minimum difference
// in popularity count. Both are nullable.
function getTwoDogs(minimum_count_diff, maximum_count_diff) {
    var dog1 = dogs[Math.floor(Math.random() * dogs.length - 1)]

    var other_dogs = dogs.filter((dog) => {
        // check for minimum difference
        if (!isNaN(parseInt(minimum_count_diff))) {
            if (Math.abs(dog.count - dog1.count) < parseInt(minimum_count_diff)) {
                return false
            }
        }

        // check for maximum difference
        if (!isNaN(parseInt(maximum_count_diff))) {
            if (Math.abs(dog.count - dog1.count) > parseInt(maximum_count_diff)) {
                return false
            }
        }

        // make sure they don't have the same count
        if (dog.count === dog1.count) return false

        return true
    })
    var dog2 = other_dogs[Math.floor(Math.random() * other_dogs.length - 1)]

    return [ dog1, dog2 ]
}


// Gets new dog choices and displays them
function playARound() {
    if (document.querySelector('input').checked) {
        current_dog_pair = getTwoDogs(null, 1) // hard mode
    }
    else {
        current_dog_pair = getTwoDogs(10, null) // easy mode
    }

    document.querySelector('#round').innerText = rounds_played + 1 + ' / ' + NUMBER_OF_ROUNDS

    document.querySelector('#play').style.display = 'block'
    document.querySelector('#results').style.display = 'none'

    document.querySelectorAll('a')[0].text = current_dog_pair[0].name
    document.querySelectorAll('a')[1].text = current_dog_pair[1].name
}


// Displays results of a choice
function displayResults(is_correct) {
    document.querySelector('#play').style.display = 'none'
    document.querySelector('#results').style.display = 'block'

    document.querySelector('#results h2').innerText = is_correct ? 'Correct' : 'Wrong'

    var result_divs = document.querySelectorAll('#results div')
    result_divs[0].innerText = current_dog_pair[0].name + ': ' + current_dog_pair[0].count + ' dogs'
    result_divs[1].innerText = current_dog_pair[1].name + ': ' + current_dog_pair[1].count + ' dogs'
}


// Displays final results
function displayFinalResults() {
    alert('You got ' + correct_rounds + ' out of ' + NUMBER_OF_ROUNDS + ' correct')
}


// Onclick handler for choosing a dog
function nameChosen(name) {
    var popular_dog = current_dog_pair.sort((a, b) => b.count - a.count)[0]
    var is_correct = name === popular_dog.name

    displayResults(is_correct)

    rounds_played++
    if (is_correct) correct_rounds++

    return false // onclick event response
}


// Onclick handler for next button
function nextButton() {
    if (rounds_played === NUMBER_OF_ROUNDS) {
        displayFinalResults()
    }
    else {
        playARound()
    }
}

// initialize the game
playARound()
