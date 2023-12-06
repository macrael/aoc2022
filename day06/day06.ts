interface Race {
    duration: number
    record: number
}


//Time:      7  15   30
//Distance:  9  40  200
export function parseRaces(racesString: string): Race[] {
    const [timesLine, distancesLine] = racesString.split('\n')

    const digitRx = /\d+/g
    const times = [...timesLine.matchAll(digitRx)].map(Number)
    const distances = [...distancesLine.matchAll(digitRx)].map(Number)

    console.log('times', times)
    console.log('dists', distances)

    const races = []
    for (let i = 0; i < times.length; i++) {
        races.push({duration: times[i], record: distances[i]})
    }

    return races

}

export function parseRacesWithoutSpaces(racesString: string): Race[] {
    const [timesLine, distancesLine] = racesString.split('\n')

    const digitRx = /\d+/g
    const time = Number([...timesLine.matchAll(digitRx)].reduce((n, acc) => n + acc, ''))
    const distance = Number([...distancesLine.matchAll(digitRx)].reduce((n, acc) => n + acc, ''))

    return [{duration: time, record: distance}]

}

function solveRace(race: Race): number[] {
    // math. 
    // time = pushTime + runTime
    // dist = pushTime * runTime
    // bounds = dist == record
    // record = (time - pushTime) * pushTime
    // record = tp - p^2
    // 0 = tp - p^2 - record
    // 0 = -p^2 + tp - record

    // x1 = (-b +/- sqrt(b2-4ac))/2a
    // a = -1
    // b = time
    // c = -record

    const a = -1
    const b = race.duration
    const c = -race.record

    const minX = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c )) / 2 * a
    const maxX = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c )) / 2 * a


    let ceilX = Math.ceil(minX)
    let floorX = Math.floor(maxX)

    console.log('FD', minX, maxX)

    if (ceilX === minX) {
        ceilX = ceilX + 1
    }

    if (floorX === maxX) {
        floorX = floorX - 1
    }

    console.log('ANS', [ceilX, floorX], floorX - ceilX)

    return [ceilX, floorX]
}

//Time:      7  15   30
//Distance:  9  40  200
export function raceMinMaxes(races: Race[]): number[][] {

    const minmaxes = races.map(solveRace)

    return minmaxes
}

function multNums(nums: number[]): number {
    return nums.reduce((n, acc) => n * acc, 1)
}

export function scoreNums(minmaxes: number[][]): number {
    const diffs = minmaxes.map((minmax) => minmax[1] - minmax[0] + 1)
    const mult = multNums(diffs)
    return mult
}

export async function day06() {
    let input = await Bun.file('day06/day06.input').text()
    input = input.trim()

    const shortRaces = parseRaces(input)
    const minmaxes = raceMinMaxes(shortRaces)

    const fullRaces = parseRacesWithoutSpaces(input)
    const fullMinMaxes = raceMinMaxes(fullRaces)

    const score = scoreNums(minmaxes)

    const fullDiff = fullMinMaxes[0][1] - fullMinMaxes[0][0] + 1

    console.log('day06:', score)
    console.log('day062: ', fullDiff)

}
