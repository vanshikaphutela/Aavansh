import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const menuItems = [
    { id: 1, name: 'Truffle Mushroom Risotto', category: 'Main Course', price: '$24', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80', description: 'Creamy arborio rice with wild mushrooms and truffle oil.' },
    { id: 2, name: 'Crispy Calamari', category: 'Starters', price: '$14', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80', description: 'Golden fried squid rings served with tartare sauce.' },
    { id: 3, name: 'Chocolate Lava Cake', category: 'Dessert', price: '$12', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80', description: 'Warm chocolate cake with a molten center.' },
    { id: 4, name: 'Grilled Salmon', category: 'Main Course', price: '$28', image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?w=800&q=80', description: 'Fresh salmon fillet with asparagus and lemon butter.' },
    { id: 5, name: 'Caesar Salad', category: 'Starters', price: '$10', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80', description: 'Crisp romaine with parmesan, croutons and caesar dressing.' },
    { id: 6, name: 'Tiramisu', category: 'Dessert', price: '$11', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80', description: 'Classic Italian coffee-flavored dessert.' },
];

const categories = ['All', 'Starters', 'Main Course', 'Dessert'];

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container mx-auto px-4 py-16">
            <header className="text-center mb-16">
                <h1 className="text-5xl font-bold font-serif mb-4 text-gray-900">Our Menu</h1>
                <p className="text-xl text-gray-500 font-light">Discover flavors crafted with passion.</p>
            </header>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className="flex gap-3 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30 transform scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search dishes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm transition-shadow"
                    />
                </div>
            </div>

            {/* Menu Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredItems.map(item => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 group"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold font-serif text-gray-900">{item.name}</h3>
                                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">{item.price}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{item.description}</p>
                                <button className="w-full py-3 bg-white border-2 border-orange-600 text-orange-600 font-bold rounded-xl hover:bg-orange-600 hover:text-white transition-colors">
                                    Add to Order
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Menu;
