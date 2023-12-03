import * as fs from "fs"

const maxCubesAlled: CubesRevealed = {
    blue: 14,
    green: 13,
    red: 12,
} as const

type CubesRevealed = {
    blue: number
    green: number
    red: number
}

type GameResult = { id: number; record: CubesRevealed }

function assertColor(
    color: string | undefined
): asserts color is keyof CubesRevealed {
    if (!color || !["blue", "green", "red"].includes(color)) {
        throw new Error("Invalid color")
    }
}

function parseCubesRevealedFromText(rawText: string): CubesRevealed {
    const allCubesRevealedString = rawText.split(": ")[1]
    if (!allCubesRevealedString) {
        throw new Error("Invalid cubes revealed")
    }
    const allCubesRevealedArray = allCubesRevealedString.split("; ")
    const largestCubesRevealed: CubesRevealed = {
        blue: 0,
        green: 0,
        red: 0,
    }

    allCubesRevealedArray.forEach((cubesRevealedString) => {
        const cubesRevealedArray = cubesRevealedString.split(", ")
        cubesRevealedArray.forEach((cubeRevealedString) => {
            const [numberString, color] = cubeRevealedString.split(" ")
            if (!numberString || !color) {
                throw new Error("Invalid cube revealed")
            }
            assertColor(color)
            const number = parseInt(numberString)
            if (number > largestCubesRevealed[color]) {
                largestCubesRevealed[color] = number
            }
        })
        return largestCubesRevealed
    })

    return largestCubesRevealed
}

function parseIdFromText(rawText: string): number {
    const indexString = rawText.split("Game ")[1]?.split(":")[0]
    if (!indexString) {
        throw new Error("Invalid index")
    }
    return parseInt(indexString)
}

function parseGameResultFromText(rawText: string): GameResult {
    const cubesRevealed = parseCubesRevealedFromText(rawText)
    const id = parseIdFromText(rawText)
    return { id, record: cubesRevealed }
}

function getPowerSumFromResults(results: GameResult[]): number {
    let powerSum = 0
    results.forEach((result) => {
        const { record } = result
        powerSum += record.blue * record.green * record.red
    })
    return powerSum
}

function ValidGamesSumFromResults(results: GameResult[]): number {
    let validGamesSum = 0
    results.forEach((result) => {
        const { record } = result
        const isBlueValid = record.blue <= maxCubesAlled.blue
        const isGreenValid = record.green <= maxCubesAlled.green
        const isRedValid = record.red <= maxCubesAlled.red
        if (isBlueValid && isGreenValid && isRedValid) {
            validGamesSum += result.id
        }
    })
    return validGamesSum
}

function getGameResults(rawTextResults: string[]): GameResult[] {
    return rawTextResults.map(parseGameResultFromText)
}

function textFileToArray(filename: string) {
    const text = fs.readFileSync(filename, "utf8")
    return text.split("\n")
}

function execute() {
    const rawTextResults = textFileToArray(
        "adventofcode.com_2023_day_2_input.txt"
    )
    const gameResults = getGameResults(rawTextResults)
    const validGamesSum = ValidGamesSumFromResults(gameResults)
    const powerSum = getPowerSumFromResults(gameResults)

    console.log(`Valid Games Sum: ${validGamesSum}`)
    console.log(`Power Sum: ${powerSum}`)
}

execute()
