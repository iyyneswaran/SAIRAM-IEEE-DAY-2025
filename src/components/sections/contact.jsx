import { motion } from "framer-motion";
import { SparklesText } from "../modern-ui/sparkles-text";

export default function ContactUs() {
    return (
        <section
            id="contact"
            className="relative py-20 bg-gradient-to-b from-[#0b0b11] to-[#0b0b11] text-white overflow-hidden"
        >
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <center>
                    <SparklesText
                        text="CONTACT US"
                        sparkleCount={20}
                        sparkleSize={16}
                        speed={0.6}
                        sparkleColors={["#FFD700", "#FF69B4", "#7b2dd1"]}
                        className="about-title"
                    />
                </center>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-center text-gray-300 max-w-2xl mx-auto mb-12 text-lg"
                >
                    Have questions, ideas, or just want to collaborate?
                    We’d love to hear from you. Get in touch with us!
                </motion.p>

                {/* Contact Form */}
                <div className="max-w-3xl mx-auto">
                    <motion.form
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="p-8 bg-[#0f172a]/60 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-lg hover:shadow-purple-500/40 transition-all space-y-6"
                    >
                        {/* Name */}
                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Your Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-xl bg-[#050b18] border border-gray-700 focus:border-pink-500 outline-none text-white"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-xl bg-[#050b18] border border-gray-700 focus:border-pink-500 outline-none text-white"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-gray-300 mb-2 font-medium">Message</label>
                            <textarea
                                rows="5"
                                placeholder="Write your message..."
                                className="w-full px-4 py-3 rounded-xl bg-[#050b18] border border-gray-700 focus:border-pink-500 outline-none text-white"
                            ></textarea>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-lg font-semibold shadow-lg hover:shadow-pink-500/50 transition-all"
                        >
                            Send Message
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
