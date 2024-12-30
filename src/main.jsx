
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Adduser from './Adduser.jsx'
import JsonCrud from './JsonCrud.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <JsonCrud /> */}
    <Router>
      <Routes>
      <Route path="/" element={<JsonCrud />} />
        <Route path="/add-user" element={<Adduser />} />
        <Route path="/adds" element={<JsonCrud />} />

      </Routes>
    </Router>
  </StrictMode>
)
