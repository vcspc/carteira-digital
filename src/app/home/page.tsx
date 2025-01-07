import React from 'react';
import Link from 'next/link';
import styles from './Home.module.scss';

export default function Dashboard() {
  // Dados de teste
  const accountBalance = 2000;
  const availableChallenges = [
    { title: 'Decorar o título da lição', reward: 100 },
    { title: 'Ajudar uma pessoa', reward: 200 },
    { title: 'Orar 3x por dia', reward: 100 },
  ];
  const completedChallenges = [
    { title: 'Ajudar uma pessoa', reward: 200 },
  ];

  return (
    <div className={styles.wallet}>
      <div className={styles['wallet__account']}>
        <div className={styles['wallet__account-info']}>
          <span>Conta</span>
          <h2>C$ {accountBalance.toFixed(2)}</h2>
        </div>
        <Link href="/account" className={styles['wallet__account-link']}>
          <span className={styles['wallet__account-arrow']}>›</span>
        </Link>
      </div>

      <div className={styles['wallet__challenges']}>
        <h3 className={styles['wallet__challenges-title']}>Desafios Disponíveis</h3>
        <div className={styles['wallet__challenge-list']}>
          {availableChallenges.map((challenge, index) => (
            <div key={index} className={styles['wallet__challenge-item']}>
              <span className={styles['wallet__challenge-text']}>{challenge.title}</span>
              <span>{challenge.reward}C$</span>
            </div>
          ))}
        </div>

        <h3 className={styles['wallet__challenges-title']}>Desafios Concluídos</h3>
        <div className={`${styles['wallet__challenge-list']} ${styles['wallet__challenge-list--completed']}`}>
          {completedChallenges.map((challenge, index) => (
            <div key={index} className={styles['wallet__challenge-item']}>
              <span className={styles['wallet__challenge-text']}>{challenge.title}</span>
              <span>+{challenge.reward}C$</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


