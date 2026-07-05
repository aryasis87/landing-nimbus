"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Apa itu Nimbus Cloud?",
    answer:
      "Nimbus Cloud adalah platform cloud modern yang dirancang untuk mengoptimalkan kinerja dan skalabilitas bisnis Anda dengan teknologi terbaru dan keamanan tingkat tinggi.",
  },
  {
    question: "Apakah ada trial gratis?",
    answer:
      "Ya, kami menyediakan trial gratis selama 14 hari tanpa perlu kartu kredit. Anda bisa mencoba semua fitur premium kami secara penuh.",
  },
  {
    question: "Bagaimana cara upgrade paket?",
    answer:
      "Upgrade paket dapat dilakukan melalui dashboard pengguna kami. Anda tinggal memilih paket yang diinginkan dan mengikuti petunjuk pembayaran.",
  },
  {
    question: "Apakah data saya aman?",
    answer:
      "Keamanan data Anda adalah prioritas utama kami. Kami menggunakan enkripsi canggih dan sistem keamanan berlapis untuk memastikan data Anda terlindungi.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-24 px-6 sm:px-12 lg:px-20 bg-gray-50 text-gray-900"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Pertanyaan Umum
        </motion.h2>
        <motion.p
          className="text-lg text-center text-gray-600 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Temukan jawaban atas pertanyaan yang sering diajukan.
        </motion.p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border rounded-lg border-gray-200 overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left px-6 py-4 flex justify-between items-center bg-white transition-colors ${
                  openIndex === index
                    ? "border-t border-l border-r border-gray-200 rounded-t-lg"
                    : "border border-gray-300 rounded-lg"
                }`}
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>
                <span className="text-2xl text-gray-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="px-6 py-4 bg-white border-t border-gray-200"
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
