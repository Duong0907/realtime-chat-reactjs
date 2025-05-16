import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Chat from './pages/Chat/Chat';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

function App() {
    return (
        <AuthProvider>
            <ChatProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </Router>
            </ChatProvider>
        </AuthProvider>
    );
}

export default App;
