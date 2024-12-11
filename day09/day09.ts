import { sumNums } from "../util/sum"

/*
10  13  16  21  30  45  68
   3   3   5   9  15  23
     0   2   4   6   8
       2   2   2   2
         0   0   0
*/
function nextNumber(seq: number[]): number {

    const diffs: number[] = []
    for (let i = 0; i < seq.length -1; i++) {
        diffs.push(seq[i + 1] - seq[i])
    }

    if (diffs.every(n => n === 0)) {
        return seq[0]
    }

    return seq[seq.length - 1] + nextNumber(diffs)

}

function previousNumber(seq: number[]): number {

    const diffs: number[] = []
    for (let i = 0; i < seq.length -1; i++) {
        diffs.push(seq[i + 1] - seq[i])
    }

    if (diffs.every(n => n === 0)) {
        return seq[0]
    }

    return seq[0] - previousNumber(diffs)

}


export function predictSequences(sequencesString: string): number[][] {

    const seqs = sequencesString.split('\n').map(ss => {
        const numsRegex = /[-\d]+/g
        return [...ss.matchAll(numsRegex)].map(Number)
    })

    console.log('seq', seqs)

    const nextNums = seqs.map(nextNumber)

    const prevNums = seqs.map(previousNumber)

    return [nextNums, prevNums]
}

export async function day09() {
    let input = await Bun.file('day09/day09.input').text()
    input = input.trim()

    const [nextNums, prevNums] = predictSequences(input)
    console.log(nextNums)

    const sum = sumNums(nextNums)
    const prevSum = sumNums(prevNums)

    console.log("day09", sum, prevSum)


}
