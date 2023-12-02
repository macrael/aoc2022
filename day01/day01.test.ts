import { describe, expect, test } from "bun:test"
import { day01, extractCalibrationValues, sumNums } from "./day01"

describe("day01", () => {
  test("example", () => {

    const example = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`.trim()
    
    const result = extractCalibrationValues(example)

    expect(result).toEqual([12, 38, 15, 77])
  })

    test("example2", () => {

    const example = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`.trim()
    
    const result = extractCalibrationValues(example)
    const sum = sumNums(result)

    expect(result).toEqual([29, 83, 13, 24, 42, 14, 76])
    expect(sum).toBe(281)


  })

    test("spotcheck", () => {

    const example = `
stmpvhnssixtwoffnhpn25
45fourbpsghkqxqm9fmvhssbntdtwo64
nine835four
leightwothreesevenlhlmqcgcpfour9
fgsfsqgkcctzcltpvpjhlb5eight4one
four9four184five9
67seven7twobdcltwonenh
nsdbone5two16
`.trim()
    
    const result = extractCalibrationValues(example)

    expect(result).toEqual([65, 44, 94, 89, 51, 49, 61, 16])
  })

  test("spotcheck2", () => {

    const example = `
one65kzsspzjhcsln
bmnfzmhptzgmgjk1sevenfive824
3zthjdsix9geightsixeightfour
jvhhrkrnhfivenineonethree3sixninegplzthbxj
boneightthreeqdglvf74
13dmktbhp
8ninetwo
8eight87l
six5xhrtbhdmhpbpqqsfjjninesix8seven
lznlvseventd819qkq9
55
onevqgp3six
8gc8
seveneight8fivesixczbqpjdhxnschd1
`.trim()
    
    const result = extractCalibrationValues(example)

    expect(result).toEqual([15, 14, 34, 59, 14, 13, 82, 87, 67, 79, 55, 16, 88, 71])
  })

  test("spotcheck3", () => {

    const example = `
fiveckknnzhdtm793
seven2cbtkqzs861cbfgssfqtd
sixvdtzsixthree4lchxtdkv
1vvssfvlfbg2eightmxbqbvgsixnine
nineeightjlngjz94t7
lpncsfkn7fsgvkl
583sevenhjxlqzjgbzxhkcl5
81s
2four3threesxxvlfqfive4
nine6eightsevenzx9twoxc
hmbfjdfnp989mfivefiverpzrjs
`.trim()
    
    const result = extractCalibrationValues(example)

    expect(result).toEqual([53, 71, 64, 19, 97, 77, 55, 81, 24, 92, 95])
  })

  test("bullshit", () => {

    const example = `
threeight
fiveight
jthreeeight51sixqlvgvm
pcg91vqrfpxxzzzoneightzt
`.trim()
    
    const result = extractCalibrationValues(example)

    expect(result).toEqual([38, 58, 36, 98])
  })

  // test("findBug", () => {

  //   day01()

  //   expect(1).toEqual(2)
  // })

})
