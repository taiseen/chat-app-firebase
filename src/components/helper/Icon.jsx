import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const Icon = ({ imgSrc, title }) => {
    return (
        <Tippy content={<span className="text-green-300">{title}</span>}>
            <img src={imgSrc} alt={title} className="icon" />
        </Tippy>
    )
}

export default Icon