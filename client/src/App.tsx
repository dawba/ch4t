// import React from 'react';
// import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
//
// const App: React.FC = () => {
//     return (
//         <div className="App">
//             <BrowserRouter>
//                 <div className="page-wrapper flex justify-center items-center bg-background-gray rounded-xl">
//                     <Routes>
//                         <Route path="/login" element={<LoginPage/>}/>
//                         <Route path="/" element={<Navigate replace to="/login"/>}/>
//                         <Route path="/register" element={<RegisterPage/>}/>
//                     </Routes>
//                 </div>
//             </BrowserRouter>
//         </div>
//     );
// };
//
// export default App;

import React from 'react';
import './index.css'
// import RegisterPage from "./pages/RegisterPage";
// import NavigationMenu from "./components/NavigationMenu.tsx";
import MessagingPage from "./pages/MessagingPage.tsx";

const App: React.FC = () => {
    return (
        <div className="page-wrapper flex justify-center items-center bg-background-gray rounded-xl overflow-hidden">
            <MessagingPage/>
        </div>
    );
};

export default App;
