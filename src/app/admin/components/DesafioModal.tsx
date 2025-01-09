import { useState, useEffect } from 'react'
import styles from './DesafioModal.module.scss'

interface DesafioModalProps {
  onClose: () => void
  onAdicionar: (desafio: { nome: string, valor: string }) => void
  desafioParaEditar?: { nome: string, valor: string }
  modoEdicao?: boolean
}

export function DesafioModal({ 
  onClose, 
  onAdicionar, 
  desafioParaEditar,
  modoEdicao = false 
}: DesafioModalProps) {
  const [nome, setNome] = useState('')
  const [pontos, setPontos] = useState('')

  useEffect(() => {
    if (desafioParaEditar) {
      setNome(desafioParaEditar.nome)
      setPontos(desafioParaEditar.valor.replace(' C$', ''))
    }
  }, [desafioParaEditar])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdicionar({
      nome: nome,
      valor: `${pontos} C$`
    })
    onClose()
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__conteudo}>
        <h3 className={styles.modal__titulo}>
          {modoEdicao ? 'Editar Desafio' : 'Novo Desafio'}
        </h3>
        <form onSubmit={handleSubmit} className={styles.modal__formulario}>
          <textarea
            className={styles.modal__input}
            placeholder="Digite o desafio..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <div className={styles.modal__grupo}>
            <label className={styles.modal__label}>Pontos</label>
            <input
              type="number"
              className={styles.modal__pontos}
              value={pontos}
              onChange={(e) => setPontos(e.target.value)}
            />
            <button type="submit" className={styles.modal__botao}>
              {modoEdicao ? 'salvar' : 'adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 