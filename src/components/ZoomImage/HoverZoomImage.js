import { motion } from "motion/react"
export const HoverZoomImage = ({ src, alt }) => {
  return (
    <div className="relative overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-auto"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.6 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </div>
  );
};
