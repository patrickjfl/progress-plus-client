import nookies from 'nookies';
import { verifyIdToken } from '../../firebaseUtils/firebaseAdmin';
import { backendUrl } from '../globalVariables/urls';

export default async function serverSideProps(
	context,
	customFetchRequest,
	githubApiFetch
) {
	try {
		const cookies = nookies.get(context);
		console.log(cookies);
		const { token } = cookies;
		const sessionData = await verifyIdToken(cookies.token);
		const { uid, picture } = sessionData;

		const res = await fetch(`${backendUrl}${uid}`, {
			headers: { authorization: `Bearer ${token}` },
		});
		const userData = await res.json();
		// console.log({ userData });
		const { name } = userData.data[0];
		let data = '';
		if (customFetchRequest) {
			data = await customFetchRequest(backendUrl, uid, cookies.token);
		}
		let githubData = '';
		if (githubApiFetch) {
			githubData = await githubApiFetch(cookies.gitHubApiToken);
			//console.log(githubData);
		}

		return {
			props: { session: { name, uid, picture, data, token, githubData } },
		};
	} catch (err) {
		console.log(err);
		context.res.writeHead(302, { Location: '/' });
		context.res.end();
		return { props: {} };
	}
}

// -------------------> OLD CODE - to be removed at some point <------------------------------------
/* import nookies from 'nookies';
import { verifyIdToken } from '../../firebaseUtils/firebaseAdmin';
import { backendUrl } from '../globalVariables/urls';

export default async function serverSideProps(context, customFetchRequest) {
  try {
    const cookies = nookies.get(context);
    const { token } = cookies;
    const sessionData = await verifyIdToken(cookies.token);
    const { uid, picture } = sessionData;

    const res = await fetch(`${backendUrl}${uid}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const userData = await res.json();
    // console.log({ userData });
    const { name } = userData.data[0];
    let data = '';
    if (customFetchRequest) {
      data = await customFetchRequest(backendUrl, uid, cookies.token);
      // console.log(data);
    }

    return {
      props: { session: { name, uid, picture, data, token } },
    };
  } catch (err) {
    console.log(err);
    context.res.writeHead(302, { Location: '/' });
    context.res.end();
    return { props: {} };
  }
}
 */
