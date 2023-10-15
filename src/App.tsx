import "./App.css";
import Grid from "./components/Grid";
import testImage from "./assets/test.jpg";

function App() {
  return (
    <main>
      <Grid image={testImage} />
    </main>
  );
}

export default App;
