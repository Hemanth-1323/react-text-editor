import "./App.css";
import { motion } from "framer-motion";
import TextEditor from "./components/TextEditor";
function App() {
  return (
    <div>
      <motion.div
        whileInView={{ opacity: 1, x: 50 }}
        initial={{ opacity: 0, x: -1000 }}
        transition={{ duration: 1 }}
        className="container"
      >
        <h1>Text Editor</h1>
        <div className="App">
          <TextEditor />
        </div>
      </motion.div>
    </div>
  );
}

export default App;
