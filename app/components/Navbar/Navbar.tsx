'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation'

type Props = {}
const Navbar = (props: Props) => {
  const [activeStyle1, setActiveStyle1] = useState<string>(styles.blueText)
  const [activeStyle2, setActiveStyle2] = useState<string>(styles.blackText)
  const pathname = usePathname()

  useEffect(() => {
    handleLinkClick(pathname)
  }, [pathname])

  const handleLinkClick = (link: string) => {
    if (link === '/') {
      setActiveStyle1(styles.blueText)
      setActiveStyle2(styles.blackText)
    } else if (link === '/results') {
      setActiveStyle2(styles.blueText)
      setActiveStyle1(styles.blackText)
    } else {
      setActiveStyle2(styles.blackText)
      setActiveStyle1(styles.blackText)
    }
  }

  return (
    <nav className={styles.nav}>
      <section className={styles.leftSection}>_Surveys</section>
      <section className={styles.rightSection}>
        <Link
          href="/"
          onClick={() => handleLinkClick('/')}
          className={`${styles.links} ${activeStyle1}  `}
        >
          FILL OUT SURVEY
        </Link>

        <Link
          href="/results"
          onClick={() => handleLinkClick('/results')}
          className={`${styles.links} ${activeStyle2}`}
        >
          VIEW SURVEY RESULTS
        </Link>
      </section>
    </nav>
  )
}
export default Navbar
