export interface DevDashConfig {
	github_access_token?: string;
	widgets: {
		id: string;
		repository_url: string;
	}[];
}

export const config: DevDashConfig = {
	github_access_token: process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN as string,
	widgets: [
		{
			id: "",
			repository_url: "https://github.com/CodelyTV/dotly",
		},
		{
			id: "",
			repository_url: "https://github.com/CodelyTV/eslint-plugin-hexagonal-architecture",
		},
		{
			id: "",
			repository_url: "https://github.com/CodelyTV/refactoring-code-smells",
		},
	],
};
