import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, ShoppingCart, Clock, Check } from 'lucide-react';

const ChefPortal = () => {
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'inventory'

    // Mock Orders - categorized as per requirement
    const orders = [
        { id: 201, table: 5, category: 'Main Course', item: 'Truffle Risotto', status: 'Pending', timer: '15m' },
        { id: 202, table: 3, category: 'Starters', item: 'Calamari', status: 'Cooking', timer: '5m' },
        { id: 203, table: 1, category: 'Dessert', item: 'Lava Cake', status: 'Pending', timer: '10m' },
        { id: 204, table: 5, category: 'Main Course', item: 'Salmon', status: 'Pending', timer: '18m' },
    ];

    const [filteredCategory, setFilteredCategory] = useState('All');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <header className="bg-white px-8 py-5 border-b border-gray-200 sticky top-0 z-30 flex justify-between items-center shadow-sm">
                <h1 className="flex items-center gap-4 text-2xl font-bold font-serif text-gray-900">
                    <ChefHat size={32} className="text-orange-600" /> Kitchen Display System
                </h1>
                <div className="flex bg-gray-100 p-1 rounded-full gap-1">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'orders' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Active Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'inventory' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Inventory Request
                    </button>
                </div>
            </header>

            <main className="flex-1 p-8">
                <AnimatePresence mode="wait">
                    {activeTab === 'orders' ? (
                        <motion.div
                            key="orders"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
                                {['All', 'Starters', 'Main Course', 'Dessert'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilteredCategory(cat)}
                                        className={`px-5 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap border ${filteredCategory === cat
                                                ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105'
                                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {orders
                                    .filter(o => filteredCategory === 'All' || o.category === filteredCategory)
                                    .map((order) => (
                                        <motion.div
                                            key={order.id}
                                            layout
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border-l-8 relative ${order.category === 'Dessert' ? 'border-l-pink-500' :
                                                    order.category === 'Starters' ? 'border-l-green-500' : 'border-l-orange-500'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                                    Table {order.table}
                                                </span>
                                                <span className="flex items-center text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                                                    <Clock size={14} className="mr-1" /> {order.timer}
                                                </span>
                                            </div>

                                            <h2 className="text-xl font-bold text-gray-900 mb-1">{order.item}</h2>
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-6 block">
                                                {order.category}
                                            </span>

                                            <div className="flex gap-3 mt-auto">
                                                {order.status === 'Pending' ? (
                                                    <button className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-500/30">
                                                        Start Cooking
                                                    </button>
                                                ) : (
                                                    <button className="w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2">
                                                        <Check size={18} /> Mark Ready
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="inventory"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-100 mt-8"
                        >
                            <h2 className="text-3xl font-bold font-serif mb-8 text-gray-900 text-center">Request Inventory</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-gray-50 transition-all" placeholder="e.g. Olive Oil" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Needed</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-gray-50 transition-all" placeholder="e.g. 5 Liters" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-gray-50 transition-all">
                                        <option>Normal</option>
                                        <option>High</option>
                                        <option>Critical</option>
                                    </select>
                                </div>
                                <button className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:bg-orange-700 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1">
                                    Submit Request
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default ChefPortal;
