import "./style.css"
import { motion } from 'framer-motion';

const LoadingScreen = ({ message = 'Cargando...' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}>
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>{message}</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;