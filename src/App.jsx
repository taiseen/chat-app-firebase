import Details from "./components/details";
import List from "./components/list";
import Chat from "./components/chat";

const App = () => {

  return (
    <div className="w-[90vw] h-[90vh] mainContainer flex rounded text-gray-200">

      <List />

      <Chat />

      <Details />

    </div>
  )
}

export default App