import { BsGithub, BsInstagram } from "react-icons/bs"

const Credits = () => {
    return (
        <div className="mt-2 flex col gap-3 items-center">
            <p>&copy;hanep77</p>
            <div className="flex gap-1">
                <a href="https://instagram.com/hanep77"><BsInstagram /></a>
                <a href="https://github.com/hanep77"><BsGithub /></a>
            </div>
        </div>
    )
}

export default Credits
