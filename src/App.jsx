import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { BsGithub, BsInstagram } from "react-icons/bs"
import { IoReload } from "react-icons/io5"
import { Analytics } from "@vercel/analytics/react"

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
            const shuffledWords = response.data.words.sort((a, b) => 0.5 - Math.random())
            const hmm = shuffledWords.filter((_, i) => i < 38)
            setText(hmm)
        })
    }, [])

    const handleType = (e) => {
        setWarning(null)
        if (e.key == "Tab") return

        if (!dateStart) {
            setDateStart(Date.now())
        }

        if (e.keyCode == 32 || e.target.value[e.target.value.length - 1] == " ") {
            if (e.target.value !== " ") {
                setActiveWord(prev => prev + 1)
            }

            const currentValue = { index: activeWord, value: text[activeWord] }
            if (text[activeWord] + " " == e.target.value) {
                setCorrect([...correct, currentValue])
            } else {
                setIncorrect([...incorrect, currentValue])
            }

            e.target.value = ""

            if (activeWord > text.length - 2) {
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
                return
            }
        } else {
            if (score) return
            let value = text[activeWord].slice(0, e.target.value.length);
            value += " "

            if (!value.includes(e.target.value)) {
                setWarning(activeWord)
            }
        }
    }

    return (
        <>
            <Analicics />
            <div className="max-w-screen-md px-4 md:px-0 min-h-screen m-auto flex flex-col justify-center items-center">
                <div className="w-full rounded p-4 bg-zinc-800">
                    <div className={score && "hidden"}>
                        <label htmlFor="text" className="cursor-text h-full text-xl tracking-wider">
                            {text.map((word, i) => {
                                return i == activeWord ? <span key={i} className={`${warning == i ? "bg-red-700" : "bg-zinc-500 opacity-50"}`}>{word}</span> :
                                    <span key={i} className={correct.some(c => c.index == i) ? "text-green-500" : incorrect.some(c => c.index == i) ? "text-red-500" : "opacity-50 "}> {word} </span>
                            })}
                        </label>
                    </div>
                    <div className={!score && "hidden"}>
                        <div className="flex items-center gap-1">
                            <h2 className="text-orange-600 text-3xl font-medium">{score} KPM</h2>
                            <p className="text-zinc-400 text-sm">(kata permenit)</p>
                        </div>
                        <p className="text-zinc-400">
                            <span className="text-green-500">
                                {correct.map(c => c.value).join(" ").length}</span> | <span className="text-red-500">
                                {incorrect.map(c => c.value).join(" ").length}</span> ({correct.map(c => c.value).join(" ").length + incorrect.map(c => c.value).join(" ").length}
                            )
                        </p>
                    </div>
                    <div className="flex justify-center mt-4 gap-1" onKeyUp={handleType}>
                        <input type="text" id="text"
                            className="bg-transparent border rounded border-zinc-400 text-xl px-2 outline-none w-48 h-10"
                            autoComplete="off" autoFocus="on" spellCheck="false" autoCapitalize="none" />
                        <button type="button" onClick={() => window.location.reload()} className="bg-orange-700 hover:bg-orange-600 w-10 flex justify-center items-center rounded"><IoReload /></button>
                    </div>
                </div>
                <div className="mt-2 flex col gap-3 items-center">
                    <p>&copy;hanep77</p>
                    <div className="flex gap-1">
                        <a href="https://instagram.com/hanep77"><BsInstagram /></a>
                        <a href="https://github.com/hanep77"><BsGithub /></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
