import { motion } from "framer-motion";

export default function ResultDisplay({ accepted }) {
  const name = localStorage.getItem("crushName") || "you";

  return accepted ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-2xl font-semibold text-pink-600 mt-6"
    >
      Awww {name} said YES! 💖 Let's goooo!
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-lg text-gray-600 mt-6"
    >
      Hmm, maybe isn’t a no... just a cute little delay 😅💞
    </motion.div>
  );
}
