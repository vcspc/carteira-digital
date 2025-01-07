import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <Link href="/home" className="footer__link">
                <img src="home.svg" alt="Home" className="footer__icon" />
            </Link>
            <Link href="#" className="footer__link">
                <img src="dollar.svg" alt="Dollar" className="footer__icon" />
            </Link>
            <Link href="#" className="footer__link">
                <img src="rank.svg" alt="Building" className="footer__icon" />
            </Link>
            <Link href="#" className="footer__link">
                <img src="perfil.svg" alt="User" className="footer__icon" />
            </Link>
        </footer>
    );
}