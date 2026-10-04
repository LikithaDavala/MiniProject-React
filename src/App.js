import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import RegisterPage from './Pages/registerPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='register' element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

