import { sumNums } from "../util/sum"

type RolCol = 'ROW' | 'COL'

// #.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.

function findReflection(terrain: string): [RolCol, number] {

    console.log('FINDING\n', terrain)

    // check row reflection
    const lines = terrain.split('\n')
    for (let i= 1; i < lines.length; i ++) {
        let rowCount = Math.min(i, lines.length -i)
        console.log('count', rowCount)

        let prevRows = lines.slice(i - rowCount, i)
        let nextRows = lines.slice(i, i + i)

        let nextCompRows = nextRows.reverse()

        const prevString = prevRows.join('\n')
        const nextString = nextCompRows.join('\n')

        console.log(prevString)
        console.log('')
        console.log(nextString)

        if (prevString === nextString) {
            return ['ROW', i]
        }
    }

    // try column

    const cols: string[] = []
    for (let i = 0; i < lines[0].length; i++) {
        const col = lines.map(l => l.charAt(i)).join()
        cols.push(col)
    }

    console.log(cols)

    for (let i= 1; i < cols.length; i ++) {
        let rowCount = Math.min(i, cols.length -i)
        console.log('count', rowCount)

        let prevRows = cols.slice(i - rowCount, i)
        let nextRows = cols.slice(i, i + i)

        let nextCompRows = nextRows.reverse()

        const prevString = prevRows.join('\n')
        const nextString = nextCompRows.join('\n')

        console.log(prevString)
        console.log('')
        console.log(nextString)

        if (prevString === nextString) {
            return ['COL', i]
        }
    }

    throw new Error('NOT FOUND')

}


function findSmudgyRow(rows: string[]): number {

    for (let i= 1; i < rows.length; i ++) {
        let rowCount = Math.min(i, rows.length -i)
        console.log('count', i)

        let prevRows = rows.slice(i - rowCount, i)
        let nextRows = rows.slice(i, i + i)

        let nextCompRows = nextRows.reverse()

        // compare
        let diff = 0
        for (let j = 0; j <  prevRows.length; j++) {
            const prevChars = prevRows[j].split('')
            const nextChars= nextCompRows[j].split('')

            for (let k = 0; k < prevChars.length; k++) {
                if (prevChars[k] !== nextChars[k]) {
                    diff ++
                }
            }
        }

        if (diff === 1) {
            return i
        }

        const prevString = prevRows.join('\n')
        const nextString = nextCompRows.join('\n')

        console.log(prevString)
        console.log('')
        console.log(nextString)

        if (prevString === nextString) {
            return i
        }
    }

    return -1
    
}

function findSmudgyReflection(terrain: string): [RolCol, number] {

    console.log('FINDING\n', terrain)

    // check row reflection
    const lines = terrain.split('\n')
    const rowIdx = findSmudgyRow(lines)

    if (rowIdx >= 0) {
        return ['ROW', rowIdx]
    }

    // try column

    const cols: string[] = []
    for (let i = 0; i < lines[0].length; i++) {
        const col = lines.map(l => l.charAt(i)).join()
        cols.push(col)
    }

    console.log('rotated', cols.join('\n'))

    const collIdx = findSmudgyRow(cols)
    if (collIdx >= 0) {
        return ['COL', collIdx]
    }

    throw new Error('NOT FOUND')

}



export function findReflections(terrainsString: string): [RolCol, number][] {

    const terrains = terrainsString.split('\n\n')
    console.log('TERRS', terrains.length, terrains)

    const reflects = terrains.map(findSmudgyReflection)

    return reflects
}

export function scoreReflects(reflects: [RolCol, number][]): number {
    const rowReflects = reflects.filter(([name, _]) => name === 'ROW').map(([_, row]) => row)
    const colReflects = reflects.filter(([name, _]) => name === 'COL').map(([_, col]) => col)

    const rowSum = sumNums(rowReflects)
    const colSum = sumNums(colReflects)

    const solution = colSum + 100 * rowSum

    return solution
}

export async function day13() {
    let input = await Bun.file('day13/day13.input').text()
    input = input.trim()

    const reflects = findReflections(input)

    const score = scoreReflects(reflects)

    console.log('day13', score)
}
