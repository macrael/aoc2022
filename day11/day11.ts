import { sumNums } from "../util/sum"

type Matrix = string[][]

interface Point {
    x: number,
    y: number,
}

function matFind(matrix: Matrix, pt: Point) {
    return matrix[pt.y][pt.x]
}

function matHeight(matrix: Matrix) {
    return matrix.length
}

function matWidth(matrix: Matrix) {
    return matrix[0].length
}

function parseMatrix(matStr: string): Matrix {

    const lines = matStr.split('\n')

    const matrix: Matrix = []
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y]
        const chars = line.split('')
        matrix.push(chars)
    }

    return matrix
}

function distance(a: Point, b: Point, emptyRows: number[], emptyCols: number[]): number {

    const orderedX = [a.x, b.x].sort((a, b) => a - b)
    console.log('x', orderedX)
    const doubledCols = emptyCols.filter(c => c > orderedX[0] && c < orderedX[1])
    // console.log('doubled', doubledCols)
    const diffX = orderedX[1] - orderedX[0] + doubledCols.length * 999999
    // console.log('difx', diffX)

    console.log(a.y, b.y)

    const orderedY = [a.y, b.y].sort((a, b) => a - b)
    console.log('y', orderedY)
    const doubledRows = emptyRows.filter(c => c > orderedY[0] && c < orderedY[1])
    const diffY = orderedY[1] - orderedY[0] + doubledRows.length * 999999

    return diffX + diffY
}


export function shortestPath(universeString: string): number {

    const univ = parseMatrix(universeString)

    const galaxies: Point[] = []
    const emptyRows: number[] = []
    const emptyCols: number[] = []
    for (let i = 0; i < matWidth(univ); i++) {
        let isEmpty = true
        for (let j = 0; j < matHeight(univ); j++) {
            const checkPoint = {x: i, y: j}
            if (matFind(univ, checkPoint) === '#') {
                galaxies.push(checkPoint)
                isEmpty = false
            }
        }
        if (isEmpty) {
            emptyCols.push(i)
        }
    }

    // find all empty cols
    for (let j = 0; j < matHeight(univ); j++) {
        let isEmpty = true
        for (let i = 0; i < matWidth(univ); i++) {
            const checkPoint = {x: i, y: j}
            if (matFind(univ, checkPoint) === '#') {
                isEmpty = false
            }
        }
        if (isEmpty) {
            emptyRows.push(j)
        }
    }

    // console.log(univ)
    // console.log(galaxies)
    console.log('row', emptyRows)
    console.log('col', emptyCols)

    const distances: number[] = []
    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {

            const dist = distance(galaxies[i], galaxies[j], emptyRows, emptyCols)

            console.log(i, j, dist)
            
            distances.push(dist)
        }
    }

    return sumNums(distances)
}

export async function day11() {

    let input = await Bun.file('day11/day11.input').text()
    input = input.trim()

    const sums = shortestPath(input)

    console.log('day11a: ', sums)

}
