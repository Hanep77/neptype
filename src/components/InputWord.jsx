const InputWord = ({ onType }) => {
    return (
        <input
            type="text"
            id="text"
            className="bg-transparent border rounded border-zinc-400 text-xl px-2 outline-none w-48 h-10"
            autoComplete="off"
            autoFocus="on"
            spellCheck="false"
            autoCapitalize="none"
            onKeyUp={onType}
        />
    )
}

export default InputWord
