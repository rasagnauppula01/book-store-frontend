import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is the return policy for books?",
      answer:
        "We offer a 30-day return policy for unopened and unused books. If you're not satisfied with your purchase, you can return the book within 30 days for a full refund or exchange. This applies only to deliveries within Hyderabad.",
    },
    {
      question: "How long does delivery take within Hyderabad?",
      answer:
        "Delivery typically takes 2-5 business days within Hyderabad. You will receive a tracking number once your order is shipped, so you can track the progress.",
    },
    {
      question: "Do you offer gift cards?",
      answer:
        "Yes! We offer digital gift cards that can be purchased and redeemed on our website. These are available to Hyderabad residents.",
    },
    {
      question: "Can I change my shipping address after placing an order?",
      answer:
        "Once your order is placed, we are unable to change the shipping address. However, please contact customer support immediately if there's an issue, and we'll try to assist you.",
    },
    {
      question: "Do you deliver books outside Hyderabad?",
      answer:
        "Currently, we only deliver within Hyderabad. We are working on expanding to other locations soon, so please stay tuned!",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-black text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-8">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              onClick={() => toggleAnswer(index)}
              whileHover={{ scale: 1.05 }} // Add hover effect on FAQ box
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <motion.h4
                  className="text-2xl font-semibold text-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {faq.question}
                </motion.h4>
                <motion.svg
                  className={`w-8 h-8 text-black transform transition-all duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ scale: 1.2 }} // Add scale on hover for arrow
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </div>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  height: activeIndex === index ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {activeIndex === index && (
                  <p className="text-gray-800 mt-4 text-lg">{faq.answer}</p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
