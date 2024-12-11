export default function handleSpaceInput(inputValue: string, inputElement: HTMLInputElement) {
  if (inputValue == " ") {
    inputElement.value = ""
    return true
  }
}
