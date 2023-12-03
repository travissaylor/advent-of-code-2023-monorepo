import * as fs from "fs"

const filepath = "./adventofcode.com_2023_day_1_input.txt"

const wordNumberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
} as const

function assertWordNumber(
    wordNumber: string | undefined
): asserts wordNumber is keyof typeof wordNumberMap {
    if (!wordNumber || !(wordNumber in wordNumberMap)) {
        throw new Error(`Word number not found: ${wordNumber}`)
    }
}

function textLineToCalibrationValue(text: string) {
    const regex =
        /((?:f(?:ive|our)|s(?:even|ix)|t(?:hree|wo)|(?:ni|o)ne|eight)|\d)/gm

    const matches = text.match(regex)
    if (!matches || matches.length === 0 || !matches[0]) {
        throw new Error(`No matches found in text: ${text}`)
    }

    const firstMatch = matches[0]
    assertWordNumber(firstMatch)
    const first = wordNumberMap[firstMatch]
    const lastMatch = matches[matches.length - 1]
    assertWordNumber(lastMatch)
    const last = wordNumberMap[lastMatch]

    const stringNumber = `${first}${last}`
    return parseInt(stringNumber)
}

function replaceLetterSharingNumbers(text: string) {
    text = text.replaceAll("eightwo", "82")
    text = text.replaceAll("eighthree", "83")
    text = text.replaceAll("sevenine", "79")
    text = text.replaceAll("twone", "21")
    text = text.replaceAll("fiveight", "58")
    text = text.replaceAll("oneight", "18")
    text = text.replaceAll("threeight", "38")
    text = text.replaceAll("nineight", "98")
    return text
}

function getStringArrayFromTextFile(filepath: string) {
    const fullTextString = fs.readFileSync(filepath, "utf-8")
    const fullTextStringWithoutLetterSharingNumbers =
        replaceLetterSharingNumbers(fullTextString)
    return fullTextStringWithoutLetterSharingNumbers.split("\n")
}

function execute() {
    const rawCalibrationTextValues = getStringArrayFromTextFile(filepath)

    fs.writeFileSync("./adventofcode.com_2023_day_1_output.txt", "")
    const calibrationValueSum = rawCalibrationTextValues.reduce(
        (sum, value) => {
            const valueNumber = textLineToCalibrationValue(value)
            fs.appendFileSync(
                "./adventofcode.com_2023_day_1_output.txt",
                `${valueNumber} : ${value}\n`
            )
            return sum + valueNumber
        },
        0
    )
    console.log(`Calibration Value Sum: ${calibrationValueSum}`)
}

execute()
