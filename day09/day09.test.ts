import { describe, expect, test } from "bun:test"
import { predictSequences } from "./day09"
import { sumNums } from "../util/sum"

describe("day09", () => {
  test("example", () => {

    const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`.trim()

    const [nexts, prevs] = predictSequences(input)
    
    expect(nexts).toEqual([18, 28, 68])
    expect(prevs).toEqual([-3, 0, 5])

    expect(sumNums(nexts)).toBe(114)

  })
})
