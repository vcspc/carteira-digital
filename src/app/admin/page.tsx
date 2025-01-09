'use client'
import { useState } from 'react'
import styles from './Admin.module.scss'
import { DesafioModal } from './components/DesafioModal'
import { EditIcon, DeleteIcon, AttributeIcon } from './components/Icons'
import { UsuarioModal } from './components/UsuarioModal'
import { AtribuirDesafiosModal } from './components/AtribuirDesafiosModal'

interface Usuario {
  nome: string
  email: string
  senha: string
  desafiosAtribuidos?: { nome: string, valor: string }[]
}

export default function AdminPage() {
  const [showModal, setShowModal] = useState(false)
  const [desafioParaEditar, setDesafioParaEditar] = useState<{ nome: string, valor: string } | null>(null)
  const [desafios, setDesafios] = useState([
    { nome: 'Ler a biblia todos os dias', valor: '100 C$' },
    { nome: 'Orar 3x por dia', valor: '150 C$' },
    { nome: 'Falar sobre Jesus', valor: '200 C$' }
  ])

  const [showUsuarioModal, setShowUsuarioModal] = useState(false)
  const [usuarioParaEditar, setUsuarioParaEditar] = useState<{ nome: string, email: string, senha: string } | null>(null)
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { 
      nome: 'Shandriny Costa', 
      email: 'shandriny@email.com', 
      senha: '123456',
      desafiosAtribuidos: []
    },
    { nome: 'Nataliane Silva', email: 'nataliane@email.com', senha: '123456' },
    { nome: 'Vinicius Costa', email: 'vinicius@email.com', senha: '123456' }
  ])

  const [showAtribuirModal, setShowAtribuirModal] = useState(false)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null)

  const adicionarOuEditarDesafio = (novoDesafio: { nome: string, valor: string }) => {
    if (desafioParaEditar) {
      // Modo edição
      setDesafios(desafios.map(desafio => 
        desafio.nome === desafioParaEditar.nome ? novoDesafio : desafio
      ))
      setDesafioParaEditar(null)
    } else {
      // Modo adição
      setDesafios([...desafios, novoDesafio])
    }
  }

  const excluirDesafio = (desafioNome: string) => {
    setDesafios(desafios.filter(desafio => desafio.nome !== desafioNome))
  }

  const abrirModalEdicao = (desafio: { nome: string, valor: string }) => {
    setDesafioParaEditar(desafio)
    setShowModal(true)
  }

  const adicionarOuEditarUsuario = (novoUsuario: { nome: string, email: string, senha: string }) => {
    if (usuarioParaEditar) {
      setUsuarios(usuarios.map(usuario => 
        usuario.nome === usuarioParaEditar.nome ? novoUsuario : usuario
      ))
      setUsuarioParaEditar(null)
    } else {
      setUsuarios([...usuarios, novoUsuario])
    }
  }

  const atribuirDesafios = (desafiosSelecionados: { nome: string, valor: string }[]) => {
    if (usuarioSelecionado) {
      setUsuarios(usuarios.map(usuario => 
        usuario.nome === usuarioSelecionado.nome 
          ? { ...usuario, desafiosAtribuidos: desafiosSelecionados }
          : usuario
      ))
    }
  }

  return (
    <div className={styles.admin}>
      <section className={styles.admin__secao}>
        <h2 className={styles.admin__titulo}>Desafios</h2>
        <div className={styles.admin__lista}>
          {desafios.map((desafio, index) => (
            <div key={index} className={styles.admin__item}>
              <span>{desafio.nome}</span>
              <div className={styles.admin__acoes}>
                <span className={styles.admin__valor}>{desafio.valor}</span>
                <button 
                  className={`${styles.admin__icon_button} ${styles['admin__icon-button--editar']}`}
                  onClick={() => abrirModalEdicao(desafio)}
                  title="Editar desafio"
                >
                  <EditIcon />
                </button>
                <button 
                  className={`${styles.admin__icon_button} ${styles['admin__icon-button--excluir']}`}
                  onClick={() => excluirDesafio(desafio.nome)}
                  title="Excluir desafio"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button 
          className={styles.admin__adicionar}
          onClick={() => {
            setDesafioParaEditar(null)
            setShowModal(true)
          }}
        >
          adicionar
        </button>
      </section>

      <section className={styles.admin__secao}>
        <h2 className={styles.admin__titulo}>Usuários</h2>
        <div className={styles.admin__lista}>
          {usuarios.map((usuario, index) => (
            <div key={index} className={styles.admin__item}>
              <span>{usuario.nome}</span>
              <div className={styles.admin__acoes}>
                <button 
                  className={`${styles.admin__icon_button} ${styles['admin__icon-button--atribuir']}`}
                  onClick={() => {
                    setUsuarioSelecionado(usuario)
                    setShowAtribuirModal(true)
                  }}
                  title="Atribuir desafios"
                >
                  <AttributeIcon />
                </button>
                <button 
                  className={`${styles.admin__icon_button} ${styles['admin__icon-button--editar']}`}
                  onClick={() => {
                    setUsuarioParaEditar(usuario)
                    setShowUsuarioModal(true)
                  }}
                  title="Editar usuário"
                >
                  <EditIcon />
                </button>
                <button 
                  className={`${styles.admin__icon_button} ${styles['admin__icon-button--excluir']}`}
                  onClick={() => setUsuarios(usuarios.filter(u => u.nome !== usuario.nome))}
                  title="Excluir usuário"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button 
          className={styles.admin__adicionar}
          onClick={() => {
            setUsuarioParaEditar(null)
            setShowUsuarioModal(true)
          }}
        >
          adicionar
        </button>
      </section>

      {showModal && (
        <DesafioModal
          onClose={() => {
            setShowModal(false)
            setDesafioParaEditar(null)
          }}
          onAdicionar={adicionarOuEditarDesafio}
          desafioParaEditar={desafioParaEditar || undefined}
          modoEdicao={!!desafioParaEditar}
        />
      )}

      {showUsuarioModal && (
        <UsuarioModal
          onClose={() => {
            setShowUsuarioModal(false)
            setUsuarioParaEditar(null)
          }}
          onAdicionar={adicionarOuEditarUsuario}
          usuarioParaEditar={usuarioParaEditar || undefined}
          modoEdicao={!!usuarioParaEditar}
        />
      )}

      {showAtribuirModal && usuarioSelecionado && (
        <AtribuirDesafiosModal
          onClose={() => {
            setShowAtribuirModal(false)
            setUsuarioSelecionado(null)
          }}
          onAtribuir={atribuirDesafios}
          desafiosDisponiveis={desafios}
          desafiosAtribuidos={usuarioSelecionado.desafiosAtribuidos}
          nomeUsuario={usuarioSelecionado.nome}
        />
      )}
    </div>
  )
} 