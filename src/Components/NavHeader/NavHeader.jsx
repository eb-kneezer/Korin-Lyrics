import React from 'react'

import {Link} from 'react-router-dom'

import styles from './NavHeader.module.css'

export default function NavHeader() {
  return (
    <nav>
      <div >
        <Link className={styles.logo} to='/'>
          {/* <img alt='logo' src="https://img.icons8.com/ios/50/000000/music--v1.png"/> */}
          <span>KORIN</span>
        </Link>
        {/* <a href="https://icons8.com/icon/381/music">Music icon by Icons8</a> */}
      </div>
      <ul className={styles.navlinks}>
        <Link className={styles.links} to='/artist'>Popular</Link>
        <Link className={styles.links} to='/song'>Charts</Link>
      </ul>
      <div className={styles.navsearch}>
        <form>
          <input type="search" name="" id=""/>
          <button>GO</button>
        </form>
      </div>
    </nav>
  )
}
