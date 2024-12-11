// ok we need to construct a proper search. ??? count of ??? OR
    // count of ###
    // or ??### where all # yes
    // for 5
    // ?????
    // ????#[-#]
    // ???##[-#]
    // ??###[-#]
    // ?####[-#]
    // #####[-#]
    // [-#]####?
    // ###??
    // ##???
    // #????
    // #?#??
    // #?##?
    // #?#?#[-#]

import { sumNums } from "../util/sum"

    // regex: ([?#]{n-1}(?|#?|#$)

/*
???.### 1,1,3 -- 1
.??..??...?##. 1,1,3 -- 4
?#?#?#?#?#?#?#? 1,3,1,6 -- 1 
????.#...#... 4,1,1 -- 1
????.######..#####. 1,6,5 -- 4
?###???????? 3,2,1 -- 10
*/

// returns the first and last index of the matching characters
export function firstSpringMatch(springs: string, count: number): [number, string] {

    const regexString = `(?:^[^#]*?)([?#]{${count}})(?:[^#]|$)`
    const regex = new RegExp(regexString, 'd')
    // console.log('rege', regex)

    const match = regex.exec(springs)

    if (match === null) {
        return [-1, '']
    }
    if (!match.indices) {
        throw new Error('BAD')
    }
    const matchIndex = match.indices[1][0]

    // console.log(springs, count, matchIndex)
    return [matchIndex, match[1]]

}


const memo: { [args: string]: number } = {}

// this line, we find all the slots that the first count would fit in, then recursively check the rest
function possibleConfigs(springs: string, counts: number[]): number {
    const callKey = [springs, counts.join()].join('|')
    // console.log(callKey)
    if (memo[callKey]) { 
        // console.log('memod')
        return memo[callKey]
    }

    if (counts.length === 0) {
        if (springs.indexOf('#') === -1) {
            memo[callKey] = 1
            return 1
        } else {
            memo[callKey] = 0
            return 0
        }
    }

    // 1 2 1 2 
    // #?##?#?##

    // prune if we're out of numbers
    const pruneThreshold = sumNums(counts) + counts.length - 1
    if (springs.length < pruneThreshold){
        // console.log('pruning')
        memo[callKey] = 0
        return 0
    }

    // console.log(springs, counts)

    let thisCount = counts[0]

    let configCount = 0

    let [idx, match] = firstSpringMatch(springs, thisCount) 
    // console.log(idx, match)
    if (idx === -1) {
        // this count dont hunt
        // console.log(springs, counts, 0)
        memo[callKey] = 0
        return 0
    }

    // if the match has # in it then it has to include thisCount
    if (!match.startsWith('#')) {
        // this match started ? so we can investigate the next index
        let skipRestIdx = idx + 1
        let skipRest = springs.substring(skipRestIdx)

        let nextCounts = possibleConfigs(skipRest, counts)
        configCount += nextCounts
    }

    // check the rest of the string, got to have a space after this set
    let restIdx = idx + thisCount + 1
    let rest = springs.substring(restIdx)

    let restCounts = counts.slice(1)
    let subCounts = possibleConfigs(rest, restCounts)
    configCount += subCounts


    // console.log(springs, counts, configCount)
    memo[callKey] = configCount
    return configCount
}

export function countPossibleConfigs(springStrings: string): number[] {

    // seems like a recursive solution? 
    // each choice from the start then forces future choices
    // eventually causing something to be impossible. 
    // maybe very memoizable?

    const lines = springStrings.split('\n')
    const configCounts = []
    for (const line of lines) {
        const [springs, countsString] = line.split(' ')
        const counts = countsString.split(',').map(Number)

        const configs = possibleConfigs(springs, counts)
        configCounts.push(configs)
    }
    return configCounts
}

export function countPossibleQuintupleConfigs(springStrings: string): number[] {

    // seems like a recursive solution? 
    // each choice from the start then forces future choices
    // eventually causing something to be impossible. 
    // maybe very memoizable?

    const lines = springStrings.split('\n')
    const configCounts = []
    for (const line of lines) {
        const [springs, countsString] = line.split(' ')
        const counts = countsString.split(',').map(Number)

        const quinSprings = [springs, springs, springs, springs, springs].join('?')
        const quinCounts = counts.concat(counts, counts, counts, counts)

        console.log(quinSprings, quinCounts)

        const configs = possibleConfigs(quinSprings, quinCounts)
        configCounts.push(configs)
    }
    return configCounts
}

export async function day12() {
    let input = await Bun.file('day12/day12.input').text()
    input = input.trim()

    const counts = countPossibleQuintupleConfigs(input)

    const sum = sumNums(counts)

    console.log('day12', sum)

}
