import { useState } from 'react';
import { motion } from 'framer-motion';
// removed link to context inside a component that isn't wrapped yet - need to be careful
import { useAuth } from '../context/AuthContext';
// Oh wait, Login is inside App which is inside Router. But AuthProvider needs to be inside Router too if it uses useNavigate.
// My previous thought was: AuthProvider wraps <App> or <Router>?
// Let's make AuthProvider *inside* Router in App.jsx.

import { User, Lock, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const user = await login(username.trim(), password.trim());
            // Successful login will redirect via navigate in AuthContext or here
            console.log("Logged in as:", user);

            switch (user.role) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'chef':
                    navigate('/chef');
                    break;
                case 'waiter':
                    navigate('/waiter');
                    break;
                default:
                    navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="bg-gradient-to-r from-orange-400 to-red-500 p-8 text-center text-white">
                    <ChefHat className="w-12 h-12 mx-auto mb-2" />
                    <h2 className="text-3xl font-serif font-bold">Aavansh</h2>
                    <p className="text-orange-100 mt-2">Staff Portal Login</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <User size={18} />
                                </span>
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-4 text-center text-xs text-gray-400">
                        <p>Testing Credentials:</p>
                        <ul className="mt-1">
                            <li>admin / admin123</li>
                            <li>chef / chef123</li>
                            <li>waiter / waiter123</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
