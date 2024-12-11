import React from "react"

const InputWord = ({ onType }: { onType: (e: React.KeyboardEvent) => void }) => {
  return (
    <input
      type="text"
      id="text"
      className="bg-transparent border rounded border-zinc-400 text-xl px-2 outline-none w-48 h-10"
      autoComplete="off"
      autoFocus={true}
      spellCheck="false"
      autoCapitalize="none"
      onKeyUp={(e: React.KeyboardEvent) => onType(e)}
    />
  )
}

export default InputWord
