'use client'
import { useState } from 'react'
import styles from '../Admin.module.scss'
import { DeleteIcon } from './Icons'

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
  const [desafiosAtuais, setDesafiosAtuais] = useState<Desafio[]>(desafiosAtribuidos)

  const handleToggleDesafio = (desafio: Desafio) => {
    const jaExiste = novosSelecionados.some(d => d.nome === desafio.nome)
    if (jaExiste) {
      setNovosSelecionados(novosSelecionados.filter(d => d.nome !== desafio.nome))
    } else {
      setNovosSelecionados([...novosSelecionados, desafio])
    }
  }

  const handleRemoverDesafio = (index: number) => {
    const novosDesafios = [...desafiosAtuais]
    novosDesafios.splice(index, 1)
    setDesafiosAtuais(novosDesafios)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAtribuir([...desafiosAtuais, ...novosSelecionados])
    onClose()
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__conteudo}>
        <h3 className={styles.modal__titulo}>
          Atribuir Desafios para {nomeUsuario}
        </h3>
        <form onSubmit={handleSubmit} className={styles.modal__formulario}>
          {desafiosAtuais.length > 0 && (
            <>
              <h4 className={styles.modal__subtitulo}>Histórico de desafios atribuídos:</h4>
              <div className={styles.modal__desafios}>
                {desafiosAtuais.map((desafio, index) => (
                  <div key={`${desafio.nome}-${index}`} className={styles.modal__desafio}>
                    <span className={styles.modal__desafio_nome}>{desafio.nome}</span>
                    <span className={styles.modal__desafio_valor}>{desafio.valor}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoverDesafio(index)}
                      className={`${styles.admin__icon_button} ${styles['admin__icon-button--excluir']}`}
                      title="Remover desafio"
                    >
                      <DeleteIcon />
                    </button>
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