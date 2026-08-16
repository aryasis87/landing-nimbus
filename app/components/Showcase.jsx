"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const showcases = [
  {
    id: 1,
    title: "Arsitektur Cloud Terdepan",
    description:
      "Mengoptimalkan infrastruktur cloud untuk kinerja maksimal dan skalabilitas yang mudah.",
    image: "/images/home.png",
    bgColor: "bg-uptime/12",
  },
  {
    id: 2,
    title: "Keamanan Data Tingkat Lanjut",
    description:
      "Melindungi data Anda dengan enkripsi mutakhir dan sistem keamanan berlapis.",
    image: "/images/security.png",
    bgColor: "bg-uptime/12",
  },
  {
    id: 3,
    title: "Integrasi AI & Otomatisasi",
    description:
      "Menggabungkan kecerdasan buatan untuk meningkatkan efisiensi dan produktivitas operasional.",
    image: "/images/ai.png",
    bgColor: "bg-uptime/12",
  },
];

const shapes = [
  { top: "15%", left: "10%", size: "120px", color: "bg-uptime" },
  { top: "50%", left: "85%", size: "150px", color: "bg-uptime" },
  { top: "70%", left: "30%", size: "180px", color: "bg-uptime" },
];

export default function VisualShowcase() {
  return (
    <section className="relative py-24 px-6 sm:px-12 lg:px-20 bg-frost text-vapor overflow-hidden">
      {/* Floating Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {shapes.map((shape, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute ${shape.color} rounded-full opacity-50 blur-2xl`}
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
            }}
          />
        ))}
      </div>

      {/* Konten Showcase */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Solusi Cloud Kami
        </motion.h2>

        <p className="text-lg text-frost-dim mb-12 max-w-3xl mx-auto">
          Temukan inovasi dan keunggulan infrastruktur cloud kami yang mengutamakan kecepatan, keamanan, dan integrasi cerdas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcases.map((showcase, index) => (
            <motion.div
              key={showcase.id}
              className={`rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-500 cursor-pointer ${showcase.bgColor}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="overflow-hidden rounded-lg mb-4 relative" style={{ paddingTop: "62.5%" }}>
                <Image
                  src={showcase.image}
                  alt={showcase.title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2">{showcase.title}</h3>
              <p className="text-frost-dim">{showcase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}