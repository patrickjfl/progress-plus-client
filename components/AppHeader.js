import styles from '../styles/componentStyle/appHeader.module.css';
import { bootcamperNavBarArr } from '../libs/globalVariables/navBarArrays';
import Avatar from './Avatar';
import NavBar from './NavBar';

export default function AppHeader({
  session,
  navBarArr = bootcamperNavBarArr,
}) {
  return (
    <section className={styles.header}>
      <img src='/astronaut2.png' className={styles.astronaut} alt='Astronaut' />
      <div className={styles.avatar}>
        <Avatar src={session.picture} name={session.name} />
      </div>
      <NavBar linksAndTitles={navBarArr} />
    </section>
  );
}
