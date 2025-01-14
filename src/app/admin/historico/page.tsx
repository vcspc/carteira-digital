'use client'
import { useState, useEffect } from 'react'
import styles from './Historico.module.scss'

interface Acao {
  tipo: 'usuario' | 'desafio' | 'atribuicao'
  acao: 'criacao' | 'edicao' | 'exclusao' | 'atribuicao'
  detalhes: string
  data: string
  usuario?: string
}

export default function HistoricoPage() {
  const [historico, setHistorico] = useState<Acao[]>([])

  useEffect(() => {
    const historicoStorage = localStorage.getItem('historico_acoes')
    if (historicoStorage) {
      setHistorico(JSON.parse(historicoStorage))
    }
  }, [])

  const getTipoAcaoLabel = (tipo: string): string => {
    const tipos = {
      usuario: 'Usuário',
      desafio: 'Desafio',
      atribuicao: 'Atribuição'
    }
    return tipos[tipo as keyof typeof tipos] || tipo
  }

  const getAcaoLabel = (acao: string): string => {
    const acoes = {
      criacao: 'Criação',
      edicao: 'Edição',
      exclusao: 'Exclusão',
      atribuicao: 'Atribuição'
    }
    return acoes[acao as keyof typeof acoes] || acao
  }

  return (
    <div className={styles.historico}>
      <h1 className={styles.historico__titulo}>Histórico de Ações</h1>
      
      <div className={styles.historico__container}>
        {historico.length === 0 ? (
          <p className={styles.historico__vazio}>Nenhuma ação registrada ainda.</p>
        ) : (
          <ul className={styles.historico__lista}>
            {historico.map((acao, index) => (
              <li key={index} className={styles.historico__item}>
                <div className={styles.historico__cabecalho}>
                  <span className={styles.historico__tipo}>
                    {getTipoAcaoLabel(acao.tipo)}
                  </span>
                  <span className={styles.historico__acao}>
                    {getAcaoLabel(acao.acao)}
                  </span>
                  <span className={styles.historico__data}>{acao.data}</span>
                </div>
                <p className={styles.historico__detalhes}>{acao.detalhes}</p>
                {acao.usuario && (
                  <p className={styles.historico__usuario}>
                    Usuário afetado: {acao.usuario}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
