import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedWrapper = ({ children }) => {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      onClick={() => setActive(prev => !prev)}
      animate={{
        scale: active ? 1.2 : 1,
        rotate: active ? 10 : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 12 }}
      className="inline-block cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
