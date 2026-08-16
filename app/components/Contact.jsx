"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";

export default function Contact() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="contact"
      className="pt-4 pb-12 px-4 md:px-8 lg:px-20 bg-vapor text-frost"
    >
      <div className="max-w-md mx-auto text-center">
        <motion.p
          className="text-base md:text-lg text-frost-dim mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Untuk informasi lebih lanjut, silakan kirim email kepada kami.
        </motion.p>
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.a
            href="mailto:contact@example.com"
            whileHover={{ x: 5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center p-4 bg-frost rounded-full shadow-md text-vapor text-3xl transition"
          >
            <FiMail />
          </motion.a>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 px-3 py-1 bg-vapor text-frost text-xs rounded"
            >
              Kirim Pesan Sekarang
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
