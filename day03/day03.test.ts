import { describe, expect, test } from "bun:test"
import { findEngineParts, findGearRatios } from "./day03"

describe("day03", () => {
  test("example", () => {

    const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.trim()

    const adjacentNums = findEngineParts(input)


    expect(adjacentNums.sort()).toEqual([467, 35, 633, 617, 592, 755, 664, 598].sort())
  })

  test("example ratios", () => {

    const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`.trim()

    const ratios = findGearRatios(input)


    expect(ratios).toEqual([16345, 451490])
  })

})
