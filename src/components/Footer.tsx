import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <Link href="/home" className="footer__link">
                <img src="home.svg" alt="Home" className="footer__icon" />
            </Link>
            <Link href="/extrato" className="footer__link">
                <img src="dollar.svg" alt="Dollar" className="footer__icon" />
            </Link>
            <Link href="/ranking" className="footer__link">
                <img src="rank.svg" alt="Ranking" className="footer__icon" />
            </Link>
            <Link href="/perfil" className="footer__link">
                <img src="perfil.svg" alt="Perfil" className="footer__icon" />
            </Link>
        </footer>
    );
}