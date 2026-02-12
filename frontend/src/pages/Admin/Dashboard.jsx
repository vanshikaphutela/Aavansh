import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Activity, ClipboardList, Package, Clock, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'history', label: 'Order History', icon: ClipboardList },
    ];

    // Mock data
    const inventoryRequests = [
        { id: 1, item: 'Tomatoes', quantity: '5kg', status: 'Pending', chef: 'Chef Gordon' },
        { id: 2, item: 'Heavy Cream', quantity: '2L', status: 'Approved', chef: 'Chef Ramsay' },
    ];

    const recentOrders = [
        { id: 101, table: 4, status: 'Preparing', total: '$45' },
        { id: 102, table: 2, status: 'Served', total: '$32' },
        { id: 103, table: 7, status: 'Pending', total: '$78' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6 sticky top-0 h-screen overflow-y-auto">
                <h2 className="text-3xl font-bold font-serif mb-12 text-orange-600 flex items-center gap-2">
                    <Activity className="text-orange-600" /> Admin
                </h2>
                <nav className="flex-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-left font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                                    : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                                }`}
                        >
                            <tab.icon size={20} />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                <h1 className="text-4xl font-bold font-serif mb-8 capitalize text-gray-800">{activeTab}</h1>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">Pending Orders</h3>
                                <span className="text-5xl font-bold text-gray-900">5</span>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                                    <Activity size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">Revenue Today</h3>
                                <span className="text-5xl font-bold text-gray-900">$1,240</span>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                                    <Package size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 mb-2">Inventory Alerts</h3>
                                <span className="text-5xl font-bold text-gray-900">3</span>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'inventory' && (
                        <motion.div
                            key="inventory"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider">Item</th>
                                            <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider">Quantity</th>
                                            <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider">Kitchen</th>
                                            <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider">Status</th>
                                            <th className="px-8 py-5 font-bold text-gray-600 text-sm uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {inventoryRequests.map((req) => (
                                            <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-8 py-6 font-medium text-gray-900">{req.item}</td>
                                                <td className="px-8 py-6 text-gray-600">{req.quantity}</td>
                                                <td className="px-8 py-6 text-gray-600">{req.chef}</td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                                        }`}>
                                                        {req.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {req.status === 'Pending' && (
                                                        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors shadow-md">
                                                            Approve
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'history' && (
                        <motion.div
                            key="history"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                        >
                            {recentOrders.map((order) => (
                                <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-gray-900">Order #{order.id}</span>
                                        <span className="text-gray-400 text-sm mt-1">Table {order.table}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-2xl font-bold text-gray-900">{order.total}</span>
                                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${order.status === 'Served' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminDashboard;
