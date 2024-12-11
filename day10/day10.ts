

type Maze = string[][]

interface Point {
    x: number,
    y: number,
}

function find(maze: Maze, pt: Point) {
    return maze[pt.y][pt.x]
}

function eqPt(a: Point, b: Point) {
    return a.x === b.x && a.y === b.y
}

function eqArr(a: any[], b: any[]): boolean {
    if (a.length !== b.length) {
        return false
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false
        }
    }
    return true
}

function emptyMaze(x: number, y: number): Maze {
    const maze = []
    for (let j = 0; j < y; j++) {
        const line = new Array(x).fill('.')
        maze.push(line)
    }

    return maze
}

function printMaze(maze: Maze) {
    const str = maze.map(line => line.join('')).join('\n')

    console.log(str)
}

interface ParseResult {
    maze: Maze,
    start: Point
}

function parseMaze(mazeString: string): ParseResult {

    const lines = mazeString.split('\n')

    let sx = -1
    let sy = -1

    const maze: Maze = []
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y]
        const chars = line.split('')
        for (let x = 0; x < chars.length; x++) {
            if (chars[x] === 'S') {
                sx = x
                sy = y
            }
        }
        maze.push(chars)
    }

    return {
        maze: maze,
        start: {x: sx, y: sy}
    }
}

// at the start, we have to do the logic in reverse
function nextFromStart(maze: Maze, start: Point): Point {

    // north
    const northPt = { x: start.x, y: start.y - 1 }
    if (northPt.y > 0) {
        const north = maze[northPt.y][northPt.x]
        if (north === '|' || north === '7' || north === 'F') {
            return northPt
        }
    }

    // south
    const southPt = { x: start.x, y: start.y + 1 }
    if (southPt.y < maze.length) {
        const south = maze[southPt.y][southPt.x]
        if (south === '|' || south === 'L' || south === 'J') {
            return southPt
        }
    }


    // east
    const eastPt = { x: start.x + 1, y: start.y }
    if (eastPt.y < maze[0].length) {
        const east = maze[eastPt.y][eastPt.x]
        if (east === '-' || east === 'J' || east === '7') {
            return eastPt
        }
    }

    // west
    const westPt = { x: start.x + 1, y: start.y }
    if (westPt.y > 0) {
        const east = maze[westPt.y][westPt.x]
        if (east === '-' || east === 'F' || east === 'L') {
            return westPt
        }
    }

    throw new Error('No starting point')

}

function assert(b: boolean) {
    if (!b) {
        throw new Error()
    }
}

/*
..F7.
.FJ|.
SJ.L7
|F--J
LJ...

| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
*/

function nextPipe(maze: Maze, here: Point, prev: Point): Point {
    const pipe = find(maze, here)

    const north = { x: here.x, y: here.y - 1}
    const east = { x: here.x + 1, y: here.y}
    const south = { x: here.x, y: here.y + 1}
    const west = { x: here.x - 1, y: here.y}

    const connections: {[pipe: string]: Point[]} = {
        '|': [north, south],
        '-': [east, west],
        'L': [north, east],
        'J': [north, west],
        '7': [south, west],
        'F': [south, east],
    }

    const [a, b] = connections[pipe]

    if (eqPt(a, prev)) {
        return b
    } else if(eqPt(b, prev)) {
        return a
    }

    console.log('prev', prev)
    console.log('here', here)
    console.log('a', a)
    console.log('b', b)


    throw new Error(`Unmatched: ${pipe}`)
}

function walkMaze(maze: Maze, start: Point): Point[] {

    console.log('START', start)
    const firstPoint = nextFromStart(maze, start)
    console.log('FIRST', firstPoint)


    let prev = start
    let here = firstPoint
    let steps = 1
    let pipePoints = [start]
    while (!(here.x === start.x && here.y === start.y)) {
        pipePoints.push(here)
        const next = nextPipe(maze, here, prev)
        // console.log('HERE', here)
        steps ++

        prev = here
        here = next
    }

    return pipePoints
}

export function furthestMazePoint(mazeString: string): number {

    const res = parseMaze(mazeString)

    const loopPts = walkMaze(res.maze, res.start)

    return loopPts.length
}

function pipeForStart(_maze: Maze, loopPts: Point[]): string {

    const start = loopPts[0]
    const next = loopPts[1]
    const prev = loopPts[loopPts.length - 1]

    const north = { x: start.x, y: start.y - 1}
    const east = { x: start.x + 1, y: start.y}
    const south = { x: start.x, y: start.y + 1}
    const west = { x: start.x - 1, y: start.y}

    const connections: {[pipe: string]: Point[]} = {
        '|': [north, south],
        '-': [east, west],
        'L': [north, east],
        'J': [north, west],
        '7': [south, west],
        'F': [south, east],
    }

    for (const pipe of Object.keys(connections)) {
        const [a, b] = connections[pipe]

        if ((eqPt(a, next) && eqPt(b, prev)) || 
            (eqPt(a, prev) && eqPt(b, next))) {
            return (pipe)
        }
    }

    throw new Error('no starting pipe')

}


export function interiorCount(mazeString: string): number {

    const res = parseMaze(mazeString)

    const loopPts = walkMaze(res.maze, res.start)

    const startingPipe = pipeForStart(res.maze, loopPts)

    const calculator = emptyMaze(res.maze[0].length, res.maze.length)


    for (const loopPt of loopPts) {
        calculator[loopPt.y][loopPt.x] = res.maze[loopPt.y][loopPt.x]
    }

    // set the initial point
    const start = loopPts[0]
    calculator[start.y][start.x] = startingPipe
    let interiorPoints = 0
    for (let j = 0; j < calculator.length; j++) {
        let outside = true
        let run = []
        for (let i = 0; i < calculator[0].length; i++) {
            const here = calculator[j][i]
            if (here !== '.') {
                if (here === '|') {
                    // simple crossing
                    outside = !outside
                } else if (['F', '7', 'L', 'J'].includes(here)) {
                    run.push(here)
                    
                    // gotta differentiate between u turns and crosses
                    if (eqArr(run, ['F', '7'])) {
                        run = []
                    } else if (eqArr(run, ['F', 'J'])) {
                        run = []
                        outside = !outside
                    } else if (eqArr(run, ['L', 'J'])) {
                        run = []
                    } else if (eqArr(run, ['L', '7'])) {
                        run = []
                        outside = !outside
                    }
                }
            } else {
                if (outside){
                    calculator[j][i] = 'o'
                } else {
                    calculator[j][i] = 'i'
                    interiorPoints ++
                }
            }
        }
    }


    printMaze(calculator)


    return interiorPoints
}

export async function day10() {

    let input = await Bun.file('day10/day10.input').text()
    input = input.trim()

    const loopLength = furthestMazePoint(input)

    const inCount = interiorCount(input)

    console.log("day10", loopLength / 2, inCount)

}
