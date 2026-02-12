import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MessageCircle } from 'lucide-react';

const Reservation = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: 2,
        requests: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Table booked for ${formData.guests} guests on ${formData.date} at ${formData.time}!`);
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] py-12 px-4">
            <motion.div
                className="bg-white/70 backdrop-blur-lg border border-white/30 p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-2xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold font-serif text-center mb-8 text-gray-800">Book Your Table</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 font-medium text-gray-700">
                            <Calendar size={18} className="text-orange-500" /> Date
                        </label>
                        <input
                            type="date"
                            required
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white/50"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="flex items-center gap-2 font-medium text-gray-700">
                                <Clock size={18} className="text-orange-500" /> Time
                            </label>
                            <input
                                type="time"
                                required
                                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white/50"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <label className="flex items-center gap-2 font-medium text-gray-700">
                                <User size={18} className="text-orange-500" /> Guests
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                required
                                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white/50"
                                value={formData.guests}
                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 font-medium text-gray-700">
                            <MessageCircle size={18} className="text-orange-500" /> Special Requests
                        </label>
                        <textarea
                            rows="3"
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white/50"
                            value={formData.requests}
                            onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                            placeholder="Allergies, high chair, etc."
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full py-3 mt-4 bg-orange-600 text-white font-bold rounded-xl shadow-lg hover:bg-orange-700 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5">
                        Confirm Booking
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Reservation;
