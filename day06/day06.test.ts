import { describe, expect, test } from "bun:test"
import { parseRaces, parseRacesWithoutSpaces, raceMinMaxes, scoreNums } from "./day06"

describe("day06", () => {
  test("example", () => {

    const input = `
Time:      7  15   30
Distance:  9  40  200
`.trim()

    const races = parseRaces(input)
    const minMaxes = raceMinMaxes(races)

    console.log(minMaxes)

    expect(minMaxes).toEqual([
        [2,5],
        [4,11],
        [11,19]
    ])

    const score = scoreNums(minMaxes)

    expect(score).toBe(288)

  })

  test("example2", () => {

    const input = `
Time:      7  15   30
Distance:  9  40  200
`.trim()

    const races = parseRacesWithoutSpaces(input)
    const minMaxes = raceMinMaxes(races)

    console.log(minMaxes)

    expect(minMaxes).toEqual([
        [14,71516],
    ])

  })

})
