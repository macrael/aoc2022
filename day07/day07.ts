import { sumNums } from "../util/sum"

/*
1 Five of a kind
2 Four of a kind
3 Full house
4 Three of a kind
5 Two pair
6 One pair
7 High card
*/
export function handRank(hand: string): number {
    // i want counts of each char
    const counter: { [card: string]: number} = {}
    const chars = hand.split('')
    for (const char of chars) {
        if (counter[char] === undefined) {
            counter[char] = 1
        } else {
            counter[char] = counter[char] + 1
        }
    }

    // deal with jokers
    const jokerCount = counter['J']

    const counts = Object.values(counter).sort()

    if (counts.length === 1) {
        // five of a kind
        return 1
    } else if (counts.length === 2) {
        if (counts[0] === 1) {
            // four of a kind
            if (jokerCount > 0) {
                // five of a kind
                return 1
            }
            return 2
        } else if (counts[0] === 2) {
            // full house
            if (jokerCount > 0) {
                // five of a kind
                return 1
            }
            return 3
        }
    } else if (counts.length === 3) {
        if (counts[1] === 1) {
            // three of a kind
            if (jokerCount > 0) {
                // four of a kind
                return 2
            }
            return 4
        } else if (counts[1] === 2) {
            // two pair
            if (jokerCount == 2) {
                // four of a kind
                return 2
            } else if (jokerCount === 1) {
                // full house
                return 3
            }
            return 5
        }
    } else if (counts.length === 4) {
        // one pair
        if (jokerCount > 0) {
            // three of a kind
            return 4
        }
        return 6
    } else if (counts.length === 5) {
        // high card
        if (jokerCount > 0) {
            // one pair
            return 6
        }
        return 7
    }

    throw new Error('BAD HAND: ' + hand)
}

const cardRanks = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J',]

export function compareHands(a: string, b: string): number {
    const aRank = handRank(a)
    const bRank = handRank(b)

    if (aRank !== bRank) {
        return bRank - aRank
    }

    const aChars = a.split('')
    const bChars = b.split('')

    for (let i = 0; i < aChars.length; i++) {
        const aCardRank = cardRanks.indexOf(aChars[i])
        const bCardRank = cardRanks.indexOf(bChars[i])

        if (aCardRank !== bCardRank) {
            return bCardRank - aCardRank
        }
    }

    console.log('I DONT THINK HANDS SHOULD BE EQUAL')
    return 0
}

function compareHandBids(a: string, b: string): number {
    const [aHand, _a] = a.split(' ')
    const [bHand, _b] = b.split(' ')

    return compareHands(aHand, bHand)

}

export function sortHandBids(handBids: string[]): string[] {
    return handBids.sort(compareHandBids)
}

export function scoreRankedHandBids(handBids: string[]): number {

    const scores: number[] = []
    for (let i = 0; i < handBids.length; i++) {
        const rank = i + 1
        const [_, bidString] = handBids[i].split(' ')
        const bid = Number(bidString)

        const score = rank * bid
        scores.push(score)
    }

    return sumNums(scores)
}


export async function day07() {
    let input = await Bun.file('day07/day07.input').text()
    input = input.trim()

    const lines = input.split('\n')

    const sortedHandBids = sortHandBids(lines)

    const score = scoreRankedHandBids(sortedHandBids)

    console.log('day07: ', score)

}
