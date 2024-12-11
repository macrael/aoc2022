import { describe, expect, test } from "bun:test"
import { compareHands, handRank, scoreRankedHandBids, sortHandBids } from "./day07"

describe("day06", () => {
  test("example", () => {

    const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`.trim()

    const handBids = input.split('\n')
    
    const sortedHandBids = sortHandBids(handBids)

    expect(sortedHandBids).toEqual([
      '32T3K 765',
      'KK677 28',
      'T55J5 684',
      'QQQJA 483',
      'KTJJT 220',
    ])

    const score = scoreRankedHandBids(sortedHandBids)

    expect(score).toBe(5905)

  })

  test("ranker", () => {

    expect(handRank('AAAAA')).toBe(1)
    expect(handRank('AAAA2')).toBe(2)
    expect(handRank('AAA22')).toBe(3)
    expect(handRank('AAA23')).toBe(4)
    expect(handRank('AA223')).toBe(5)
    expect(handRank('AA234')).toBe(6)
    expect(handRank('A2345')).toBe(7)


    expect(handRank('JJJJJ')).toBe(1)
    expect(handRank('J2JJJJ')).toBe(1)
    expect(handRank('JJJ22')).toBe(1)
    expect(handRank('JJJ23')).toBe(2)
    expect(handRank('JJ223')).toBe(2)
    expect(handRank('JJ234')).toBe(4)
    expect(handRank('J2345')).toBe(6)

    expect(handRank('AJJAA')).toBe(1)
    expect(handRank('AAAAJ')).toBe(1)
    expect(handRank('AAAJJ')).toBe(1)
    expect(handRank('AAAJ3')).toBe(2)
    expect(handRank('AAJJ3')).toBe(2)
    expect(handRank('AA22J')).toBe(3)
    expect(handRank('AAJ34')).toBe(4)
    expect(handRank('AJ345')).toBe(6)

    const testHands = [
      '33333',
      'JJJJJ',
      '22222',
    ]

    const sorted = testHands.sort(compareHands)

    expect(sorted).toEqual([
      "JJJJJ",
      "22222",
      "33333"
    ]) 

  })

})
