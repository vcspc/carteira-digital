'use client';

import styles from './Perfil.module.scss';
import Image from 'next/image';
import { useState } from 'react';

const AVATARES_DISPONIVEIS = [
  { src: '/avatares/perfil1.png', alt: 'Avatar 1' },
  { src: '/avatares/perfil2.png', alt: 'Avatar 2' },
  { src: '/avatares/perfil3.png', alt: 'Avatar 3' },
  { src: '/avatares/perfil4.png', alt: 'Avatar 4' },
  { src: '/avatares/perfil5.png', alt: 'Avatar 5' },
  { src: '/avatares/perfil6.png', alt: 'Avatar 6' },
  { src: '/avatares/perfil7.png', alt: 'Avatar 7' },
  { src: '/avatares/perfil8.png', alt: 'Avatar 8' },
];

export default function Perfil() {
  const [editando, setEditando] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('vcspc');
  const [avatarAtual, setAvatarAtual] = useState(AVATARES_DISPONIVEIS[0].src);
  const [seletorAvatarAberto, setSeletorAvatarAberto] = useState(false);

  const handleEditarClick = () => {
    if (editando) {
      setEditando(false);
    } else {
      setEditando(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditarClick();
    } else if (e.key === 'Escape') {
      setEditando(false);
    }
  };

  const handleAvatarClick = () => {
    setSeletorAvatarAberto(!seletorAvatarAberto);
  };

  const handleSelecionarAvatar = (src: string) => {
    setAvatarAtual(src);
    setSeletorAvatarAberto(false);
  };

  return (
    <div className={styles.perfil}>
      <h1 className={styles.perfil__titulo}>Perfil</h1>
      
      <div className={styles.perfil__avatar}>
        <Image 
          src={avatarAtual}
          alt="Foto de perfil"
          width={64}
          height={64}
          className={styles.perfil__icone}
          onClick={handleAvatarClick}
        />
        <div className={styles.perfil__editarFoto}>
          <Image 
            src="/lapis.svg"
            alt="Editar foto"
            width={16}
            height={16}
            onClick={handleAvatarClick}
          />
        </div>

        {seletorAvatarAberto && (
          <div className={styles.perfil__seletorAvatar}>
            {AVATARES_DISPONIVEIS.map((avatar) => (
              <Image
                key={avatar.src}
                src={avatar.src}
                alt={avatar.alt}
                width={48}
                height={48}
                className={styles.perfil__opcaoAvatar}
                onClick={() => handleSelecionarAvatar(avatar.src)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.perfil__info}>
        <p className={styles.perfil__label}>
          Você está logado como:
        </p>
        <div className={styles.perfil__valor}>
          {editando ? (
            <input
              type="text"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              onKeyDown={handleKeyPress}
              className={styles.perfil__input}
              autoFocus
            />
          ) : (
            nomeUsuario
          )}
          <Image 
            src={editando ? "/check.svg" : "/lapis.svg"}
            alt={editando ? "Salvar" : "Editar"}
            width={24}
            height={24}
            className={styles.perfil__editar}
            onClick={handleEditarClick}
          />
        </div>
        
        <p className={styles.perfil__label}>
          vitonicius@gmail.com
        </p>
      </div>
    </div>
  );
}
