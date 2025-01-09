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
  const [desafiosSelecionados, setDesafiosSelecionados] = useState<Desafio[]>(desafiosAtribuidos)

  const handleToggleDesafio = (desafio: Desafio) => {
    const jaExiste = desafiosSelecionados.some(d => d.nome === desafio.nome)
    if (jaExiste) {
      setDesafiosSelecionados(desafiosSelecionados.filter(d => d.nome !== desafio.nome))
    } else {
      setDesafiosSelecionados([...desafiosSelecionados, desafio])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAtribuir(desafiosSelecionados)
    onClose()
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__conteudo}>
        <h3 className={styles.modal__titulo}>
          Atribuir Desafios para {nomeUsuario}
        </h3>
        <form onSubmit={handleSubmit} className={styles.modal__formulario}>
          <div className={styles.modal__desafios}>
            {desafiosDisponiveis.map((desafio, index) => (
              <label key={index} className={styles.modal__desafio}>
                <input
                  type="checkbox"
                  checked={desafiosSelecionados.some(d => d.nome === desafio.nome)}
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
              Atribuir
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