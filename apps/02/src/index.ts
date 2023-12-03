import * as fs from "fs"

type CubesRevealed = {
    blue: number
    green: number
    red: number
}

type GameResult = { index: number; record: CubesRevealed[] }

function parseIndexFromText(rawText: string): number {
    const indexString = rawText.split("Game ")[1]?.split(":")[0]
    if (!indexString) {
        throw new Error("Invalid index")
    }
    return parseInt(indexString)
}

function parseGameResultFromText(rawText: string): GameResult {
    const cubesRevealed: CubesRevealed[] = []
    const index = parseIndexFromText(rawText)
    return { index, record: cubesRevealed }
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
    console.log(gameResults)
}

execute()
