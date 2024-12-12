import { Button } from "./components/ui/button";
function App() {
  return (
    <div className="h-screen text-white">
      HELLO WORLD
      <Button>click</Button>
      <Button variant={"outline"}>cancel</Button>
      <Button variant={"destructive"}>delete</Button>
    </div>
  );
}

export default App;
