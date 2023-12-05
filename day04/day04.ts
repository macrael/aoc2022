import { sumNums } from "../util/sum"


export function scratchCardCounts(cardString: string): number[] {

    const cardLines = cardString.split('\n')

    const scores: number[] = []
    for (const cardLine of cardLines) {
        console.log(cardLine)
        // Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        const [_, bothCards] = cardLine.split(':')

        const [winners, havers] = bothCards.trim().split('|')

        const digitRx = /\d+/g
        const winNums = [...winners.matchAll(digitRx)].map(Number)
        const haveNums = [...havers.matchAll(digitRx)].map(Number)

        console.log(winNums, haveNums)

        const wonners = haveNums.filter(n => winNums.includes(n))

        console.log('winners', wonners)

        scores.push(wonners.length)
    }

    return scores
}

export function scoreCards(winCounts: number[]): number[] {
    return winCounts.map(c => {
        if (c > 0) {
            return Math.pow(2, c-1)
        }
        return 0
    })
}

export function countCards(winCounts: number[]): number{

    const wonCards: number[] = Array(winCounts.length).fill(1)

    for (let i = 0; i < winCounts.length; i++) {
        const copies = wonCards[i]
        const winCount = winCounts[i]
        for (let j = i +1; j < i + winCount + 1; j++) {
            wonCards[j] = wonCards[j] + copies
        }
    }

    console.log('COUTNS', wonCards)
    return sumNums(wonCards)

}

export async function day04() {
    let input = await Bun.file('day04/day04.input').text()
    input = input.trim()

    const cardCounts = scratchCardCounts(input)

    const scores = scoreCards(cardCounts)

    console.log(scores)

    const scoreSum = sumNums(scores)

    const countSum = countCards(cardCounts)

    console.log('day04 Points:', scoreSum)
    console.log('day04 Counts:', countSum)
}
