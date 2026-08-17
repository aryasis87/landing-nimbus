"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  initParticles,
  parallaxEffect,
  interactiveShapes,
  smoothScrolling,
  reverseScrollShapes,
} from "@/animations/animation";

export default function Hero() {
  useEffect(() => {
    initParticles();
    parallaxEffect();
    interactiveShapes();
    smoothScrolling();
    reverseScrollShapes();
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.3, ease: "easeOut" },
    }),
  };

  const shapeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: i * 0.6, ease: "easeOut" },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <section
      id="hero-section"
      className="relative h-screen flex flex-col justify-center items-center text-center px-3 space-y-8 overflow-hidden bg-linear-[180deg,#111827_25%,#1F2937_50%,#4B5563_70%,#F3F4F6]"
    >
      {/* Canvas Particles */}
      <canvas
        id="particle-canvas"
        className="absolute inset-0 -z-10 pointer-events-none"
      ></canvas>

      {/* Shapes */}
      <motion.div
        className="shape shape-circle bg-uptime w-32 h-32 rounded-full absolute top-20 left-20 z-0"
        variants={shapeVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      />
      <motion.div
        className="shape shape-square bg-uptime w-28 h-28 rounded-lg absolute bottom-32 right-20 z-0"
        variants={shapeVariants}
        initial="hidden"
        animate="visible"
        custom={1}
      />
      <motion.div
        className="shape shape-triangle bg-uptime w-24 h-24 absolute top-1/2 left-1/3 z-0"
        variants={shapeVariants}
        initial="hidden"
        animate="visible"
        custom={2}
      />
      <motion.div
        className="shape shape-hexagon bg-uptime w-36 h-36 rounded-lg absolute top-1/4 right-1/4 z-0"
        variants={shapeVariants}
        initial="hidden"
        animate="visible"
        custom={3}
      />

      {/* Hero Text */}
      <motion.h1
        className="text-3xl md:text-6xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-vapor-2 via-vapor to-vapor z-10 px-3 md:px-10 max-w-full md:max-w-2xl lg:max-w-7xl"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        Kembangkan Bisnis bersama<br/><span className="text-4xl md:text-7xl lg:text-8xl bg-gradient-to-l from-vapor-2 via-vapor to-vapor bg-clip-text text-transparent font-extrabold">NimbusCloud</span>
      </motion.h1>

      {/* Paragraf pembuka adalah isi utama: tidak dikunci pada opacity 0 supaya
          tetap terbaca walau rantai animasinya gagal berjalan. */}
      <motion.p className="z-10 max-w-3xl px-2 text-lg text-frost-dim md:px-10 md:text-xl lg:px-0">
        Rasakan kecepatan dan keamanan infrastruktur cloud yang didukung AI untuk
        mempercepat pertumbuhan bisnis Anda.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex space-x-4 mt-1   z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <motion.button
          className="px-5 py-3 bg-uptime text-frost rounded-full font-medium hover:scale-105 transition"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Mulai Secara Gratis
        </motion.button>
        <motion.button
          className="px-4 py-3 border border-white text-frost rounded-full transition"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Lebih Lanjut
        </motion.button>
      </motion.div>
    </section>
  );
}
