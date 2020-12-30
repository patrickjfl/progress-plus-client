import Avatar from '../components/avatar';
import UsefulLinks from '../components/usefulLinks';
import SignOut from '../components/signOut';
import NavBar from '../components/NavBar';
import bootcamperNavBarArr from '../libs/globalvariables/navBarArrays';
import nookies from 'nookies';
import { verifyIdToken } from '../firebaseAuthUtils/firebaseAdmin';
import url from '../libs/globalvariables/backendUrl';

export default function RecapTasks({ session }) {
  return (
    <div>
      <header className='header'>
        <SignOut />
        <Avatar />
        <NavBar linksAndTitles={bootcamperNavBarArr} />
        <button
          onClick={() => {
            console.log(session.data);
          }}>
          Testing data in console
        </button>
      </header>
      <footer className='footer'>
        <UsefulLinks />
      </footer>
    </div>
  );
}

const url = process.env.NEXT_APP_BACKEND_URL;
// uncomment when backend tables are sorted

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    console.log(token);
    const { uid, email, name, picture } = token;

<<<<<<< HEAD
    const res = await fetch(`http://localhost:5000/feedback/${uid}/recap`);
    // const res = await fetch(`${url}feedback/${uid}/recap`);
=======
    const res = await fetch(`${url}/feedback/${uid}/recap`);
>>>>>>> 61
    const data = await res.json();

    return {
      props: { session: { name, uid, data } },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: '/login' });
    context.res.end();
    console.log(err.message);
    return { props: {} };
  }
}
