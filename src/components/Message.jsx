import { motion } from "framer-motion";

export default function Message({ name }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="text-lg text-gray-700 mb-6"
    >
      Hey {name || "you"}, I just wanted to say... you’ve been on my mind a lot lately. 🥺
      and i'll want  you to be mine? 💕
    </motion.p>
  );
}
