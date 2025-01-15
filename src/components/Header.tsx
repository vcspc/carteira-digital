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
      case '/admin/historico':
        return 'Histórico';
      case '/admin/ranking':
        return 'Ranking';
      case '/admin/perfil':
        return 'Perfil';
      default:
        return '';
    }
  };

  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminHome = pathname === '/admin';
  const shouldShowEyeIcon = !isAdminRoute || isAdminHome;
  const shouldShowGreeting = showGreeting && isAdminHome;

  const pageTitle = getPageTitle();

  return (
    <header>
      <div className="header_container">
        <div>
          <Link 
            className="header_container_left" 
            href={isAdminRoute ? '/admin/perfil' : '/perfil'}
          >
            <img 
              className="header_container_left_img" 
              src="img_perfil.svg" 
              alt="Imagem de perfil" 
            />
            {shouldShowGreeting && (
              <p className="header_container_left_text">Olá, José</p>
            )}
            {pageTitle && (
              <h1 className="header_container_left_title">{pageTitle}</h1>
            )}
          </Link>
        </div>
        <div className="header_container_right">
          {shouldShowEyeIcon && showEyeIcon && (
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
