import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Form from './Components/Form';
import Table from './Components/Table';
import Update from './Components/Update';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/view' element={<Table />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
