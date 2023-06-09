import { mechanicsGame } from './mechanismGame'
import { renderDifficultyLevel } from './renderDifficultyLevel'

export const getRank = (number: Number) => {
    switch (number) {
        case 6:
            return '6'
        case 7:
            return '7'
        case 8:
            return '8'
        case 9:
            return '9'
        case 10:
            return '10'
        case 11:
            return 'jack'
        case 12:
            return 'queen'
        case 13:
            return 'king'
        case 14:
            return 'ace'
        default:
            break
    }
}

export const getSuit = (number: Number) => {
    switch (number) {
        case 1:
            return 'clubs'
        case 2:
            return 'diamonds'
        case 3:
            return 'hearts'
        case 4:
            return 'spades'
        default:
            break
    }
}

const generateCards = ({ userInfoGame, selectDifficulty }) => {
    let arrCards: String[] = []
    let rank: number | string | undefined = 0
    let suit: number | string | undefined = ''
    for (let i = 0; i < userInfoGame.quantityOfCards / 2; i++) {
        do {
            rank = getRank(Math.floor(Math.random() * 9) + 6)
            suit = getSuit(Math.floor(Math.random() * 4) + 1)
        } while (
            arrCards.includes(
                `<div class="field__item"><img data-value="${rank}-${suit}" data-value="" src="./img/${rank}-${suit}.jpg" /></div>`
            )
        )
        let card = `<div class="field__item"><img data-value="${rank}-${suit}" data-value="" class="item__image" src="./img/${rank}-${suit}.jpg" /></div>`
        arrCards.push(card)

        let index = Math.floor(Math.random() * userInfoGame.quantityOfCards) + 1

        let isFindSlot = false
        while (!isFindSlot) {
            if (!arrCards[index]) {
                arrCards[index] = card
                isFindSlot = true
            } else if (index === userInfoGame.quantityOfCards) {
                index = 1
            } else {
                index++
            }
        }
    }

    selectDifficulty.innerHTML = `
        <div class="field">
        <div class="field__header">
            <div class="field__time">
                <p class="field__time-min">00.</p>
                <p class="field__time-sec">00</p>
            </div>
            <button id="newGame" class="button-start">Начать заново</button>
        </div>
       ${arrCards.map((card) => card).join('')}
    </div>`

    setTimeout(() => {
        const cards: HTMLElement[] = Array.from(
            document.querySelectorAll('.item__image')
        )
        for (let card of cards) {
            card.setAttribute('src', './img/card-shirt.jpg')
        }

        const second: HTMLElement = document.querySelector('.field__time-sec')!
        const minute: HTMLElement = document.querySelector('.field__time-min')!
        let sec
        let min

        setInterval(() => {
            sec = (Number(second.innerHTML) + 1).toString()
            if (sec < 60) {
                second.innerHTML = Number(sec) < 10 ? '0' + sec : sec
            } else {
                min = (Number(minute.innerHTML) + 1 + '.').toString()
                minute.innerHTML = Number(min) < 10 ? '0' + min : min
                second.innerHTML = '00'
            }
        }, 1000)
        mechanicsGame({ minute, second })
    }, 5000)

    // eslint-disable-next-line no-unused-vars
    const newGame: void = document
        .getElementById('newGame')!
        .addEventListener('click', () => {
            userInfoGame.difficultyLevel = false
            renderDifficultyLevel()
        })

    console.log(newGame)
}

export { generateCards }
