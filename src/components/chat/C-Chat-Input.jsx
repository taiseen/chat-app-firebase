import EmojiPicker from 'emoji-picker-react';
import Icon from '../helper/Icon';
import { useState } from 'react';

const ChatInput = () => {

    const [isEmojiShow, setIsEmojiShow] = useState(false);
    const [userInputMessage, setUserInputMessage] = useState('');

    const handleEmojiClick = (e) => {
        setUserInputMessage(pre => pre + e.emoji);
        setIsEmojiShow(false)
    }

    return (
        <div className="p-4 flex items-center justify-between gap-3 border-t border-gray-700">

            <div className="iconContainer">
                <Icon imgSrc={"./img.png"} title='Image' />
                <Icon imgSrc={"./camera.png"} title='Camera' />
                <Icon imgSrc={"./mic.png"} title='Mic' />
            </div>

            <input
                type="text"
                value={userInputMessage}
                placeholder="Type message..."
                onChange={(e) => setUserInputMessage(e.target.value)}
                className="flex-1 px-2.5 py-2 outline-none border border-gray-700 rounded-md text-lg text-gray-200 bg-gray-700/50"
            />

            <div className='relative'>
                <div onClick={() => setIsEmojiShow(pre => !pre)}>
                    <Icon imgSrc={"./emoji.png"} title='Emoji' />
                </div>

                <div className={`absolute bottom-10 left-0 origin-bottom-left duration-300 z-10
                    ${isEmojiShow ? 'scale-100' : 'scale-0'}
                `}>
                    <EmojiPicker
                        theme='dark'
                        open={isEmojiShow}
                        lazyLoadEmojis={true}
                        onEmojiClick={handleEmojiClick}
  
                    // className={`!origin-bottom-left !duration-300 ${isEmojiShow ? '!scale-100' : '!scale-0'}`}
                    // style={{
                    //     transformOrigin: 'bottom left',
                    //     transitionDuration: 1,
                    //     transform: isEmojiShow ? 'scale(1)' : 'scale(0)',
                    //     transition: 'all'
                    // }}
                    />
                </div>
            </div>

            <button className="px-2.5 py-1.5 rounded outline-none border-none duration-300 bg-green-700/80 hover:bg-green-700">
                Send
            </button>

        </div>
    )
}

export default ChatInput