export interface Repo {
	name: string;
	description: string;
	url: string;
}

export const repos: Repo[] = [
	{
		name: 'Freyja',
		description: 'Depth-weighted de-mixing of wastewater sequencing data into lineage abundances.',
		url: 'https://github.com/andersen-lab/Freyja',
	},
	{
		name: 'Freyja-nf',
		description: 'Nextflow pipeline for running Freyja on wastewater surveillance data.',
		url: 'https://github.com/andersen-lab/Freyja-nf',
	},
	{
		name: 'Freyja-data',
		description: 'Reference data used by Freyja.',
		url: 'https://github.com/andersen-lab/Freyja-data',
	},
	{
		name: 'Freyja-barcodes',
		description: 'Lineage-defining mutation barcodes used by Freyja.',
		url: 'https://github.com/andersen-lab/Freyja-barcodes',
	},
	{
		name: 'Freyja-SC2',
		description: 'SARS-CoV-2-specific Freyja resources.',
		url: 'https://github.com/andersen-lab/Freyja-SC2',
	},
	{
		name: 'Bygul',
		description: 'Amplicon read simulator.',
		url: 'https://github.com/andersen-lab/Bygul',
	},
	{
		name: 'BarcodeForge',
		description: 'A CLI tool for generating pathogen-specific barcodes for Freyja.',
		url: 'https://github.com/andersen-lab/BarcodeForge',
	},
];
