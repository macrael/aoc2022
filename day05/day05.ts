// we need to operate on ranges, not on individual numbers.

// almap(range): range[]

interface Range {
    start: number,
    len: number,
}

type Almap = Map<number, AlmapEntry>

interface AlmapEntry {
    src: number,
    dst: number,
    len: number
}

export function paraseAlmap(mapString: string): Almap {
    const lines = mapString.split('\n')
    const map: Almap = new Map<number, AlmapEntry>
    for (let i = 1; i < lines.length; i++) {
        const nums = lines[i].split(' ').map(Number)
        const entry = {dst: nums[0], src: nums[1], len: nums[2]}
        map.set(entry.src, entry)
    } 

    return map
}

// we pass in a range of __ and get out a list of ranges of ___
export function almapRange(map: Almap, range: Range): Range[] {

    const sources = [...map.keys()].sort()

    const outRanges = []

    let start = range.start
    let remaning = range.len
    for (const source of sources) {
        const entry = map.get(source)!
        console.log('checking source', start, remaning, source, entry.len)

        // we are starting BEFORE an entry
        if (start < source) {
            const diff = source - start

            if (remaning < diff) {
                // we're done
                outRanges.push({start, len: remaning})
                return outRanges
            }

            // we are getting into this map range, preserve the un-mapped start.
            outRanges.push({start, len: diff})
            start = source
            remaning -= diff
        } 

        if (start >= source && start < source + entry.len) {
            // we're inside this map entry

            // source ... start ... (len ... remaining)
            // how much map entry is after our start
            const mapLenFromStart = entry.len - (start - source)

            if (mapLenFromStart >= remaning) {
                console.log('should be full yinsde')
                // we're done, fully inside this entry
                const diff = entry.dst - entry.src
                outRanges.push({start: start + diff, len: remaning})
                return outRanges
            }

            // otherwise, our range extends past this map entry.
            const diff = entry.dst - entry.src
            outRanges.push({start: start + diff, len: mapLenFromStart})

            start = entry.src + entry.len
            remaning -= mapLenFromStart
        }
    }

    // we went out past the last range with no mods. 
    outRanges.push({start, len: remaning})
    return outRanges

}

function almapRanges(map: Almap, ranges: Range[]): Range[] {

    let finalRanges: Range[] = []
    for (const range of ranges) {
        finalRanges = finalRanges.concat(almapRange(map, range))
    }

    return finalRanges
}

export function almapNum(map: Almap, num: number): number {

    const sources = [...map.keys()].sort()

    for (const source of sources) {
        const entry = map.get(source)!
        // console.log(num, source, entry.len)
        if (num >= source && num < source + entry.len) {
            // we're in a range
            const diff = entry.dst - entry.src
            return num + diff
        }
    }

    return num
}

export function seedLocations(almanac: string): number[] {

    // parse out all the things
    const [
        seedsString,
        seedSoilString,
        soilFertString,
        fertWaterString,
        waterLightString,
        lightTempString,
        tempHumidityString,
        humidityLocString,
    ] = almanac.split('\n\n')

    console.log(seedsString)
    const [_, seedNumsString] = seedsString.split(':')
    const seeds = seedNumsString.trim().split(' ').map(Number)
    console.log(seeds)

    const seedSoilMap = paraseAlmap(seedSoilString)
    const soilFertMap = paraseAlmap(soilFertString)
    const fertWaterMap = paraseAlmap(fertWaterString)
    const waterLightMap = paraseAlmap(waterLightString)
    const lightTempMap = paraseAlmap(lightTempString)
    const tempHumidityMap = paraseAlmap(tempHumidityString)
    const humidityLocMap = paraseAlmap(humidityLocString)

    // pull out our initial list of seed ranges
    const seedRanges: Range[] = []
    for (let i = 0; i < seeds.length / 2; i ++) {

        const initialSeed = seeds[i*2]
        const seedLen = seeds[i*2 + 1]

        seedRanges.push({start: initialSeed, len: seedLen})
    }

    // let the ranges flow
    const soil = almapRanges(seedSoilMap, seedRanges)
    const fert = almapRanges(soilFertMap, soil)
    const water = almapRanges(fertWaterMap, fert)
    const light = almapRanges(waterLightMap, water)
    const temp = almapRanges(lightTempMap, light)
    const humidty = almapRanges(tempHumidityMap, temp)
    const location = almapRanges(humidityLocMap, humidty)

    console.log('locations, ', location)

    const lowerBounds = location.map(r => r.start)

    return lowerBounds
}


export async function day05() {
    let input = await Bun.file('day05/day05.input').text()
    input = input.trim()

    const locs = seedLocations(input)

    console.log('locs', locs)

    const min = Math.min(...locs)

    console.log('day05 Min: ', min)

}
