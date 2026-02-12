import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChefHat, Truck, Award, Star, ArrowRight } from 'lucide-react';

const Card = ({ children, className }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all ${className}`}
    >
        {children}
    </motion.div>
);

const SectionTitle = ({ children, centered = true }) => (
    <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-4xl md:text-5xl font-bold font-serif mb-12 text-gray-900 ${centered ? 'text-center' : ''}`}
    >
        {children}
    </motion.h2>
);

const Home = () => {
    const reviewsRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: reviewsRef, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div className="font-sans overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Restaurant Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center text-white space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 text-sm font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
                            Established 2024
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black font-serif leading-tight">
                            A Culinary <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Masterpiece.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        Where traditional recipes meet modern artistry. Experience the finest dining in the heart of the city.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                    >
                        <Link to="/menu" className="px-8 py-4 bg-orange-600 text-white text-lg font-bold rounded-full hover:bg-orange-700 shadow-lg shadow-orange-900/20 transition-all hover:scale-105 flex items-center justify-center gap-2 group">
                            View Full Menu <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/reservation" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-bold rounded-full hover:bg-white/20 transition-all hover:scale-105">
                            Book a Table
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent"></div>
                </motion.div>
            </section>

            {/* About / Story Section */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="Chef plating food"
                            className="relative z-10 rounded-[3rem] shadow-2xl w-full object-cover h-[600px]"
                        />
                        <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs border border-gray-100 hidden md:block">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-green-100 rounded-full text-green-600"><Award size={24} /></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Award Winning</h4>
                                    <p className="text-xs text-gray-500">Best Restaurant 2024</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <SectionTitle centered={false}>A Passion for Flavour</SectionTitle>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            At Aavansh, we believe that food is more than just sustenance—it's an experience that brings people together. Our journey began with a simple idea: to serve authentic dishes with a modern twist.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Every ingredient is handpicked from local farms, ensuring freshness in every bite. Our chefs are artists, painting plates with vibrant colors and bold flavors that tell a story of tradition and innovation.
                        </p>
                        <div className="pt-4">
                            <Link to="/menu" className="text-orange-600 font-bold text-lg hover:text-orange-700 inline-flex items-center gap-2 group">
                                Explore Our Story <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <SectionTitle>Why Choose Us</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Farm to Table', desc: 'Sourced daily from local organic farms for peak freshness.', icon: <span className="text-4xl">🥗</span> },
                            { title: 'Master Chefs', desc: 'Culinary experts dedicated to crafting the perfect dish.', icon: <ChefHat size={40} className="text-orange-500" /> },
                            { title: 'Lightning Delivery', desc: 'Hot and fresh food delivered to your door in minutes.', icon: <Truck size={40} className="text-blue-500" /> }
                        ].map((feature, index) => (
                            <Card key={index} className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-50 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-800 font-serif">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews Section - Horizontal Scroll */}
            <section className="py-24 overflow-hidden bg-gray-900 text-white" ref={reviewsRef}>
                <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-end">
                    <div>
                        <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block">Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif">What They Say</h2>
                    </div>
                    <div className="hidden md:flex gap-2">
                        <button className="p-2 border border-white/20 rounded-full hover:bg-white/10"><ArrowRight className="rotate-180" /></button>
                        <button className="p-2 border border-white/20 rounded-full hover:bg-white/10"><ArrowRight /></button>
                    </div>
                </div>

                <div className="flex gap-8 px-4 overflow-x-auto pb-8 snap-x scrollbar-hide">
                    {[
                        { name: "Sarah J.", role: "Food Critic", text: "The best risotto I've ever had. The attention to detail is unmatched.", rating: 5, img: "https://randomuser.me/api/portraits/women/44.jpg" },
                        { name: "Michael B.", role: "Regular Guest", text: "Aavansh never disappoints. The ambiance is perfect for date nights.", rating: 5, img: "https://randomuser.me/api/portraits/men/32.jpg" },
                        { name: "Emily R.", role: "Chef", text: "Truly inspiring flavors. A must-visit for any food enthusiast.", rating: 4, img: "https://randomuser.me/api/portraits/women/68.jpg" },
                        { name: "David K.", role: "Local Guide", text: "Fast delivery and the packaging keeps everything fresh. Highly recommend!", rating: 5, img: "https://randomuser.me/api/portraits/men/85.jpg" }
                    ].map((review, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="min-w-[300px] md:min-w-[400px] bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl snap-center"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full border-2 border-orange-500" />
                                <div>
                                    <h4 className="font-bold text-lg">{review.name}</h4>
                                    <p className="text-sm text-gray-400">{review.role}</p>
                                </div>
                            </div>
                            <div className="flex text-orange-500 mb-4">
                                {[...Array(5)].map((_, stars) => (
                                    <Star key={stars} size={16} fill={stars < review.rating ? "currentColor" : "none"} className={stars >= review.rating ? "text-gray-600" : ""} />
                                ))}
                            </div>
                            <p className="text-xl font-serif italic text-gray-300">"{review.text}"</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-4 bg-orange-600 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    {/* Pattern overlay could go here */}
                    <div className="absolute w-96 h-96 bg-white rounded-full -top-20 -left-20 blur-3xl"></div>
                    <div className="absolute w-96 h-96 bg-black rounded-full -bottom-20 -right-20 blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
                    <h2 className="text-4xl md:text-6xl font-black font-serif mb-8">Ready to taste the extraordinary?</h2>
                    <p className="text-xl md:text-2xl mb-12 text-orange-100 font-light max-w-2xl mx-auto">
                        Join thousands of satisfied guests. Reserve your table or order online today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/order-online" className="px-10 py-5 bg-white text-orange-600 text-xl font-bold rounded-full hover:bg-gray-100 shadow-xl transition-all transform hover:-translate-y-1">
                            Order Delivery
                        </Link>
                        <Link to="/reservation" className="px-10 py-5 bg-transparent border-2 border-white text-white text-xl font-bold rounded-full hover:bg-white/10 transition-all transform hover:-translate-y-1">
                            Book a Table
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
