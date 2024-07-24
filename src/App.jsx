import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Analytics } from "@vercel/analytics/react"
import Text from "./components/Text"
import Result from "./components/Result"
import InputWord from "./components/InputWord"
import ReloadButton from "./components/ReloadButton"
import Credits from "./components/Credits"

function App() {
    const [text, setText] = useState([])
    const [activeWord, setActiveWord] = useState(0)
    const [correct, setCorrect] = useState([])
    const [incorrect, setIncorrect] = useState([])
    const [warning, setWarning] = useState(null)
    const [score, setScore] = useState(0)
    const [dateStart, setDateStart] = useState(null)

    useEffect(() => {
        axios.get("data.json").then(response => {
            const shuffledWords = response.data.words.sort(() => 0.5 - Math.random())
            const data = shuffledWords.filter((_, i) => i < 38)
            setText(data)
        })
    }, [])

    const handleType = (e) => {
        const inputValue = e.target.value

        if (e.key == "Tab") return

        // set start time
        if (!dateStart) setDateStart(Date.now())

        if (inputValue == " ") {
            e.target.value = ""
            return
        }

        if (inputValue.includes(" ")) {
            const currentValue = { index: activeWord, value: text[activeWord] }

            if (currentValue.value + " " == inputValue) {
                setCorrect([...correct, currentValue])
            } else {
                setIncorrect([...incorrect, currentValue])
            }

            setActiveWord(prev => prev + 1)
            e.target.value = ""

            // finish the test
            if (activeWord >= text.length - 1) {
                if (score) return

                let finalCorrectValue = correct
                let finalIncorrectValue = incorrect

                if (currentValue.value == text[activeWord]) {
                    finalCorrectValue = [...correct, currentValue]
                } else {
                    finalIncorrectValue = [...incorrect, currentValue]
                }

                const correctNumberLength = finalCorrectValue.map(c => c.value).join(" ").length
                const typingTime = (Date.now() - dateStart) / 1000
                setScore(Math.round(((correctNumberLength / 5) / typingTime) * 60))
            }

            return
        }

        // check wrong character
        if (!score && !inputValue.includes(" ")) {
            let value = text[activeWord].slice(0, inputValue.length);
            setWarning(null)
            if (!value.includes(inputValue)) {
                setWarning(activeWord)
            }
        }
    }

    return (
        <>
            <Analytics />
            <div className="max-w-screen-md px-4 md:px-0 min-h-screen m-auto flex flex-col justify-center items-center">
                <div className="w-full rounded p-4 bg-zinc-800">
                    {score ?
                        <Result score={score} correct={correct} incorrect={incorrect} /> :
                        <Text text={text} activeWord={activeWord} correct={correct} incorrect={incorrect} warning={warning} />
                    }
                    <div className="flex justify-center mt-4 gap-1">
                        <InputWord onType={handleType} />
                        <ReloadButton />
                    </div>
                </div>
                <Credits />
            </div>
        </>
    )
}

export default App
