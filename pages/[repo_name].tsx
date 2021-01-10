import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css"

interface GitHubRepo {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
}

interface Props {
  repo: GitHubRepo;
}

const Repo: NextPage<Props> = ({ repo }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Repo: {repo.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/">ShinyaKato's GitHub repos</Link>
        </h1>

        <div>
          <h3>{repo.name}</h3>
          {repo.description ? <p>{repo.description}</p> : null}
          <a href={repo.html_url} target="_blank">Link to GitHub</a>
        </div>
      </main>
    </div>
  );
}

Repo.getInitialProps = async (context) => {
  console.log("Repo: getInitialProps");

  const repoName = context.query["repo_name"];

  const response = await fetch(`https://api.github.com/repos/ShinyaKato/${repoName}`);
  const repo: GitHubRepo = await response.json();

  return { repo: repo };
}

export default Repo;
