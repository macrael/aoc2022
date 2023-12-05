export function sumNums(input: number[]): number {
    const sum = input.reduce((val, acc) => {
        return acc + val
    }, 0)
    return sum
}
