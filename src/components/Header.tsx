import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  showGreeting?: boolean;
  showEyeIcon?: boolean;
  showHelpIcon?: boolean;
}

export default function Header({ 
  showGreeting = true, 
  showEyeIcon = true, 
  showHelpIcon = true 
}: HeaderProps) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    switch(pathname) {
      case '/extrato':
        return 'Extrato';
      case '/ranking':
        return 'Ranking';
      case '/perfil':
        return 'Perfil';
      default:
        return '';
    }
  };

  const pageTitle = getPageTitle();

  return (
    <header>
      <div className="header_container">
        <div>
          <Link className="header_container_left" href="/perfil">
            <img 
              className="header_container_left_img" 
              src="img_perfil.svg" 
              alt="Imagem de perfil" 
            />
            {showGreeting && (
              <p className="header_container_left_text">Olá, José</p>
            )}
            {pageTitle && (
              <h1 className="header_container_left_title">{pageTitle}</h1>
            )}
          </Link>
        </div>
        <div className="header_container_right">
          {showEyeIcon && (
            <img 
              className="header_container_right_img" 
              src="olho.svg" 
              alt="ocultar" 
            />
          )}
          {showHelpIcon && (
            <img 
              className="header_container_right_img" 
              src="ajuda.svg" 
              alt="ajuda" 
            />
          )}
        </div>
      </div>
    </header>
  );
}
