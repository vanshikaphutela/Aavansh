import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Bell, ChefHat, Plus, Utensils } from 'lucide-react';

const WaiterPortal = () => {
    const [tables, setTables] = useState([
        { id: 1, status: 'Occupied', guests: 4, orders: 2, ready: false },
        { id: 2, status: 'Free', guests: 0, orders: 0, ready: false },
        { id: 3, status: 'Occupied', guests: 2, orders: 1, ready: true },
        { id: 4, status: 'Reserved', guests: 0, orders: 0, ready: false },
        { id: 5, status: 'Occupied', guests: 6, orders: 4, ready: true },
        { id: 6, status: 'Free', guests: 0, orders: 0, ready: false },
    ]);

    const [selectedTable, setSelectedTable] = useState(null);

    const toggleStatus = (id) => {
        setTables(tables.map(t =>
            t.id === id ? { ...t, status: t.status === 'Free' ? 'Occupied' : 'Free' } : t
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <header className="bg-white px-8 py-5 border-b border-gray-200 sticky top-0 z-30 flex justify-between items-center shadow-sm">
                <h1 className="flex items-center gap-4 text-2xl font-bold font-serif text-gray-900">
                    <Users size={32} className="text-orange-600" /> Waiter Station
                </h1>
                <div className="flex bg-red-50 text-red-600 px-6 py-2 rounded-full border border-red-100 items-center gap-2 animate-pulse shadow-sm">
                    <Bell size={20} /> <span className="font-bold">2 Orders Ready</span>
                </div>
            </header>

            <main className="flex-1 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tables.map((table) => (
                    <motion.div
                        key={table.id}
                        layout
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`relative p-8 rounded-3xl cursor-pointer transition-all border-2 flex flex-col items-center justify-between min-h-[300px] ${table.status === 'Occupied'
                                ? 'bg-white border-orange-500 shadow-xl hover:-translate-y-2'
                                : table.status === 'Reserved'
                                    ? 'bg-yellow-50 border-yellow-200 hover:-translate-y-1'
                                    : 'bg-gray-100 border-dashed border-gray-300 hover:bg-white hover:border-gray-400 opacity-80 hover:opacity-100'
                            }`}
                        onClick={() => setSelectedTable(table)}
                    >
                        <div className={`absolute top-4 right-4 w-4 h-4 rounded-full ${table.status === 'Free' ? 'bg-green-500' :
                                table.status === 'Occupied' ? 'bg-red-500' : 'bg-yellow-500'
                            }`}></div>

                        <div className="flex flex-col items-center mb-6">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 text-3xl font-bold ${table.status === 'Occupied' ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-400'
                                }`}>
                                {table.id}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Table {table.id}</h2>
                            <p className="text-sm font-medium uppercase tracking-widest text-gray-400 mt-1">{table.status}</p>
                        </div>

                        {table.status === 'Occupied' && (
                            <div className="flex justify-between w-full mb-6 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="flex items-center gap-2 text-gray-600 font-medium"><Users size={16} /> {table.guests}</span>
                                <span className="flex items-center gap-2 text-gray-600 font-medium"><Utensils size={16} /> {table.orders}</span>
                            </div>
                        )}

                        {table.ready && (
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="absolute -top-3 -left-3 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                            >
                                <Bell size={12} /> Food Ready!
                            </motion.div>
                        )}

                        <div className="w-full mt-auto">
                            {table.status === 'Free' ? (
                                <button
                                    className="w-full py-3 bg-white border border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                                    onClick={(e) => { e.stopPropagation(); toggleStatus(table.id); }}
                                >
                                    Seat Guests
                                </button>
                            ) : (
                                <button className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 shadow-lg">
                                    <Plus size={18} /> Add Order
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}
            </main>

            {/* Order Modal (Mock) */}
            {selectedTable && selectedTable.status === 'Occupied' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedTable(null)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold font-serif mb-2 text-gray-900">Table {selectedTable.id} Order</h2>
                        <p className="text-gray-500 mb-8">Enter items manually or select from quick menu.</p>

                        <div className="h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 mb-8 flex items-center justify-center text-gray-400 font-medium">
                            [Order Interface Placeholder]
                        </div>

                        <div className="flex justify-end gap-4">
                            <button className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors" onClick={() => setSelectedTable(null)}>Cancel</button>
                            <button className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-lg hover:shadow-orange-500/30 transition-all" onClick={() => { alert('Order Sent to Kitchen!'); setSelectedTable(null); }}>
                                Send to Kitchen
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default WaiterPortal;
