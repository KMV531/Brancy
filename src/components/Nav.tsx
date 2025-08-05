'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/shop', name: 'shop' },
  { path: '/blog', name: 'blog' },
  { path: '/contact', name: 'contact' },
]

const Nav = ({
  containerStyles = '',
  linkStyles = '',
  onLinkClick,
}: {
  containerStyles?: string
  linkStyles?: string
  onLinkClick?: () => void
}) => {
  const pathname = usePathname()

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link) => {
        const isActive = pathname === link.path

        return (
          <Link
            key={link.path}
            href={link.path}
            onClick={onLinkClick}
            className={`capitalize transition-colors duration-300 ${
              isActive ? 'text-orange-400 font-semibold' : 'text-gray-800'
            } ${linkStyles}`}
          >
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
