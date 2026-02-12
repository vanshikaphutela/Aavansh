import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash } from 'lucide-react';

const OrderOnline = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const menuItems = [
        { id: 1, name: 'Spicy Chicken Wings', price: 12, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&q=80' },
        { id: 2, name: 'Margherita Pizza', price: 15, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80' },
        { id: 3, name: 'Avocado Salad', price: 10, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' },
        { id: 4, name: 'Beef Burger', price: 14, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' },
    ];

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="container mx-auto py-16 px-4 flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
                <h2 className="text-4xl font-bold font-serif mb-8 text-gray-900">Order for Delivery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {menuItems.map(item => (
                        <motion.div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100 flex flex-col h-full"
                            whileHover={{ y: -5 }}
                        >
                            <div className="h-48 overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold font-serif text-gray-900">{item.name}</h3>
                                    <span className="text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-full text-sm">${item.price}</span>
                                </div>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-orange-600 hover:text-white hover:border-transparent transition-all"
                                >
                                    <Plus size={18} /> Add
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                className="w-full lg:w-96 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24 h-fit"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
            >
                <h3 className="flex items-center gap-3 text-2xl font-bold font-serif mb-8 text-gray-900 border-b pb-4">
                    <ShoppingBag className="text-orange-500" /> Your Cart
                </h3>

                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <ShoppingBag size={48} className="mb-4 opacity-20" />
                        <p className="text-lg">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item, idx) => (
                            <motion.div
                                key={idx}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200"
                            >
                                <span className="font-medium text-gray-700">{item.name}</span>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-gray-900">${item.price}</span>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors bg-white p-1 rounded-full shadow-sm">
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        <div className="border-t border-dashed border-gray-300 pt-6 mt-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-500 text-lg">Total Amount</span>
                                <span className="text-3xl font-bold text-gray-900">${total}</span>
                            </div>
                            <button className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:bg-orange-700 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default OrderOnline;
