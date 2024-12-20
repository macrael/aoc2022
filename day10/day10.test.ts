import { describe, expect, test } from "bun:test"
import { furthestMazePoint, interiorCount } from "./day10"

describe("day09", () => {
  test("example", () => {

    const input = `
-L|F7
7S-7|
L|7||
-L-J|
L|-JF
`.trim()

    const length = furthestMazePoint(input)

    expect(length).toBe(8)

  })

  test("example2", () => {

    const input = `
7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ
`.trim()

    const length = furthestMazePoint(input)

    expect(length).toBe(16)

  })

  test("count first ex", () => {

    const input = `
-L|F7
7S-7|
L|7||
-L-J|
L|-JF
`.trim()

    const length = interiorCount(input)

    expect(length).toBe(1)

  })

  test("count first ex", () => {

    const input = `
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`.trim()

    const length = interiorCount(input)

    expect(length).toBe(4)

  })

  test("count second ex", () => {

    const input = `
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
`.trim()

    const length = interiorCount(input)

    expect(length).toBe(8)

  })

  test("count third ex", () => {

    const input = `
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`.trim()

    const length = interiorCount(input)

    expect(length).toBe(10)

  })

})
