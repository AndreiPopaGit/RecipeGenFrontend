import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 border-b border-gray-300">
      <Link href="/" className="text-gray-800 transition-colors hover:text-blue-600">
        Home
      </Link>
      <Link href="/recipes" className="text-gray-800 transition-colors hover:text-blue-600">
        Recipes
      </Link>
      <Link href="/about" className="text-gray-800 transition-colors hover:text-blue-600">
        About
      </Link>
    </nav>
  );
}