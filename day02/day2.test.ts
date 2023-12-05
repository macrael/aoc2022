import { describe, expect, test } from "bun:test"
import { minimumGames, possibleGames } from "./day2"

describe("day01", () => {
  test("example", () => {

    const input = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
  `.trim()

    const lines = input.split('\n')

    const validGames = possibleGames({red: 12, green: 13, blue: 14 }, lines)

    expect(validGames).toEqual([1, 2, 5])
  })

    test("min example", () => {

    const input = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
  `.trim()

    const lines = input.split('\n')

    const minGames = minimumGames(lines)

    expect(minGames[0]).toEqual({
      red: 4,
      green: 2,
      blue: 6
    })

    expect(minGames[1]).toEqual({
      red: 1,
      green: 3,
      blue: 4
    })

    expect(minGames[2]).toEqual({
      red: 20,
      green: 13,
      blue: 6
    })

    expect(minGames[3]).toEqual({
      red: 14,
      green: 3,
      blue: 15
    })

    expect(minGames[4]).toEqual({
      red: 6,
      green: 3,
      blue: 2
    })

  })
})
