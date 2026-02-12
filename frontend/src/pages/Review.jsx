import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, Send } from 'lucide-react';

const Review = () => {
    const [reviews, setReviews] = useState([
        { id: 1, name: 'Alice', rating: 5, comment: 'Absolutely delicious food!', date: '2 days ago' },
        { id: 2, name: 'Bob', rating: 4, comment: 'Great atmosphere, loved the Risotto.', date: '1 week ago' },
    ]);

    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newReview.comment.trim()) {
            setReviews([{ id: Date.now(), ...newReview, date: 'Just now' }, ...reviews]);
            setNewReview({ name: '', rating: 5, comment: '' });
        }
    };

    return (
        <div className="container mx-auto py-16 px-4">
            <header className="text-center mb-16">
                <h1 className="text-5xl font-bold font-serif mb-4 text-gray-900">Customer Reviews</h1>
                <p className="text-xl text-gray-500 font-light">See what others are saying about Aavansh.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Review Form */}
                <div className="lg:order-2">
                    <motion.div
                        className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h3 className="text-2xl font-bold font-serif mb-6 flex items-center gap-3">
                            <MessageCircle className="text-orange-500" /> Leave a Review
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all bg-gray-50"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className={`p-1 transition-all transform hover:scale-110 focus:outline-none`}
                                        >
                                            <Star
                                                size={32}
                                                fill={star <= newReview.rating ? "#F59E0B" : "none"}
                                                className={star <= newReview.rating ? "text-yellow-500" : "text-gray-300"}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all bg-gray-50 h-32 resize-none"
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:bg-orange-700 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2">
                                <Send size={18} /> Submit Review
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Reviews List */}
                <div className="lg:order-1 space-y-6">
                    <AnimatePresence>
                        {reviews.map((review) => (
                            <motion.div
                                key={review.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col">
                                        <h4 className="font-bold text-lg text-gray-900">{review.name}</h4>
                                        <span className="text-gray-400 text-sm">{review.date}</span>
                                    </div>
                                    <div className="flex gap-1 text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed font-light text-lg">"{review.comment}"</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Review;
