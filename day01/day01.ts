console.log('HI BUNNY')

const stringToDigit = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
}

const allKeysForward = [...Object.keys(stringToDigit), ...Object.values(stringToDigit)]
const allKeysBackward = [...reverseStrings(Object.keys(stringToDigit)), ...Object.values(stringToDigit)]


function reverseString(str: string): string {
    const chars = str.split('')
    const revd = chars.reverse()
    return revd.join('')
}

function reverseStrings(keys: string[]): string[] {
    return keys.map(reverseString)
}

function firstMatcher(line: string, keys: string[]): string {
    console.log("matching", line)

    let firstKey: string = ''
    let firstIndex: number = line.length + 1 
    for(const key of keys) {
        const idx = line.indexOf(key)
        if (idx >= 0 && idx < firstIndex) {
            firstKey = key
            firstIndex = idx
        } 
    }

    return firstKey
}

function extractFirstLastDigits(line: string): number {
    // do it in forwards
    const firstDigit = firstMatcher(line, allKeysForward)
    console.log('FIRST', firstDigit)

    const lastDigit = reverseString(firstMatcher(reverseString(line), allKeysBackward))
    console.log('LASTS', lastDigit)

    const matches = [firstDigit, lastDigit]

    const digitized = matches.map((match) => {
        if (stringToDigit[match]) {
            return stringToDigit[match]
        }
        return match
    })

    const firstMatch = digitized[0]
    const lastMatch = digitized[1]

    const digits = firstMatch + lastMatch
    const number = Number(digits)

    return number
}

export function extractCalibrationValues(input: string): number[] {

    const lines = input.split('\n')

    const nums = lines
        .map(extractFirstLastDigits)

    console.log('nums', nums)

    return nums
}

export function sumNums(input: number[]): number {
    const sum = input.reduce((val, acc) => {
        return acc + val
    }, 0)
    return sum
}

export async function day01() {
    let input = await Bun.file('day01/day01.input').text()
    input = input.trim()

    const caliValis = extractCalibrationValues(input)

    console.log(caliValis.length)

    const sum = sumNums(caliValis)

    console.log('Day01: ', sum)
}
