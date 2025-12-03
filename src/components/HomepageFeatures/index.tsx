import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

interface CourseModule {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const ModuleList: CourseModule[] = [
  {
    icon: '🤖',
    title: 'The Robot Operating System (ROS 2)',
    description: 'Master middleware for robot control with ROS 2 nodes, topics, and services',
    link: '/docs/category/2-ros-2-robot-operating-system',
  },
  {
    icon: '🎮',
    title: 'The Digital Twin (Gazebo & Unity)',
    description: 'Build physics simulations and high-fidelity virtual environments',
    link: '/docs/simulation/platforms/',
  },
  {
    icon: '🧠',
    title: 'The AI-Robot Brain (NVIDIA Isaac)',
    description: 'Advanced perception, training, and sim-to-real transfer techniques',
    link: '/docs/simulation/platforms/',
  },
  {
    icon: '🗣️',
    title: 'Vision-Language-Action (VLA)',
    description: 'Integrate voice commands and LLMs for cognitive robot planning',
    link: '/docs/category/5-vision-language-action-vla',
  },
];

function ModuleCard({ icon, title, description, link }: CourseModule) {
  return (
    <div className={styles.moduleCardWrapper}>
      <Link to={link} className={styles.moduleCard}>
        <div className={styles.cardContent}>
          <div className={styles.featureIconWrapper}>
            <span className={styles.moduleIcon}>{icon}</span>
          </div>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
          <div className={styles.cardFooter}>
            <span className={styles.moduleButton}>
              Explore
              <span className={styles.buttonArrow}>→</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={clsx('container', styles.features)}>
      <div className={styles.bentoGrid}>
        {ModuleList.map((props, idx) => (
          <ModuleCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}