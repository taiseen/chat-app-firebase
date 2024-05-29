const PhotoItem = () => {

    const imgUrl = 'https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load';
    
    return (
        <div className="photoItem flex items-center justify-between">
            <div className="photoDetail flex items-center gap-5">
                <img
                    className="size-10 rounded object-cover"
                    src={imgUrl}
                    alt=""
                />
                <span className="text-sm text-gray-300 ">photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="" className="size-8 p-2.5 rounded cursor-pointer bg-gray-700/70" />
        </div>
    )
}

export default PhotoItem