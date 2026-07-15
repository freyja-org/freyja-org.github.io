export interface Publication {
	title: string;
	authors: string;
	venue: string;
	year: number;
	url: string;
}

export const publications: Publication[] = [
	{
		title: 'Wastewater sequencing reveals early cryptic SARS-CoV-2 variant transmission',
		authors: 'Karthikeyan S, Levy JI, De Hoff P, et al.',
		venue: 'Nature',
		year: 2022,
		url: 'https://www.nature.com/articles/s41586-022-05049-6',
	},
	{
		title: 'Real-time, multi-pathogen wastewater genomic surveillance with Freyja 2',
		authors: 'Levy JI, Gangavarapu P, Pilz DA, et al.',
		venue: 'medRxiv (preprint)',
		year: 2025,
		url: 'https://www.medrxiv.org/content/10.1101/2025.07.26.25332245v1',
	},
];
