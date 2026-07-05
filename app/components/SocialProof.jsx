"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Mehwish",
    role: "Pengguna Layanan",
    quote:
      "Layanan cloud ini telah meningkatkan efisiensi operasional kami secara signifikan. Kecepatan dan kestabilan jaringannya luar biasa!",
    image: "/images/pp1.png",
    isHighlighted: false,
  },
  {
    id: 2,
    name: "Elizabeth Jeff",
    role: "Pelanggan Terverifikasi",
    quote:
      "Dengan Nimbus Cloud, kami merasakan kemudahan dalam mengelola data dan mengoptimalkan performa aplikasi kami. Layanan ini sangat andal.",
    image: "/images/pp2.png",
    isHighlighted: true,
  },
  {
    id: 3,
    name: "Emily Thomas",
    role: "Freelancer",
    quote:
      "Saya menggunakan layanan cloud ini untuk proyek saya dan hasilnya sangat memuaskan. Skalabilitas dan keamanannya membuat saya tenang.",
    image: "/images/pp3.png",
    isHighlighted: false,
  },
];

const shapes = [
  { top: "60%", left: "20%", size: "200px", color: "bg-purple-300" },
  { top: "70%", left: "80%", size: "180px", color: "bg-pink-300" },
  { top: "95%", left: "60%", size: "220px", color: "bg-blue-300" },
];

export default function SocialProof() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-24 px-6 sm:px-12 lg:px-20 bg-white text-gray-900 overflow-hidden">
      {/* Floating Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {shapes.map((shape, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ y: -scrollY * 0.3 }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              scale: { duration: 0.8, ease: "easeOut" },
              y: { duration: 0.3, ease: "easeOut" },
            }}
            viewport={{ once: true, amount: 0.2 }}
            className={`absolute ${shape.color} rounded-full opacity-50`}
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
            }}
          />
        ))}
      </div>

      {/* Konten */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Kiri: Judul & Deskripsi */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-5xl font-bold leading-snug mb-6">
            Apa Kata <br />
            <span className="text-purple-900">Pelanggan Kami</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Pelajari pengalaman para pelanggan kami yang telah merasakan kecepatan,
            keamanan, dan skalabilitas layanan cloud kami.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-10 rounded-lg font-medium hover:opacity-90 transition">
            Lihat Selengkapnya
          </button>
        </motion.div>

        {/* Kanan: Testimoni */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8 relative z-10"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              whileHover={{ scale: 1.05 }}
              className={`relative p-6 rounded-2xl shadow-lg flex items-center gap-6 transform transition ${
                testimonial.isHighlighted
                  ? "bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex-shrink-0">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white shadow-md"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-purple-600 mb-2">{testimonial.role}</p>
                <p className="text-gray-700 text-lg leading-relaxed line-clamp-3">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
