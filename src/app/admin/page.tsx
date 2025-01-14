'use client'
import { useState, useEffect } from 'react'
import styles from './Admin.module.scss'
import { DesafioModal } from './components/DesafioModal'
import { EditIcon, DeleteIcon, AttributeIcon } from './components/Icons'
import { UsuarioModal } from './components/UsuarioModal'
import { AtribuirDesafiosModal } from './components/AtribuirDesafiosModal'
import Link from 'next/link'

interface Usuario {
  nome: string
  email: string
  senha: string
  desafiosAtribuidos?: { nome: string, valor: string }[]
}

interface Acao {
  tipo: 'usuario' | 'desafio' | 'atribuicao'
  acao: 'criacao' | 'edicao' | 'exclusao' | 'atribuicao'
  detalhes: string
  data: string
  usuario?: string
}

export default function AdminPage() {
  const [showModal, setShowModal] = useState(false)
  const [desafioParaEditar, setDesafioParaEditar] = useState<{ nome: string, valor: string } | null>(null)
  const [desafios, setDesafios] = useState<{ nome: string, valor: string }[]>([])

  const [showUsuarioModal, setShowUsuarioModal] = useState(false)
  const [usuarioParaEditar, setUsuarioParaEditar] = useState<{ nome: string, email: string, senha: string } | null>(null)
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  useEffect(() => {
    const usuariosStorage = localStorage.getItem('usuarios')
    if (usuariosStorage) {
      setUsuarios(JSON.parse(usuariosStorage))
    } else {
      const dadosIniciais = [
        { 
          nome: 'Shandriny Costa', 
          email: 'shandriny@email.com', 
          senha: '123456',
          desafiosAtribuidos: []
        },
        { 
          nome: 'Nataliane Silva', 
          email: 'nataliane@email.com', 
          senha: '123456',
          desafiosAtribuidos: []
        },
        { 
          nome: 'Vinicius Costa', 
          email: 'vinicius@email.com', 
          senha: '123456',
          desafiosAtribuidos: []
        }
      ]
      setUsuarios(dadosIniciais)
      localStorage.setItem('usuarios', JSON.stringify(dadosIniciais))
    }
  }, [])

  const [showAtribuirModal, setShowAtribuirModal] = useState(false)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null)

  useEffect(() => {
    const desafiosStorage = localStorage.getItem('desafios')
    if (desafiosStorage) {
      setDesafios(JSON.parse(desafiosStorage))
    } else {
      const dadosIniciais = [
        { nome: 'Ler a biblia todos os dias', valor: '100 C$' },
        { nome: 'Orar 3x por dia', valor: '150 C$' },
        { nome: 'Falar sobre Jesus', valor: '200 C$' }
      ]
      setDesafios(dadosIniciais)
      localStorage.setItem('desafios', JSON.stringify(dadosIniciais))
    }
  }, [])

  const registrarAcao = (
    tipo: Acao['tipo'], 
    acao: Acao['acao'], 
    detalhes: string, 
    usuario?: string
  ) => {
    const historicoAntigo = JSON.parse(localStorage.getItem('historico_acoes') || '[]')
    const novaAcao: Acao = {
      tipo,
      acao,
      detalhes,
      data: new Date().toLocaleString(),
      usuario
    }
    localStorage.setItem('historico_acoes', JSON.stringify([novaAcao, ...historicoAntigo]))
  }

  const adicionarOuEditarDesafio = (novoDesafio: { nome: string, valor: string }) => {
    let desafiosAtualizados: { nome: string, valor: string }[]
    const agora = new Date().toLocaleString()

    // Registrar a ação no histórico
    const historicoAntigo = JSON.parse(localStorage.getItem('historico_acoes') || '[]')
    const novaAcao = {
      tipo: 'desafio',
      acao: desafioParaEditar ? 'edicao' : 'criacao',
      detalhes: desafioParaEditar 
        ? `Desafio "${novoDesafio.nome}" foi editado`
        : `Novo desafio "${novoDesafio.nome}" foi criado`,
      data: agora
    }

    localStorage.setItem('historico_acoes', JSON.stringify([novaAcao, ...historicoAntigo]))

    if (desafioParaEditar) {
      // Modo edição
      desafiosAtualizados = desafios.map(desafio => 
        desafio.nome === desafioParaEditar.nome ? novoDesafio : desafio
      )
    } else {
      // Modo adição
      desafiosAtualizados = [...desafios, novoDesafio]
    }

    setDesafios(desafiosAtualizados)
    localStorage.setItem('desafios', JSON.stringify(desafiosAtualizados))
    setDesafioParaEditar(null)
  }

  const excluirDesafio = (desafioNome: string) => {
    // Primeiro, encontrar usuários que têm este desafio atribuído
    const usuariosAfetados = usuarios.filter(
      usuario => usuario.desafiosAtribuidos?.some(d => d.nome === desafioNome)
    )

    // Remover o desafio de todos os usuários
    if (usuariosAfetados.length > 0) {
      const usuariosAtualizados = usuarios.map(usuario => ({
        ...usuario,
        desafiosAtribuidos: usuario.desafiosAtribuidos?.filter(d => d.nome !== desafioNome) || []
      }))
      setUsuarios(usuariosAtualizados)
      localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados))

      registrarAcao(
        'desafio',
        'exclusao',
        `Desafio "${desafioNome}" foi excluído e removido de ${usuariosAfetados.length} usuários`,
        usuariosAfetados.map(u => u.nome).join(', ')
      )
    } else {
      registrarAcao('desafio', 'exclusao', `Desafio "${desafioNome}" foi excluído`)
    }

    const desafiosAtualizados = desafios.filter(desafio => desafio.nome !== desafioNome)
    setDesafios(desafiosAtualizados)
    localStorage.setItem('desafios', JSON.stringify(desafiosAtualizados))
  }

  const abrirModalEdicao = (desafio: { nome: string, valor: string }) => {
    setDesafioParaEditar(desafio)
    setShowModal(true)
  }

  const adicionarOuEditarUsuario = (novoUsuario: Usuario) => {
    let usuariosAtualizados: Usuario[]
    
    if (usuarioParaEditar) {
      const usuarioAntigo = usuarios.find(u => u.nome === usuarioParaEditar.nome)
      usuariosAtualizados = usuarios.map(usuario => 
        usuario.nome === usuarioParaEditar.nome 
          ? { 
              ...novoUsuario, 
              desafiosAtribuidos: novoUsuario.desafiosAtribuidos || usuario.desafiosAtribuidos 
            }
          : usuario
      )

      const mudancas = []
      if (usuarioAntigo?.nome !== novoUsuario.nome) mudancas.push('nome')
      if (usuarioAntigo?.email !== novoUsuario.email) mudancas.push('email')
      if (usuarioAntigo?.senha !== novoUsuario.senha) mudancas.push('senha')

      registrarAcao(
        'usuario',
        'edicao',
        `Usuário "${usuarioParaEditar.nome}" foi editado (campos alterados: ${mudancas.join(', ')})`
      )
    } else {
      usuariosAtualizados = [...usuarios, { ...novoUsuario, desafiosAtribuidos: [] }]
      registrarAcao(
        'usuario',
        'criacao',
        `Novo usuário "${novoUsuario.nome}" foi criado com email: ${novoUsuario.email}`
      )
    }
    
    setUsuarios(usuariosAtualizados)
    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados))
    setUsuarioParaEditar(null)
  }

  const atribuirDesafios = (desafiosSelecionados: { nome: string, valor: string }[]) => {
    if (usuarioSelecionado) {
      const desafiosAnteriores = usuarioSelecionado.desafiosAtribuidos || []
      const usuariosAtualizados = usuarios.map(usuario => 
        usuario.nome === usuarioSelecionado.nome 
          ? { ...usuario, desafiosAtribuidos: desafiosSelecionados }
          : usuario
      )
      
      // Encontrar desafios removidos
      const desafiosRemovidos = desafiosAnteriores.filter(
        desafioAntigo => !desafiosSelecionados.some(
          novoDesafio => novoDesafio.nome === desafioAntigo.nome
        )
      )

      // Encontrar novos desafios
      const novosDesafios = desafiosSelecionados.filter(
        novoDesafio => !desafiosAnteriores.some(
          desafioAntigo => desafioAntigo.nome === novoDesafio.nome
        )
      )

      // Registrar remoções
      if (desafiosRemovidos.length > 0) {
        registrarAcao(
          'atribuicao',
          'exclusao',
          `Removidos ${desafiosRemovidos.length} desafios: ${desafiosRemovidos.map(d => d.nome).join(', ')}`,
          usuarioSelecionado.nome
        )
      }

      // Registrar novas atribuições
      if (novosDesafios.length > 0) {
        registrarAcao(
          'atribuicao',
          'atribuicao',
          `Atribuídos ${novosDesafios.length} desafios: ${novosDesafios.map(d => d.nome).join(', ')}`,
          usuarioSelecionado.nome
        )
      }

      setUsuarios(usuariosAtualizados)
      localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados))
    }
  }

  const excluirUsuario = (nomeUsuario: string) => {
    const usuario = usuarios.find(u => u.nome === nomeUsuario)
    const usuariosAtualizados = usuarios.filter(u => u.nome !== nomeUsuario)
    
    if (usuario?.desafiosAtribuidos?.length) {
      registrarAcao(
        'usuario',
        'exclusao',
        `Usuário "${nomeUsuario}" foi excluído com ${usuario.desafiosAtribuidos.length} desafios atribuídos`
      )
    } else {
      registrarAcao('usuario', 'exclusao', `Usuário "${nomeUsuario}" foi excluído`)
    }

    setUsuarios(usuariosAtualizados)
    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados))
  }

  return (
    <div className={styles.admin}>
      <nav className={styles.admin__nav}>
        <Link href="/admin/historico" className={styles.admin__nav_link}>
          Ver Histórico
        </Link>
      </nav>
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
                  onClick={() => excluirUsuario(usuario.nome)}
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