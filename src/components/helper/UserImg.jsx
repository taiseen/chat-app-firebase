const UserImg = ({ imgSrc, title }) => {
    return (
        <img
            alt={title}
            src={imgSrc}
            className="w-12 h-12 rounded-full object-cover"
        />
    )
}

export default UserImg