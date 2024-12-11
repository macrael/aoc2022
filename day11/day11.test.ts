import { describe, expect, test } from "bun:test"
import { shortestPath } from "./day11"

describe("day11", () => {
  test("example", () => {

    const input = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`.trim()

    const length = shortestPath(input)

    expect(length).toBe(374)

  })

})
