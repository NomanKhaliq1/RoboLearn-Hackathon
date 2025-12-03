// HeroSection.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function HeroSection() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroShell}>

          {/* Left: Copy */}
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <span>✨ New Curriculum 2025</span>
            </div>

            <Heading as="h1" className={styles.heroTitle}>
              Physical AI & <br />
              Humanoid Robotics
            </Heading>

            <p className={styles.heroSubtitle}>
              The complete engineering handbook for embodied intelligence.
              From ROS 2 basics to deploying Vision-Language-Action models on real hardware.
            </p>

            <div className={styles.buttons}>
              <Link className={styles.primaryButton} to="/docs/intro">
                Start Learning
                <span className={styles.arrow}>→</span>
              </Link>
              <Link className={styles.secondaryButton} to="/docs/category/physical-ai">
                View Syllabus
              </Link>
            </div>
          </div>

          {/* Right: Visual Panel (Code/Terminal Aesthetic) */}
          <div className={styles.heroPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelDot} />
            </div>
            <ul className={styles.panelList}>
              <li>
                <div className={styles.panelIcon}>🤖</div>
                <div className={styles.panelText}>
                  <span className={styles.panelLabel}>ROS 2 Native</span>
                  <span className={styles.panelDesc}>Production-grade middleware patterns.</span>
                </div>
              </li>
              <li>
                <div className={styles.panelIcon}>🧠</div>
                <div className={styles.panelText}>
                  <span className={styles.panelLabel}>NVIDIA Isaac Sim</span>
                  <span className={styles.panelDesc}>High-fidelity physics simulation.</span>
                </div>
              </li>
              <li>
                <div className={styles.panelIcon}>👁️</div>
                <div className={styles.panelText}>
                  <span className={styles.panelLabel}>VLA Models</span>
                  <span className={styles.panelDesc}>Integrate LLMs with robot actions.</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </header>
  );
}

export default HeroSection;
