interface TextType {
  text: Array<string>,
  activeWord: number,
  correct: Array<{ index: number, value: string }>,
  incorrect: Array<{ index: number, value: string }>,
  warning: number | null
}

const Text = ({ text, activeWord, correct, incorrect, warning }: TextType) => {
  return (
    <div>
      <label htmlFor="text" className="cursor-text h-full text-xl tracking-wider">
        {text.map((word: string, i: number) => {
          return i == activeWord ? <span key={i} className={`${warning == i ? "bg-red-700" : "bg-zinc-500 opacity-50"}`}>{word}</span> :
            <span key={i} className={correct.some(c => c.index == i) ? "text-green-500" : incorrect.some(c => c.index == i) ? "text-red-500" : "opacity-50 "}> {word} </span>
        })}
      </label>
    </div>
  )
}

export default Text
