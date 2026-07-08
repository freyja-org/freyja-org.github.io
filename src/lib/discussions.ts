export interface DiscussionSummary {
	title: string;
	url: string;
	updatedAt: string;
	commentCount: number;
	categoryName: string;
	categoryEmoji: string;
}

const QUERY = `
	query RecentDiscussions($owner: String!, $repo: String!, $limit: Int!) {
		repository(owner: $owner, name: $repo) {
			discussions(first: $limit, orderBy: { field: UPDATED_AT, direction: DESC }) {
				nodes {
					title
					url
					updatedAt
					comments { totalCount }
					category { name emoji }
				}
			}
		}
	}
`;

export async function getRecentDiscussions(limit = 8): Promise<DiscussionSummary[]> {
	const token = process.env.GITHUB_TOKEN;
	if (!token) return [];

	try {
		const res = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
				'User-Agent': 'freyja-community-site',
			},
			body: JSON.stringify({
				query: QUERY,
				variables: { owner: 'freyja-org', repo: 'discussion', limit },
			}),
		});

		if (!res.ok) return [];

		const json = await res.json();
		const nodes = json?.data?.repository?.discussions?.nodes ?? [];

		return nodes.map((n: any) => ({
			title: n.title,
			url: n.url,
			updatedAt: n.updatedAt,
			commentCount: n.comments.totalCount,
			categoryName: n.category.name,
			categoryEmoji: n.category.emoji,
		}));
	} catch {
		return [];
	}
}
