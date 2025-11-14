
import React, { useState } from "react";
import {
  Wrench,
  Users,
  Clock,
  Star,
  Phone,
  Quote,
  Sparkles,
  ArrowRight,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import carImage from "../../../public/carimage.jpg"


const Body = () => {
  // ------------------ Review State ------------------
  const [reviews, setReviews] = useState([
    {
      name: "Rahul Sharma",
      rating: 5,
      comment:
        "Their emergency service saved my day! Mechanic reached in 20 minutes.",
    },
    {
      name: "Priya Singh",
      rating: 4,
      comment: "Super fast and professional. Very clean garage and polite staff.",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  // ------------------ Handle Review Submit ------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.rating || !newReview.comment) return;
    setReviews([...reviews, newReview]);
    setNewReview({ name: "", rating: 0, comment: "" });
  };

  // ------------------ Page Layout ------------------
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 mt-10">
      {/* HERO */}
      {/* <section className="relative bg-gradient-to-br from-blue-700 to-indigo-600 text-white py-24 overflow-hidden">
        <img className="w-full h-[40rem]"
         src={carImage}  />
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Welcome to <span className="text-yellow-400">CarFix Garage</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Your one-stop destination for expert car care, emergency repairs, and trusted local service.
          </p>
         <Link to={`/all-booking-services`}>
          <button  className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-300 transition shadow-md flex items-center mx-auto gap-2">
            Book a Service <ArrowRight size={20} />
          </button>
           </Link>
        </motion.div>

        <Sparkles size={80} className="absolute text-yellow-300 top-12 left-10 opacity-30" />
        <Wrench size={120} className="absolute text-white bottom-0 right-10 opacity-10" />
      </section> */}

        <section className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-40 md:py-40 overflow-hidden">
  {/* Background Image */}
  <img
    src={carImage}
    alt="Car Garage"
    className="absolute inset-0 w-full pb-20 h-[50rem] md:h-[60rem] object-fill object-center opacity-60 scale-105"
  />

  {/* Overlay for better readability */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 max-w-6xl mx-auto px-6 text-center"
  >
    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
      Welcome to <span className="text-yellow-400">CarFix Garage</span>
    </h1>
    <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
      Your one-stop destination for expert car care, emergency repairs, and trusted local service.
    </p>
    <Link to={`/all-booking-services`}>
      <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-300 transition shadow-md flex items-center mx-auto gap-2">
        Book a Service <ArrowRight size={20} />
      </button>
    </Link>
  </motion.div>

  {/* Decorative Icons */}
  <Sparkles
    size={80}
    className="absolute text-yellow-300 top-12 left-10 opacity-30 z-10"
  />
  <Wrench
    size={120}
    className="absolute text-white bottom-0 right-10 opacity-10 z-10"
  />
</section>



      {/* WHY CHOOSE US */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-2">
            Why Choose <span className="text-blue-500">CarFix?</span>
          </h2>
          <p className="text-gray-600 text-lg">
            We combine technology, expertise, and care to keep your vehicle performing at its best.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: Wrench, title: "Expert Mechanics", desc: "Certified professionals ready to handle all types of repairs." },
            { icon: Clock, title: "Fast & Reliable", desc: "Quick turnaround so you can get back on the road faster." },
            { icon: Users, title: "Customer First", desc: "Transparent service trusted by hundreds of customers." },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl"
            >
              <item.icon size={50} className="mx-auto text-blue-600 mb-4" />
              <h3 className="font-semibold text-xl mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REVIEWS + COMMENT FORM */}
      <section className="bg-blue-50 py-20 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-blue-700 text-center mb-12"
          >
            Customer Reviews 💬
          </motion.h2>

          {/* Review Cards */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 mb-16">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl border border-gray-100"
              >
                <Quote size={28} className="text-blue-600 mb-3" />
                <p className="text-gray-600 italic mb-4 leading-relaxed">
                  “{r.comment}”
                </p>
                <div className="flex items-center justify-between mt-3">
                  <h4 className="font-semibold text-gray-800">{r.name}</h4>
                  <div className="flex gap-1">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={18}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comment Submission Form */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">
              Leave a Review ⭐
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      size={26}
                      onClick={() => setNewReview({ ...newReview, rating: n })}
                      className={`cursor-pointer transition ${
                        newReview.rating >= n
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  rows={4}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Write your experience..."
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2 transition"
                >
                  Submit Review <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-blue-700 mb-4">
              Need Help? We're Available 24/7
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Our emergency mechanics are always ready to help — anytime, anywhere.
            </p>
            <div className="flex items-center gap-3">
              <Phone size={30} className="text-blue-600" />
              <span className="text-2xl font-bold text-blue-800">+91 98765 43210</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-blue-100"
          >
            <iframe
              title="Garage Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.911459527873!2d72.87765567473124!3d19.11561455075068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8b8f75e81fb%3A0x5b1e2f3ef9a8e6a7!2sMumbai%20Garage!5e0!3m2!1sen!2sin!4v1686231428356!5m2!1sen!2sin"
              width="100%"
              height="320"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </section>

     
    </div>
  );
};

export default Body;