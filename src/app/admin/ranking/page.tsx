'use client'
import { useState, useEffect } from 'react'
import styles from './Ranking.module.scss'

interface Usuario {
  nome: string
  desafiosAtribuidos?: { nome: string, valor: string }[]
}

interface RankingItem {
  posicao: number
  nome: string
  valor: number
}

export default function RankingPage() {
  const [rankingData, setRankingData] = useState<RankingItem[]>([])

  useEffect(() => {
    // Recupera os usuários do localStorage
    const usuariosString = localStorage.getItem('usuarios')
    const usuarios: Usuario[] = usuariosString ? JSON.parse(usuariosString) : []

    // Calcula os pontos totais para cada usuário
    const dadosRanking = usuarios.map(usuario => {
      const pontosTotais = usuario.desafiosAtribuidos?.reduce((total, desafio) => {
        // Extrai o valor numérico da string "XXX C$"
        const valorNumerico = parseInt(desafio.valor.split(' ')[0])
        return total + valorNumerico
      }, 0) || 0

      return {
        nome: usuario.nome,
        valor: pontosTotais
      }
    })

    // Ordena por pontos e adiciona posição
    const rankingOrdenado = dadosRanking
      .sort((a, b) => b.valor - a.valor)
      .map((item, index) => ({
        ...item,
        posicao: index + 1
      }))

    setRankingData(rankingOrdenado)
  }, [])

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
  )
}
