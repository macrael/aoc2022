import { sumNums } from "../util/sum"

// const symbols = ['$', '*', '#', '/', '@', '-', '+', '%']
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

interface Point {
    x: number,
    y: number,
}

interface WordLoc {
    loc: Point
    word: string
}

function validAdjacentCoordinates(pt: Point, maxX: number, maxY: number): Point[] {
    const fullList = [
        { x: pt.x - 1, y: pt.y - 1 },
        { x: pt.x, y: pt.y - 1 },
        { x: pt.x + 1, y: pt.y - 1 },
        { x: pt.x - 1, y: pt.y },
        { x: pt.x + 1, y: pt.y },
        { x: pt.x - 1, y: pt.y + 1 },
        { x: pt.x, y: pt.y + 1 },
        { x: pt.x + 1, y: pt.y + 1 },
    ]

    const validList = fullList.filter( (pt) => pt.x >= 0 && pt.x <=maxX && pt.y >= 0 && pt.y <= maxY)
    return validList
}

function wordAtPoint(grid: string[][], pt: Point): WordLoc {

    // iterate back to starting point
    let thisX = pt.x
    while (thisX > 0) {
        if (digits.includes(grid[pt.y][thisX - 1])) {
            thisX--
        } else {
            break
        }
    }

    // iterate to end to read word
    const startingPoint: Point = {x: thisX, y: pt.y}
    let word = grid[pt.y][thisX]
    while (thisX < grid[pt.y].length - 1) {
        if (digits.includes(grid[pt.y][thisX + 1])) {
            thisX++
            word += grid[pt.y][thisX]
        } else {
            break
        }
    }

    return {
        loc: startingPoint,
        word,
    }
}

export function findEngineParts(gridString: string): number[] {

    const lines = gridString.split('\n')
    const grid = lines.map((line) => line.split(''))

    const foundWords: { [loc: string]: string } = {}

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {

            const char = grid[y][x]
            if (char === '.' || digits.includes(char)) {
                continue
            } 

            // we've got a symbol!
            const checkPoints = validAdjacentCoordinates({x, y}, grid[0].length, grid.length)

            for (const adjacent of checkPoints) {
                const ax = adjacent.x
                const ay = adjacent.y

                if (digits.includes(grid[ay][ax])) {
                    // we have a number
                    const loc = wordAtPoint(grid, {x: ax, y: ay})
                    foundWords[`${loc.loc.x},${loc.loc.y}`] = loc.word
                }
            }

        }
    }

    console.log(foundWords)


    return Object.values(foundWords).map(Number)
}

export function findGearRatios(gridString: string): number[] {

    const lines = gridString.split('\n')
    const grid = lines.map((line) => line.split(''))

    // const foundWords: { [loc: string]: string } = {}
    const gearRatios: number[] = []

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {

            const char = grid[y][x]
            if (char === '.' || digits.includes(char)) {
                continue
            } 

            // we've got a symbol!
            const checkPoints = validAdjacentCoordinates({x, y}, grid[0].length, grid.length)

            const foundWords: { [loc: string]: string } = {}
            for (const adjacent of checkPoints) {
                const ax = adjacent.x
                const ay = adjacent.y

                if (digits.includes(grid[ay][ax])) {
                    // we have a number
                    const loc = wordAtPoint(grid, {x: ax, y: ay})
                    foundWords[`${loc.loc.x},${loc.loc.y}`] = loc.word
                }
            }

            if (char === '*' && Object.values(foundWords).length === 2) {
                // this is a GEAR
                const adjacentWords = Object.values(foundWords)
                const ratio = Number(adjacentWords[0]) * Number(adjacentWords[1])
                gearRatios.push(ratio)
            }
        }
    }

    return gearRatios
}

export async function day03() {
    let input = await Bun.file('day03/day03.input').text()
    input = input.trim()

    const validNums = findEngineParts(input)

    const engSum = sumNums(validNums)

    const gearRatios = findGearRatios(input)

    const gearSum = sumNums(gearRatios)

    console.log('day03 Eng:', engSum)
    console.log('day03 Gear:', gearSum)

}
