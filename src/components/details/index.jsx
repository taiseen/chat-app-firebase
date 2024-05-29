import LogoutAndBlock from "./LogoutAndBlock";
import LoginUserInfo from "./LoginUserInfo";
import PhotoItem from "./PhotoItem";
import Options from "./Options";

const Details = () => {

    return (
        <div className="flex-1 relative flexCol">

            <LoginUserInfo />

            <div className="flexCol gap-6 p-5 overflow-y-auto userSettingsScroll">

                <Options optionName='Chat Settings' />
                <Options optionName='Privacy & help' />

                <div className="option">

                    <Options optionName='Shared photos' isOpen />

                    <div className="photos flexCol gap-3 mt-4">

                        <PhotoItem />
                        <PhotoItem />
                        <PhotoItem />
                        <PhotoItem />
                        <PhotoItem />
                        <PhotoItem />

                    </div>

                </div>

                <Options optionName='Shared Files' />

            </div>

            <LogoutAndBlock />

        </div>
    )
}

export default Details