export interface DiscussionSummary {
	title: string;
	url: string;
	updatedAt: string;
	commentCount: number;
	categoryName: string;
}

export const CATEGORY_META: Record<string, { color: string; emoji: string }> = {
	Announcements: { color: '#3b82f6', emoji: '📣' },
	General: { color: '#6b7280', emoji: '💬' },
	Ideas: { color: '#a855f7', emoji: '💡' },
	Polls: { color: '#14b8a6', emoji: '🗳️' },
	'Q&A': { color: '#22c55e', emoji: '🙏' },
	'Show and tell': { color: '#f97316', emoji: '🙌' },
};

const QUERY = `
	query RecentDiscussions($owner: String!, $repo: String!, $limit: Int!) {
		repository(owner: $owner, name: $repo) {
			discussions(first: $limit, orderBy: { field: UPDATED_AT, direction: DESC }) {
				nodes {
					title
					url
					updatedAt
					comments { totalCount }
					category { name }
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
		}));
	} catch {
		return [];
	}
}

const RELATIVE_TIME_DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
	{ amount: 60, unit: 'seconds' },
	{ amount: 60, unit: 'minutes' },
	{ amount: 24, unit: 'hours' },
	{ amount: 7, unit: 'days' },
	{ amount: 4.34524, unit: 'weeks' },
	{ amount: 12, unit: 'months' },
	{ amount: Infinity, unit: 'years' },
];

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function formatRelativeTime(iso: string): string {
	let duration = (new Date(iso).getTime() - Date.now()) / 1000;

	for (const division of RELATIVE_TIME_DIVISIONS) {
		if (Math.abs(duration) < division.amount) {
			return relativeTimeFormatter.format(Math.round(duration), division.unit);
		}
		duration /= division.amount;
	}

	return relativeTimeFormatter.format(Math.round(duration), 'years');
}
