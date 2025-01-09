'use client'
import { useState } from 'react'
import styles from './Admin.module.scss'
import { DesafioModal } from './components/DesafioModal'
import { EditIcon, DeleteIcon } from './components/Icons'

export default function AdminPage() {
  const [showModal, setShowModal] = useState(false)
  const [desafioParaEditar, setDesafioParaEditar] = useState<{ nome: string, valor: string } | null>(null)
  const [desafios, setDesafios] = useState([
    { nome: 'Ler a biblia todos os dias', valor: '100 C$' },
    { nome: 'Orar 3x por dia', valor: '150 C$' },
    { nome: 'Falar sobre Jesus', valor: '200 C$' }
  ])

  const usuarios = [
    { nome: 'Shandriny Costa' },
    { nome: 'Nataliane Silva' },
    { nome: 'Vinicius Costa' }
  ]

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
              <button className={styles.admin__botao}>add desafio</button>
            </div>
          ))}
        </div>
        <button className={styles.admin__adicionar}>adicionar</button>
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
    </div>
  )
} 