import { InMemoryGitHubRepositoryRepository } from "../../infrastructure/InMemoryGitHubRepositoryRepository";
import { ReactComponent as Brand } from "./assets/brand.svg";
import { ReactComponent as Check } from "./assets/check.svg";
import { ReactComponent as Error } from "./assets/error.svg";
import { ReactComponent as PullRequests } from "./assets/git-pull-request.svg";
import { ReactComponent as IssueOpened } from "./assets/issue-opened.svg";
import { ReactComponent as Lock } from "./assets/lock.svg";
import { ReactComponent as Forks } from "./assets/repo-forked.svg";
import { ReactComponent as Start } from "./assets/star.svg";
import { ReactComponent as Unlock } from "./assets/unlock.svg";
import { ReactComponent as Watchers } from "./assets/watchers.svg";
import styles from "./Dashboard.module.scss";

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

export function Dashboard() {
	const repository = new InMemoryGitHubRepositoryRepository();

	const repositories = repository.search();

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			<section className={styles.container}>
				{repositories.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.organization.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
								{widget.CiStatus.workflow_runs.length > 0 && (
									<div>
										{widget.CiStatus.workflow_runs[0].status === "completed" ? (
											<Check />
										) : (
											<Error />
										)}
									</div>
								)}
							</div>
							<p className={styles.widget__description}>{widget.repositoryData.description}</p>
						</div>
						<footer className={styles.widget__footer}>
							<div className={styles.widget__stat}>
								<Start />
								<span>{widget.repositoryData.stargazers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Watchers />
								<span>{widget.repositoryData.watchers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Forks />
								<span>{widget.repositoryData.forks_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<IssueOpened />
								<span>{widget.repositoryData.open_issues_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<PullRequests />
								<span>{widget.pullRequest.length}</span>
							</div>
						</footer>
					</article>
				))}
			</section>
		</>
	);
}