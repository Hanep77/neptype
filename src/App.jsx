import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { BsGithub, BsInstagram } from "react-icons/bs"
import { IoReload } from "react-icons/io5"

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
            <div className="max-w-screen-md px-4 md:px-0 min-h-screen m-auto flex flex-col justify-center items-center">
                <div className="w-full rounded p-4 bg-zinc-800">
                    <div className="">
                        <label htmlFor="text" className="opacity-50 cursor-text h-full text-xl tracking-wider">
                            {text.map((word, i) => {
                                return i == activeWord ? <span key={i} className="bg-zinc-500 text-zinc">{word}</span> : <span key={i}> {word} </span>
                            })}
                        </label>
                    </div>
                    <div className="hidden">
                        <div className="flex items-center gap-1">
                            <h2 className="text-orange-600 text-3xl font-medium">80 KPM</h2>
                            <p className="text-zinc-400 text-sm">(kata permenit)</p>
                        </div>
                        <p className="text-zinc-400"><span className="text-green-500">491</span> | <span className="text-red-500">20</span> (511)</p>
                    </div>
                    <div className="flex justify-center mt-4 gap-1" onKeyUp={handleClick}>
                        <input type="text" id="text"
                            className="bg-transparent border rounded border-zinc-400 text-xl px-2 outline-none w-48 h-10"
                            autoComplete="off" autoFocus="on" spellCheck="false" />
                        <button type="button" className="bg-orange-700 hover:bg-orange-600 w-10 flex justify-center items-center rounded"><IoReload /></button>
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
