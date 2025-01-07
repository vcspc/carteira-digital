'use client'

import styles from './Ranking.module.scss'

interface RankingItem {
  posicao: number;
  nome: string;
  valor: number;
}

export default function RankingPage() {
  // Dados iniciais sem posição definida
  const dadosIniciais = [
    { nome: 'José', valor: 4000 },
    { nome: 'Maria', valor: 6000 },
    { nome: 'Gabriel', valor: 4750 },
    { nome: 'Leonardo', valor: 2000 },
    { nome: 'Ana', valor: 10000 },
    { nome: 'Daniel', valor: 1000 },
  ];

  // Ordena os dados por valor e adiciona a posição
  const rankingData: RankingItem[] = dadosIniciais
    .sort((a, b) => b.valor - a.valor)
    .map((item, index) => ({
      ...item,
      posicao: index + 1
    }));

  return (
    <div className={styles.ranking}>
      <div className={styles.ranking__header}>
        <div className={styles.ranking__icon}>
          <span className={styles['ranking__icon-text']}>Ranking</span>
        </div>
      </div>
      <ul className={styles.ranking__list}>
        {rankingData.map((item) => (
          <li key={item.posicao} className={styles.ranking__item}>
            <span className={styles['ranking__item-position']}>{item.posicao}</span>
            <span className={styles['ranking__item-name']}>{item.nome}</span>
            <span className={styles['ranking__item-value']}>
              {`${item.valor.toLocaleString('pt-BR')} C$`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
