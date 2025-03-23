
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  formatter?: (value: number) => string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  formatter = (val) => val.toString(),
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isVisible = useRef(false);
  const counterRef = useRef<HTMLDivElement>(null);

  // Easing function for smoother animation
  const easeOutQuad = (t: number): number => t * (2 - t);

  const animateCount = (timestamp: number) => {
    if (!startTime.current) {
      startTime.current = timestamp;
    }

    const progress = Math.min((timestamp - startTime.current) / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const currentValue = Math.floor(easedProgress * value);

    setDisplayValue(currentValue);

    if (progress < 1) {
      animationFrameId.current = requestAnimationFrame(animateCount);
    } else {
      setDisplayValue(value);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible.current) {
          isVisible.current = true;
          startTime.current = null;
          animationFrameId.current = requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [value]);

  return (
    <div ref={counterRef} className={className}>
      {formatter(displayValue)}
    </div>
  );
};

export default AnimatedCounter;
