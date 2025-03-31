export const slideUp = {
  initial: {
    y: "100%",
  },
  open: (i) => ({
    y: "0%",
    transition: {
      duration: 0.5,
      delay: 0.03 * i, // Zwiększony delay dla lepszego efektu
      ease: [0.33, 1, 0.68, 1]
    },
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 }
  }
};
export const buttonSlideIn = {
  initial: {
    x: 100,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export const opacity = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};
