import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss"

interface GitHubRepo {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
}

interface Props {
  repos: GitHubRepo[];
}

const Repos: NextPage<Props> = ({ repos }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ShinyaKato's GitHub repos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/">ShinyaKato's GitHub repos</Link>
        </h1>

        <div className={styles.grid}>
          {repos.map(repo => (
            <Link key={repo.id} href={`/${repo.name}`}>
              <a className={styles.card}>
                <h3>{repo.name}</h3>
                {repo.description ? <p>{repo.description}</p> : null}
              </a>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <Pagination />
        </div>
      </main>
    </div>
  );
}

const Pagination = () => {
  const router = useRouter();
  const page = +(router.query["page"] || 1);

  const prev = page - 1;
  const next = page + 1;

  return (
    <ul>
      {prev >= 1 ?
        <li>
          <Link href={prev === 1 ? "/" : `/?page=${prev}`}>Prev</Link>
        </li> :
        null
      }
      <li>
        <Link href={`/?page=${next}`}>Next</Link>
      </li>
    </ul>
  );
}

Repos.getInitialProps = async (context) => {
  console.log("Repos: getInitialProps");

  const page = +(context.query.page || 1);

  const response = await fetch(`https://api.github.com/users/ShinyaKato/repos?per_page=10&page=${page}`);
  const repos: GitHubRepo[] = await response.json();

  return { repos: repos };
}

export default Repos;
