import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

function App() {
    const [text, setText] = useState([])
    const [activeWord, setActiveWord] = useState(0)

    useEffect(() => {
        axios.get("data.json").then(response => {
            const hmm = response.data.words.filter((_, i) => i < 38)
            setText(hmm)
        })
    }, [])

    const handleClick = (e) => {
        if (e.key == " ") {
            if (e.target.value !== " ") {
                setActiveWord(prev => prev + 1)
            }

            e.target.value = ""

            if (activeWord > text.length - 2) {
                console.log("done")
                return
            }
        }
    }

    return (
        <>
            <div className="max-w-screen-md px-4 md:px-0 min-h-screen m-auto flex justify-center items-center">
                <div className="w-full rounded p-2">
                    <div>
                        <label htmlFor="text" className="opacity-50 cursor-text h-full text-xl tracking-wider">
                            {text.map((word, i) => {
                                return i == activeWord ? <span key={i} className="bg-zinc-500 text-zinc">{word}</span> : <span key={i}> {word} </span>
                            })}
                        </label>
                    </div>
                    <div className="flex justify-center mt-8" onKeyUp={handleClick}>
                        <input type="text" id="text"
                            className="bg-transparent border rounded border-zinc-400 text-xl px-2 outline-none w-48 h-10"
                            autoComplete="off" autoFocus="on" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
