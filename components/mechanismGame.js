let oneOpenCard = {
    value: '',
    status: null,
}
let twoOpenCard = {
    value: '',
    status: null,
}

const mechanicsGame = () => {
    const cards = document.querySelectorAll('.item__image')
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            card.setAttribute('src', `./img/${card.dataset.value}.jpg`)
            card.dataset.open = 'open'
            if (!oneOpenCard.value) {
                oneOpenCard.value = card.dataset.value
            } else {
                twoOpenCard.value = card.dataset.value
                comparisonCard()
                console.log(card.dataset)
            }
        })
    })
}

const comparisonCard = () => {
    if (oneOpenCard.value === twoOpenCard.value) {
        oneOpenCard.value = ''
        checkWin()
    } else {
        alert('Вы проиграли')
    }
}

const checkWin = () => {
    const cards = document.querySelectorAll('.item__image')
    for (let card of cards) {
        if (card.dataset.open !== 'open') {
            return false
        }
    }
    alert('Вы победили!')
}

export { mechanicsGame }
