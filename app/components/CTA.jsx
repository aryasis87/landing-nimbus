"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const shapes = [
  { top: "10%", left: "15%", size: "120px", color: "bg-uptime" },
  { top: "60%", left: "70%", size: "110px", color: "bg-uptime" },
  { top: "70%", left: "30%", size: "50px", color: "bg-uptime" },
];

export default function CTA() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-32 px-6 sm:px-12 lg:px-20 bg-vapor text-frost overflow-hidden">
      {/* Animated Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {shapes.map((shape, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full mix-blend-screen blur-2xl ${shape.color}`}
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              y: [-10, 10],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 1,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-6 leading-snug"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Bergabunglah dan Tingkatkan Bisnis Anda
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-frost-dim mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ambil langkah selanjutnya untuk mengembangkan bisnis Anda bersama teknologi modern kami.
        </motion.p>

        <motion.button
          className="relative bg-gradient-to-r from-uptime to-uptime text-frost py-3 px-10 rounded-full font-medium shadow-lg overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span />
          Mulai Sekarang
        </motion.button>
      </div>
    </section>
  );
}
