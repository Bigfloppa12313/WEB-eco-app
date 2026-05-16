import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <nav>
        <Link href="/">Головна</Link>
        <Link href="/about">Про проєкт</Link>
        <Link href="/pollutants">Забруднювачі</Link>
      </nav>
    </header>
  );
}