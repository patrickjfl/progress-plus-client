import React, { useReducer } from 'react';
import AppHeader from '../../components/AppHeader';
import serverSideProps from '../../libs/functions/serverSideProps';
import ScoreGraph from '../../components/ScoreGraph';
import FeedbackTable from '../../components/bootcamper/FeedbackTable';
import styles from './masterytasks.module.css';
import useGraphSelect from '../../libs/customHooks/useGraphSelect';
import { sortMasteryData } from '../../libs/functions/sortFeedbackData';
import { Octokit } from '@octokit/core';

export default function MasteryTasks({ session }) {
  const initialState = {
    bootcamperName: session.name,
    masteryFeedbackData: [...sortMasteryData(session.name, session)],
    selectedData: {},
  };
  const [state, dispatch] = useReducer(useGraphSelect, initialState);

  console.log(
    session.githubData.filter((repo) => {
      return repo.name.includes('mastery_task');
    })
  );

  return (
    <>
      <AppHeader session={session} />
      <div className={styles.container}>
        <h1 className={styles.title}>{session.name}'s Mastery Task Score</h1>
        <div className={styles.graph}>
          <ScoreGraph
            feedbackData={state.masteryFeedbackData}
            bootcamperName={state.bootcamperName}
            taskType={'Mastery'}
            setSelectedData={(object) =>
              dispatch({
                type: 'week selected',
                payload: object,
              })
            }
          />
          <br></br>
        </div>
        <div className={styles.table}>
          <FeedbackTable selectedData={state.selectedData} />
        </div>
        <br></br>
        <br></br>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  async function fetchFeedbackData(url, uid, token) {
    const res = await fetch(`${url}feedback?uid=${uid}&type=mastery`, {
      headers: { authorization: `Bearer ${token}` },
    }); // mastery task score
    const { data } = await res.json();
    return data;
  }

  async function getMasteryTasks(githubToken) {
    const octokit = new Octokit({
      auth: `token ${githubToken}`,
    });

    const response = await octokit.request('GET /user/repos', {
      per_page: 50,
    });

    //This is to access code blocks and specific comments in feedback
    // const response = await octokit.request(
    // 	'GET /repos/SchoolOfCode/recap_week_10-FreshtaEbrahim/pulls/comments',
    // 	{
    // 	  per_page: 100,
    // 	}
    //   );

    //This is to access overall pull req comment
    // const response = await octokit.request(
    // 	'GET /repos/SchoolOfCode/recap_week_10-FreshtaEbrahim/pulls/1/reviews',
    // 	{
    // 	  per_page: 100,
    // 	}
    //   );

    /* 	const response = await octokit.request('GET /orgs/{org}/members', {
	const initialState = {
		bootcamperName: session.name,
		masteryFeedbackData: [...sortMasteryData(session.name, session)],
		selectedData: {},
	};
	const [state, dispatch] = useReducer(useGraphSelect, initialState);

	// console.log(session);
	const allRepos = session.githubData
	const masteryRepos = allRepos.filter((repo) => {
		return repo.name.toLowerCase().includes("mastery")
	})
	console.log({masteryRepos})

	return (
		<>
			<AppHeader session={session} />
			<div className={styles.container}>
				<h1 className={styles.title}>{session.name}'s Mastery Task Score</h1>
				<div className={styles.graph}>
					<ScoreGraph
						feedbackData={state.masteryFeedbackData}
						bootcamperName={state.bootcamperName}
						taskType={'Mastery'}
						setSelectedData={(object) =>
							dispatch({
								type: 'week selected',
								payload: object,
							})
						}
					/>
					<br></br>
				</div>
				<div className={styles.table}>
					<FeedbackTable selectedData={state.selectedData} />
				</div>
				<br></br>
				<br></br>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	async function fetchFeedbackData(url, uid, token) {
		const res = await fetch(`${url}feedback?uid=${uid}&type=mastery`, {
			headers: { authorization: `Bearer ${token}` },
		}); // mastery task score
		const { data } = await res.json();
		return data;
	}

	async function getMasteryTasks(githubToken) {
		const octokit = new Octokit({
			auth: `token ${githubToken}`,
		});

		let i = 1;
		let response;
		do {
		const nextPage = await octokit.request('GET /user/repos', {
			per_page: 100, 
			page: i,
		});
		response = [...response, nextPage]
		i++
		} while (nextPage !== [] || i < 6)

		// const masteryRepos = await response.map((repo) => {
		// 	if (repo.name.toLowerCase().includes("mastery")){
		// 		return repo.name
		// 	}
		// })

		// console.log({masteryRepos})

		//get all SoC repos for user
		//search repos for mastery in title
		//fetch all of these repos by name
		//filter info we want


		/* 	const response = await octokit.request('GET /orgs/{org}/members', {
			org: 'SchoolOfCode',
			per_page: 100,
		}); */

    /* 	const response = await octokit.request(
			'GET /repos/{owner}/{repo}/comments',
			{
				owner: '"SchoolOfCode"',
				repo: 'add name of the repo',
			}
		); */

    const { data } = response;
    return data;
  }

  return serverSideProps(context, fetchFeedbackData, getMasteryTasks);
}

//function to get the feedback from the backend, may need some refactoring to have consistancy with variable names

// --------------------->OLD CODE <-------------------------------
/* import React, { useReducer } from "react";
import AppHeader from "../../components/AppHeader";
import serverSideProps from "../../libs/functions/serverSideProps";
import ScoreGraph from "../../components/ScoreGraph";
import FeedbackTable from "../../components/bootcamper/FeedbackTable";
import styles from "./masterytasks.module.css";
import useGraphSelect from "../../libs/customHooks/useGraphSelect";
import { sortMasteryData } from "../../libs/functions/sortFeedbackData";

export default function MasteryTasks({ session }) {
  const initialState = {
    bootcamperName: session.name,
    masteryFeedbackData: [...sortMasteryData(session.name, session)],
    selectedData: {},
  };
  const [state, dispatch] = useReducer(useGraphSelect, initialState);
  return (
    <>
      <AppHeader session={session} />
      <div className={styles.container}>
        <h1 className={styles.title}>{session.name}'s Mastery Task Score</h1>
        <div className={styles.graph}>
          <ScoreGraph
            feedbackData={state.masteryFeedbackData}
            bootcamperName={state.bootcamperName}
            taskType={"Mastery"}
            setSelectedData={(object) =>
              dispatch({
                type: "week selected",
                payload: object,
              })
            }
          />
          <br></br>
        </div>
        <div className={styles.table}>
          <FeedbackTable selectedData={state.selectedData} />
        </div>
        <br></br>
        <br></br>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  async function fetchFeedbackData(url, uid, token) {
    const res = await fetch(`${url}feedback?uid=${uid}&type=mastery`, {
      headers: { authorization: `Bearer ${token}` },
    }); // mastery task score
    const { data } = await res.json();
    return data;
  }
  return serverSideProps(context, fetchFeedbackData);
}

//function to get the feedback from the backend, may need some refactoring to have consistancy with variable names
 */
