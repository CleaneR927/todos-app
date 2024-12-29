import React, { useState, useEffect } from 'react';
import styles from './happyNewYear.module.css';

export function HappyNewYear() {
  const [lightsCount, setLightsCount] = useState(30);

  const updateLightsCount = () => {
    const width = window.innerWidth;
    if (width < 450) {
      setLightsCount(10);
    } else if (width < 600) {
      setLightsCount(15);
    } else if (width < 750) {
      setLightsCount(20);
    } else if (width < 980) {
      setLightsCount(25);
    } else if (width < 1280) {
      setLightsCount(30);
    } else if (width < 1440) {
      setLightsCount(40);
    } else {
      setLightsCount(50);
    }
  };

  useEffect(() => {
    updateLightsCount();
    window.addEventListener('resize', updateLightsCount);

    return () => {
      window.removeEventListener('resize', updateLightsCount);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.garland}>
        {[...Array(lightsCount)].map((_, index) => (
          <span key={index} className={styles.light} />
        ))}
      </div>
    </div>
  );
}
