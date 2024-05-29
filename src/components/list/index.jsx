import UserSearch from "./UserSearch";
import ChatList from "./ChatList";
import UserInfo from "./UserInfo";

const List = () => {
    return (
        <section className='flex-1 flex flex-col'>
            <UserInfo />

            <UserSearch />

            <ChatList />
        </section>
    )
}

export default List