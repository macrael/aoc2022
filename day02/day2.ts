import { sumNums } from "../util/sum"

interface CubeSet {
    red: number
    green: number
    blue: number
}

export function possibleGames(fullSet: CubeSet, entries: string[]): number[] {

    const validGameNumbers: number[] = []
    for (const game of entries) {
        // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        const [gameName, gameDataStr] = game.split(':')

        const [_, gameNumStr] = gameName.split(' ')
        const gameNumber = Number(gameNumStr)

        const gamePlays = gameDataStr.split(';')
        let validGame = true
        for (const gamePlay of gamePlays) {
            // 3 blue, 4 red
            const gameData: CubeSet = {
                red: 0,
                green: 0,
                blue: 0,
            }
            const draws = gamePlay.split(',')
            for (const draw of draws) {
                // 3 blue
                const trimmedDraw = draw.trim()
                const [count, color] = trimmedDraw.split(' ')

                if (color !== 'red' && color !== 'blue' && color !== 'green') {
                    throw new Error('Input Error; Color not exist: ' + color)
                }

                // console.log(count, color)
                gameData[color] = gameData[color] + Number(count)
                console.log('played', gameData)

            }

            if (!(gameData.red <= fullSet.red && gameData.blue <= fullSet.blue && gameData.green <= fullSet.green)) {
                validGame = false
            }

        }

        if (validGame) {
            validGameNumbers.push(gameNumber)
        }

        console.log(gameNumber)

    }


    return validGameNumbers
}

export function minimumGames(entries: string[]): CubeSet[] {

    const minGameSets: CubeSet[] = []
    for (const game of entries) {
        // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        const [gameName, gameDataStr] = game.split(':')

        const [_, gameNumStr] = gameName.split(' ')
        const gameNumber = Number(gameNumStr)

        const gamePlays = gameDataStr.split(';')

        const minGameSet: CubeSet = {
            red: 0,
            green: 0,
            blue: 0,
        }

        for (const gamePlay of gamePlays) {
            // 3 blue, 4 red
            const gameData: CubeSet = {
                red: 0,
                green: 0,
                blue: 0,
            }
            const draws = gamePlay.split(',')
            for (const draw of draws) {
                // 3 blue
                const trimmedDraw = draw.trim()
                const [count, color] = trimmedDraw.split(' ')

                if (color !== 'red' && color !== 'blue' && color !== 'green') {
                    throw new Error('Input Error; Color not exist: ' + color)
                }

                // console.log(count, color)
                gameData[color] = gameData[color] + Number(count)
                console.log('played', gameData)

            }

            if (gameData.red > minGameSet.red) {
                minGameSet.red = gameData.red
            }

            if (gameData.blue > minGameSet.blue) {
                minGameSet.blue = gameData.blue
            }

            if (gameData.green > minGameSet.green) {
                minGameSet.green = gameData.green
            }

        }

        minGameSets.push(minGameSet)

        console.log(gameNumber)

    }

    return minGameSets
}

export async function day02() {
    let input = await Bun.file('day02/day2.input').text()
    input = input.trim()

    const entries = input.split('\n')

    const validGames = possibleGames({red: 12, green: 13, blue: 14 }, entries)

    console.log(validGames)

    const sum = sumNums(validGames)

    console.log('Day02a: ', sum)

    const minGames = minimumGames(entries)

    const powers = minGames.map((cubeSet) => cubeSet.red * cubeSet.green * cubeSet.blue)
    
    const powerSum = sumNums(powers)

    console.log('Day2b: ', powerSum)

}
