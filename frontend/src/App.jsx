// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './Layout';
// import Analyze from './pages/Analyze';
// import History from './pages/History';
// import About from './pages/About';
// import Privacy from './pages/Privacy';

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// src/App.jsx
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './Layout';
// import Analyze from './pages/Analyze';
// import History from './pages/History';
// import About from './pages/About';
// import Privacy from './pages/Privacy';

// function App() {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           {/* Redirect "/" to "/analyze" */}
//           <Route path="/" element={<Navigate to="/analyze" replace />} />
//           <Route path="/analyze" element={<Analyze />} />
//           <Route path="/history" element={<History />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/privacy" element={<Privacy />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }

// export default App;







import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Analyze from './pages/Analyze';
import History from './pages/History';
import About from './pages/About';
import Privacy from './pages/Privacy';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/analyze" replace />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
