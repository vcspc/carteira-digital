'use client'

import styles from './Extrato.module.scss'

interface PontoRegistro {
  titulo: string;
  data: string;
  pontos: number;
}

export default function Extrato() {
  const registros: PontoRegistro[] = [
    {
      titulo: "Ler a lição diariamente",
      data: "03/01/2025",
      pontos: 200
    },
    {
      titulo: "Orar 3x por dia",
      data: "03/01/2025",
      pontos: 400
    },
    {
      titulo: "Orar 3x por dia",
      data: "03/01/2025",
      pontos: 400
    },
    {
      titulo: "Orar 3x por dia",
      data: "03/01/2025",
      pontos: 400
    },
    {
      titulo: "Orar 3x por dia",
      data: "03/01/2025",
      pontos: 400
    }
  ];

  return (
    <div className={styles.extrato}>
      <h1 className={styles.extrato__titulo}>Acompanhe suas conquistas</h1>
      <div className={styles.extrato__lista}>
        {registros.map((registro, index) => (
          <div key={index} className={styles.extrato__item}>
            <div className={styles['extrato__item-info']}>
              <h2 className={styles['extrato__item-titulo']}>{registro.titulo}</h2>
              <span className={styles['extrato__item-data']}>{registro.data}</span>
            </div>
            <span className={styles['extrato__item-pontos']}>+{registro.pontos}$</span>
          </div>
        ))}
      </div>
    </div>
  )
}
