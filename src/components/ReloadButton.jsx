import { IoReload } from "react-icons/io5"

const ReloadButton = () => {
    return (
        <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-orange-700 hover:bg-orange-600 w-10 flex justify-center items-center rounded">
            <IoReload />
        </button>
    )
}

export default ReloadButton
