import * as fs from "fs"

function isAdjacentToSpecialCharacter(
    relevantLines: readonly [string | undefined, string, string | undefined],
    digitStart: number,
    digitEnd: number
) {
    const relevantCharacters = []
    const leftCharacter = relevantLines[1].charAt(digitStart - 1)
    if (leftCharacter) {
        relevantCharacters.push(leftCharacter)
    }

    const rightCharacter = relevantLines[1].charAt(digitEnd)
    if (rightCharacter) {
        relevantCharacters.push(rightCharacter)
    }

    if (relevantLines[0]) {
        for (let i = digitStart - 1; i < digitEnd + 1; i++) {
            relevantCharacters.push(relevantLines[0]?.charAt(i))
        }
    }

    if (relevantLines[2]) {
        for (let i = digitStart - 1; i < digitEnd + 1; i++) {
            relevantCharacters.push(relevantLines[2]?.charAt(i))
        }
    }

    const specialCharacterRegex = /[^\w\.\n]/gm

    for (const character of relevantCharacters) {
        if (specialCharacterRegex.test(character)) {
            return true
        }
    }

    return false
}

function textFileLinesToArray(filename: string) {
    const text = fs.readFileSync(filename, "utf8")
    return text.split("\n")
}

function execute() {
    const rawTextArray = textFileLinesToArray(
        "adventofcode.com_2023_day_3_input.txt"
    )

    let digitsAdjacentSum = 0
    const digitsAdjacentToSpecialCharacter = []

    const digitsRegex = /\d+/gm

    rawTextArray.forEach((line, lineIndex) => {
        const matches: {
            digits: string
            start: number
            end: number
        }[] = []

        while (true) {
            const digitsMatch = digitsRegex.exec(line)
            if (!digitsMatch) {
                return
            }

            const digits = digitsMatch[0]
            const digitsStart = digitsMatch.index
            const digitsEnd = digitsStart + digits.length

            const relevantLines = [
                rawTextArray[lineIndex - 1],
                line,
                rawTextArray[lineIndex + 1],
            ] as const

            if (
                isAdjacentToSpecialCharacter(
                    relevantLines,
                    digitsStart,
                    digitsEnd
                )
            ) {
                digitsAdjacentSum += parseInt(digits)
            }
        }
    })

    console.log(`The sum of all adjacent digits is ${digitsAdjacentSum}`)
}

execute()
