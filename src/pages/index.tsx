import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/HeroSection';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from './index.module.css';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
}

const FadeInSection = ({ children, className }: FadeInSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={clsx(className, styles.fadeInSection, { [styles.isVisible]: inView })}>
      {children}
    </div>
  );
};

export default function Home(): ReactNode {
  return (
    <Layout
      title="Home"
      description="The ultimate guide to Embodied AI and Humanoid Robotics.">
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <HeroSection />

        {/* Overview Section */}
        <FadeInSection className={clsx('container padding-vert--xl', styles.overviewSection)}>
          <div className="row">
            <div className="col col--8 col--offset-2 text--center">
              <h2 className={clsx('margin-bottom--lg', styles.sectionTitle)}>
                <span className={styles.titleUnderline}>Course Overview</span>
              </h2>
              <p className={clsx('hero__subtitle', styles.overviewText)}>
                The "Physical AI & Humanoid Robotics" course delves into the fascinating world of embodied artificial intelligence, exploring how intelligent systems can interact with the physical world. This course covers the theoretical foundations and practical applications of robotics, focusing on advanced concepts such as robotic operating systems, simulation environments, AI-powered robot brains, and vision-language-action models. Prepare to build, program, and understand the next generation of intelligent machines.
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Modules Section */}
        <FadeInSection className={clsx('container padding-vert--xl text--center', styles.modulesSection)}>
          <h2 className={clsx('margin-bottom--lg', styles.sectionTitle)}>
            <span className={styles.titleUnderline}>Course Modules</span>
          </h2>
          <HomepageFeatures />
        </FadeInSection>

        {/* Learning Outcomes Section - V4 Terminal Style */}
        <FadeInSection className={clsx('container padding-vert--xl', styles.outcomesSection)}>
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h2 className={clsx('text--center margin-bottom--lg', styles.sectionTitle)}>
                <span className={styles.titleUnderline}>System Capabilities</span>
              </h2>
              <p className={clsx('text--center margin-bottom--xl', styles.outcomesIntro)}>
                Upon initialization, the following protocols will be active:
              </p>

              <div className={styles.featureGrid}>
                <div className={styles.featureRow}>
                  <span className={styles.featureIcon}>⚡</span>
                  <span className={styles.featureText}>Real-time ROS 2 Control Loop</span>
                </div>
                <div className={styles.featureRow}>
                  <span className={styles.featureIcon}>🌐</span>
                  <span className={styles.featureText}>High-Fidelity Physics Simulation</span>
                </div>
                <div className={styles.featureRow}>
                  <span className={styles.featureIcon}>👁️</span>
                  <span className={styles.featureText}>NVIDIA Isaac Perception Stack</span>
                </div>
                <div className={styles.featureRow}>
                  <span className={styles.featureIcon}>🧠</span>
                  <span className={styles.featureText}>Vision-Language-Action Models</span>
                </div>
                <div className={styles.featureRow}>
                  <span className={styles.featureIcon}>🔄</span>
                  <span className={styles.featureText}>Sim-to-Real Transfer Pipeline</span>
                </div>
                <div className={styles.featureRow}>
                  <span className={styles.featureIcon}>🎯</span>
                  <span className={styles.featureText}>Reinforcement Learning Agents</span>
                </div>
                <div className={styles.featureRow}>
                  <span className={styles.featureIcon}>🛠️</span>
                  <span className={styles.featureText}>Hardware Diagnostic Suite</span>
                </div>
                <div className={styles.featureRow}>
                  <span className={styles.featureIcon}>🚀</span>
                  <span className={styles.featureText}>Autonomous Navigation</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Why Physical AI Matters Section */}
        <FadeInSection className={clsx('hero hero--primary margin-bottom--xl', styles.quoteSection)}>
          <div className="container">
            <div className="row">
              <div className="col col--10 col--offset-1 text--center">
                <div className={styles.quoteIcon}>"</div>
                <h2 className={clsx('hero__title', styles.quoteTitle)}>Why Physical AI Matters</h2>
                <p className={clsx('hero__subtitle', styles.quoteText)}>
                  The future of AI isn't just in the cloud; it's in the physical world, where robots and intelligent agents will collaborate with humans to solve real-world problems, from healthcare to exploration.
                </p>
                <span className={clsx('hero__subtitle', styles.quoteAuthor)}>— Leading AI Researcher</span>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Hardware Requirements Section - V3 Spec Sheet Style */}
        <FadeInSection className={clsx('container padding-vert--xl', styles.hardwareSection)}>
          <div className={styles.hardwareHeader}>
            <h2 className={styles.sectionTitle}>Hardware Specs</h2>
            <p className={styles.hardwareIntro}>
              Recommended setup for optimal simulation and training performance.
            </p>
          </div>

          <div className={styles.hardwareGrid}>
            {/* Workstation */}
            <div className={styles.specCard}>
              <div className={styles.specIcon}>🖥️</div>
              <div className={styles.specContent}>
                <Heading as="h3" className={styles.specTitle}>Workstation</Heading>
                <div className={styles.specDetail}>
                  <span className={styles.specLabel}>GPU</span>
                  <span className={styles.specValue}>NVIDIA RTX 3060+</span>
                </div>
                <div className={styles.specDetail}>
                  <span className={styles.specLabel}>RAM</span>
                  <span className={styles.specValue}>32GB DDR4/5</span>
                </div>
              </div>
            </div>

            {/* Edge AI */}
            <div className={styles.specCard}>
              <div className={styles.specIcon}>⚡</div>
              <div className={styles.specContent}>
                <Heading as="h3" className={styles.specTitle}>Edge AI</Heading>
                <div className={styles.specDetail}>
                  <span className={styles.specLabel}>Device</span>
                  <span className={styles.specValue}>Jetson Orin Nano</span>
                </div>
                <div className={styles.specDetail}>
                  <span className={styles.specLabel}>OS</span>
                  <span className={styles.specValue}>Ubuntu 20.04/22.04</span>
                </div>
              </div>
            </div>

            {/* Robot */}
            <div className={styles.specCard}>
              <div className={styles.specIcon}>🤖</div>
              <div className={styles.specContent}>
                <Heading as="h3" className={styles.specTitle}>Robot Platform</Heading>
                <div className={styles.specDetail}>
                  <span className={styles.specLabel}>Type</span>
                  <span className={styles.specValue}>ROS 2 Compatible</span>
                </div>
                <div className={styles.specDetail}>
                  <span className={styles.specLabel}>Sensors</span>
                  <span className={styles.specValue}>LiDAR + Depth Cam</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.hardwareButtonWrapper}>
            <Link
              className={styles.hardwareButton}
              to="/docs/category/7-hardware-setup">
              <span>View Full Requirements</span>
              <span className={styles.buttonArrowHardware}>→</span>
            </Link>
          </div>
        </FadeInSection>
      </main>
    </Layout>
  );
}