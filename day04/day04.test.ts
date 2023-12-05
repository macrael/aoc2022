import { describe, expect, test } from "bun:test"
import { countCards, scoreCards, scratchCardCounts } from "./day04"

describe("day04", () => {
  test("example", () => {

    const input = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
Card 193: 87 90 72 76 10 83 41  6 54 23 | 23 18  1 76 93 88 96 72  7 31 20 90 68 30 39 40 44 11 35  3 78 54 17 46 60
`.trim()

    const values = scoreCards(scratchCardCounts(input))

    expect(values).toEqual([8, 2, 2, 1, 0, 0, 16])
  })

  test("example counter", () => {

    const input = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`.trim()

    const count = countCards(scratchCardCounts(input))

    expect(count).toEqual(30)
  })

})
