import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Footer() {
    const pathname = usePathname();

    // Função para verificar se o link está ativo
    const isActive = (path: string) => {
        const isAdminRoute = pathname?.startsWith('/admin');
        
        if (isAdminRoute) {
            switch (path) {
                case '/home':
                    return pathname === '/admin';
                case '/extrato':
                    return pathname === '/admin/historico';
                case '/ranking':
                    return pathname === '/admin/ranking';
                case '/perfil':
                    return pathname === '/admin/perfil';
                default:
                    return false;
            }
        }

        // Lógica original para rotas não-admin
        if (path === '/home' && pathname === '/') return true;
        return pathname === path;
    };

    // Função para obter o href correto baseado na rota atual
    const getHref = (path: string) => {
        const isAdminRoute = pathname?.startsWith('/admin');
        
        if (isAdminRoute) {
            switch (path) {
                case '/':
                    return '/admin';
                case '/extrato':
                    return '/admin/historico';
                case '/ranking':
                    return '/admin/ranking';
                case '/perfil':
                    return '/admin/perfil';
                default:
                    return path;
            }
        }
        return path;
    };

    return (
        <footer className="footer">
            <Link 
                href={getHref('/')} 
                className="footer__link"
            >
                {isActive('/home') ? (
                    <Image
                        src="/icons/home-active.svg"
                        alt="Home"
                        width={24}
                        height={24}
                        className="footer__icon"
                    />
                ) : (
                    <Image
                        src="/icons/home.svg"
                        alt="Home"
                        width={24}
                        height={24}
                        className="footer__icon"
                    />
                )}
            </Link>
            <Link 
                href={getHref('/extrato')} 
                className="footer__link"
            >
                {isActive('/extrato') ? (
                    <Image
                        src="/icons/extrato-active.svg"
                        alt="Extrato"
                        width={24}
                        height={24}
                        className="footer__icon"
                    />
                ) : (
                    <Image
                        src="/icons/extrato.svg"
                        alt="Extrato"
                        width={24}
                        height={24}
                        className="footer__icon"
                    />
                )}
            </Link>
            <Link 
                href={getHref('/ranking')} 
                className="footer__link"
            >
                {isActive('/ranking') ? (
                    <Image
                        src="/icons/ranking-active.svg"
                        alt="Ranking"
                        width={24}
                        height={24}
                        className="footer__icon"
                    />
                ) : (
                    <Image
                        src="/icons/ranking.svg"
                        alt="Ranking"
                        width={24}
                        height={24}
                        className="footer__icon"
                    />
                )}
            </Link>
            <Link 
                href={getHref('/perfil')} 
                className="footer__link"
            >
                {isActive('/perfil') ? (
                    <Image
                        src="/icons/perfil-active.svg"
                        alt="Perfil"
                        width={24}
                        height={24}
                        className="footer__icon"
                    />
                ) : (
                    <Image
                        src="/icons/perfil.svg"
                        alt="Perfil"
                        width={24}
                        height={24}
                        className="footer__icon"
                    />
                )}
            </Link>
        </footer>
    );
}