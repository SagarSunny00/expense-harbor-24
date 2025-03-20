
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
}

const AnimatedNumber = ({
  value,
  duration = 1000,
  formatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  },
  className = ''
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [prevValue, setPrevValue] = useState(0);

  useEffect(() => {
    setPrevValue(displayValue);
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setDisplayValue(prevValue + progress * (value - prevValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value]);

  const formattedValue = new Intl.NumberFormat('en-US', formatOptions).format(displayValue);
  
  // Split the formatted value to get the integer and decimal parts
  const [integer, decimal] = formattedValue.split('.');
  
  return (
    <div className={`font-mono font-medium tabular-nums ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={integer}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {integer}
        </motion.span>
      </AnimatePresence>
      {decimal && (
        <>
          <span>.</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={decimal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-muted-foreground"
            >
              {decimal}
            </motion.span>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default AnimatedNumber;
