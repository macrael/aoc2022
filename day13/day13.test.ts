import { describe, expect, test } from "bun:test"
import { findReflections, scoreReflects } from "./day13"

describe("day13", () => {
//   test("example", () => {

//     const input = `
// #.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.

// #...##..#
// #....#..#
// ..##..###
// #####.##.
// #####.##.
// ..##..###
// #....#..#
// `.trim()

//     // const input = '?###???????? 3,2,1'

//     const reflects = findReflections(input)

//     expect(reflects).toEqual([
//       ['COL', 5],
//       ['ROW', 4],
//     ])

//     const score = scoreReflects(reflects)
//     expect(score).toBe(405)

//   })

  test("smudge example", () => {

    const input = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`.trim()

    // const input = '?###???????? 3,2,1'

    const reflects = findReflections(input)

    expect(reflects).toEqual([
      ['ROW', 3],
      ['ROW', 1],
    ])

    const score = scoreReflects(reflects)
    expect(score).toBe(400)

  })

})
