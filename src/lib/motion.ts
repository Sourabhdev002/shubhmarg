export const vedicEasing = [0.16, 1, 0.3, 1] as const; // Slow, deliberate ease-out

export const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: vedicEasing } 
  }
};

export const fadeScale = {
  hidden: { opacity: 1, scale: 1 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 1.2, ease: vedicEasing } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 1, y: 0 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: vedicEasing } 
  }
};
