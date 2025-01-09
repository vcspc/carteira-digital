'use client'
import { useState } from 'react'
import styles from '../Admin.module.scss'

interface UsuarioModalProps {
  onClose: () => void
  onAdicionar: (novoUsuario: { nome: string, email: string, senha: string }) => void
  usuarioParaEditar?: { nome: string, email: string, senha: string }
  modoEdicao?: boolean
}

export function UsuarioModal({ onClose, onAdicionar, usuarioParaEditar, modoEdicao }: UsuarioModalProps) {
  const [usuario, setUsuario] = useState({
    nome: usuarioParaEditar?.nome || '',
    email: usuarioParaEditar?.email || '',
    senha: usuarioParaEditar?.senha || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdicionar(usuario)
    onClose()
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__conteudo}>
        <h3 className={styles.modal__titulo}>
          {modoEdicao ? 'Editar Usuário' : 'Adicionar Usuário'}
        </h3>
        <form onSubmit={handleSubmit} className={styles.modal__formulario}>
          <div className={styles.modal__campo}>
            <label className={styles.modal__label}>Nome</label>
            <input
              type="text"
              className={styles.modal__input}
              placeholder="Digite o nome completo..."
              value={usuario.nome}
              onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
              required
            />
          </div>
          <div className={styles.modal__campo}>
            <label className={styles.modal__label}>Email</label>
            <input
              type="email"
              className={styles.modal__input}
              placeholder="Digite o email..."
              value={usuario.email}
              onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
              required
            />
          </div>
          <div className={styles.modal__campo}>
            <label className={styles.modal__label}>Senha</label>
            <input
              type="password"
              className={styles.modal__input}
              placeholder="Digite a senha..."
              value={usuario.senha}
              onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
              required
            />
          </div>
          <div className={styles.modal__acoes}>
            <button type="submit" className={styles.modal__botao}>
              {modoEdicao ? 'Salvar' : 'Adicionar'}
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