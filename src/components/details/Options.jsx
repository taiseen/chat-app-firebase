const Options = ({ optionName, isOpen }) => {

    return (
        <div className="flex items-center justify-between">
            <span>{optionName}</span>

            <img
                alt=""
                src={isOpen ? './arrowDown.png' : "./arrowUp.png"}
                className="size-8 p-2.5 rounded-full cursor-pointer bg-gray-700/70"
            />
        </div>
    )
}

export default Options