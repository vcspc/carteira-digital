import Link from 'next/link';

export default function Header() {
  return (
    <header>
        <div className="header_container">
            <div className="header_container_left">
                <Link href="/perfil">
                    <img className="header_container_left_img" src="img_perfil.svg" alt="Imagem de perfil" />
                    <p className="header_container_left_text">Ola, José</p>
                </Link>
            </div>
            <div className="header_container_right">
                <img className="header_container_right_img" src="olho.svg" alt="ocultar" />
                <img className="header_container_right_img" src="ajuda.svg" alt="ajuda" />
            </div>
        </div>
    </header>
  )
}
