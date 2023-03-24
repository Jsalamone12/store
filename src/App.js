import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard"
import Detail from "./views/Detail"
import Create from "./views/Create"
import Edit from "./views/Edit"

function App() {
  return (
    <div className="Container">
      <h1 className='text-danger'>Welcome to the Store</h1>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/stores/:_id" element={<Detail />}></Route>
        <Route path="/stores/new" element={<Create />}></Route>
        <Route path="/stores/:_id/update" element={<Edit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
