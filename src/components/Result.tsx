interface ResultType {
  score: number,
  correct: Array<{ index: number, value: string }>,
  incorrect: Array<{ index: number, value: string }>
}

const Result = ({ score, correct, incorrect }: ResultType) => {
  const totalCorrect = correct.map(c => c.value).join(" ").length
  const totalIncorrect = incorrect.map(c => c.value).join(" ").length
  const totalChar = totalCorrect + totalIncorrect

  return (
    <div>
      <div className="flex items-center gap-1">
        <h2 className="text-orange-600 text-3xl font-medium">{score} KPM</h2>
        <p className="text-zinc-400 text-sm">(kata permenit)</p>
      </div>
      <p className="text-zinc-400">
        <span className="text-green-500">
          {totalCorrect}</span> | <span className="text-red-500">{totalIncorrect}</span> ({totalChar})
      </p>
    </div>
  )
}

export default Result
