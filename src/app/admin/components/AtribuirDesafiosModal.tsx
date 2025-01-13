'use client'
import { useState } from 'react'
import styles from '../Admin.module.scss'

interface Desafio {
  nome: string
  valor: string
}

interface AtribuirDesafiosModalProps {
  onClose: () => void
  onAtribuir: (desafiosSelecionados: Desafio[]) => void
  desafiosDisponiveis: Desafio[]
  desafiosAtribuidos?: Desafio[]
  nomeUsuario: string
}

export function AtribuirDesafiosModal({ 
  onClose, 
  onAtribuir, 
  desafiosDisponiveis,
  desafiosAtribuidos = [],
  nomeUsuario 
}: AtribuirDesafiosModalProps) {
  const [novosSelecionados, setNovosSelecionados] = useState<Desafio[]>([])

  const handleToggleDesafio = (desafio: Desafio) => {
    const jaExiste = novosSelecionados.some(d => d.nome === desafio.nome)
    if (jaExiste) {
      setNovosSelecionados(novosSelecionados.filter(d => d.nome !== desafio.nome))
    } else {
      setNovosSelecionados([...novosSelecionados, desafio])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAtribuir([...desafiosAtribuidos, ...novosSelecionados])
    onClose()
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__conteudo}>
        <h3 className={styles.modal__titulo}>
          Atribuir Desafios para {nomeUsuario}
        </h3>
        <form onSubmit={handleSubmit} className={styles.modal__formulario}>
          {desafiosAtribuidos.length > 0 && (
            <>
              <h4 className={styles.modal__subtitulo}>Histórico de desafios atribuídos:</h4>
              <div className={styles.modal__desafios}>
                {desafiosAtribuidos.map((desafio, index) => (
                  <div key={`${desafio.nome}-${index}`} className={styles.modal__desafio}>
                    <span className={styles.modal__desafio_nome}>{desafio.nome}</span>
                    <span className={styles.modal__desafio_valor}>{desafio.valor}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <h4 className={styles.modal__subtitulo}>Selecione os desafios para atribuir:</h4>
          <div className={styles.modal__desafios}>
            {desafiosDisponiveis.map((desafio, index) => (
              <label key={`${desafio.nome}-${index}`} className={styles.modal__desafio}>
                <input
                  type="checkbox"
                  checked={novosSelecionados.some(d => d.nome === desafio.nome)}
                  onChange={() => handleToggleDesafio(desafio)}
                  className={styles.modal__checkbox}
                />
                <span className={styles.modal__desafio_nome}>{desafio.nome}</span>
                <span className={styles.modal__desafio_valor}>{desafio.valor}</span>
              </label>
            ))}
          </div>
          <div className={styles.modal__acoes}>
            <button type="submit" className={styles.modal__botao}>
              Adicionar Desafios
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`${styles.modal__botao} ${styles['modal__botao--cancelar']}`}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 