import { describe, expect, test } from "bun:test"
import { followMap, followMapGhosts } from "./day08"

describe("day06", () => {
  test("example", () => {

    const input = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`.trim()

    const steps = followMap(input)
    
    expect(steps).toBe(2)

  })

  test("example2", () => {

    const input = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`.trim()

    const steps = followMap(input)
    
    expect(steps).toBe(6)

  })

    test("part 2 ex", () => {

    const input = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`.trim()

    const steps = followMapGhosts(input)
    
    expect(steps).toBe(6)

  })

})
