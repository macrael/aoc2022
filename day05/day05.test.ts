import { describe, expect, test } from "bun:test"
import { almapNum, almapRange, paraseAlmap, seedLocations } from "./day05"

describe("day05", () => {
  test("example", () => {

    const input = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`.trim()

    const locations = seedLocations(input)

    console.log(locations)

    expect(Math.min(...locations)).toBe(46)
  })

  test("mapper", () => {

    const seedSoilString = `
seed-to-soil map:
50 98 2
52 50 48
`.trim()

    const seedSoilMap = paraseAlmap(seedSoilString)

    console.log(seedSoilMap)
    
    expect(almapRange(seedSoilMap, {start: 79, len: 14})).toEqual([
      { start: 81, len: 14}
    ])

    expect(almapRange(seedSoilMap, {start: 55, len: 13})).toEqual([
      { start: 57, len: 13}
    ])

    expect(almapRange(seedSoilMap, {start: 45, len: 10})).toEqual([
      { start: 45, len: 5},
      { start: 52, len: 5},
    ])

    expect(almapRange(seedSoilMap, {start: 45, len: 100})).toEqual([
      { start: 45, len: 5},
      { start: 52, len: 48},
      { start: 50, len: 2},
      { start: 100, len: 45},
    ])

    expect(almapRange(seedSoilMap, {start: 45, len: 54})).toEqual([
      { start: 45, len: 5},
      { start: 52, len: 48},
      { start: 50, len: 1},
    ])

  })

  test("range mapper", () => {

    const seedSoilString = `
seed-to-soil map:
50 98 2
52 50 48
`.trim()

    const seedSoilMap = paraseAlmap(seedSoilString)

    console.log(seedSoilMap)

    expect(almapNum(seedSoilMap, 0)).toEqual(0)
    expect(almapNum(seedSoilMap, 1)).toEqual(1)

    expect(almapNum(seedSoilMap, 48)).toEqual(48)
    expect(almapNum(seedSoilMap, 49)).toEqual(49)
    expect(almapNum(seedSoilMap, 50)).toEqual(52)
    expect(almapNum(seedSoilMap, 51)).toEqual(53)

    expect(almapNum(seedSoilMap, 96)).toEqual(98)
    expect(almapNum(seedSoilMap, 97)).toEqual(99)
    expect(almapNum(seedSoilMap, 98)).toEqual(50)
    expect(almapNum(seedSoilMap, 99)).toEqual(51)
    expect(almapNum(seedSoilMap, 100)).toEqual(100)
  })

})
