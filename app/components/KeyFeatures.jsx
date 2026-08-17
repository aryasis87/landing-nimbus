"use client";
import { motion } from "framer-motion";
import { FaRocket, FaLock, FaChartLine, FaRobot } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Kinerja Cepat & Andal",
    description: "Dukungan server cloud berkecepatan tinggi untuk kelancaran operasional bisnis Anda.",
    icon: <FaRocket />,
    bgColor: "bg-uptime/12 text-uptime",
  },
  {
    id: 2,
    title: "Keamanan Terjamin",
    description: "Enkripsi canggih untuk melindungi data penting Anda dari ancaman siber.",
    icon: <FaLock />,
    bgColor: "bg-uptime/12 text-uptime",
  },
  {
    id: 3,
    title: "Skalabilitas Fleksibel",
    description: "Sesuaikan kapasitas server sesuai kebutuhan bisnis Anda, tanpa batasan.",
    icon: <FaChartLine />,
    bgColor: "bg-uptime/12 text-uptime",
  },
  {
    id: 4,
    title: "Integrasi AI",
    description: "Optimalkan analisis data dan otomatisasi dengan teknologi AI terbaru.",
    icon: <FaRobot />,
    bgColor: "bg-uptime/12 text-uptime",
  },
];

export default function KeyFeatures() {
  return (
    <section id="key-features" className="py-24 px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-vapor-2 to-vapor text-vapor">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Judul */}
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Fitur Utama Kami
        </motion.h2>

        <p className="text-lg sm:text-xl text-frost-dim max-w-2xl mx-auto mb-12">
          Temukan bagaimana teknologi kami membantu Anda mengembangkan bisnis dengan lebih cepat dan aman.
        </p>

        {/* Grid Fitur */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className={`p-8 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 ${feature.bgColor}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex justify-center mb-4 text-5xl">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-base text-center line-clamp-3">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
