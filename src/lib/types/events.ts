export type EventType = 'Üritus' | 'Koolitus' | 'Reis';

export interface DiveEvent {
	id: string;
	title: string;
	description: string;
	excerpt: string;
	type: EventType;
	startDate: string;
	endDate?: string;
	startTime?: string;
	endTime?: string;
	location: string;
	image: string;
	price?: number;
	maxParticipants?: number;
	currentParticipants?: number;
	registrationDeadline?: string;
	instructor?: string;
	difficulty?: 'Algaja' | 'Keskmine' | 'Edasijõudnud';
	pageSlug?: string;
}

export const EVENT_TYPE_COLORS = {
	'Üritus': {
		bg: 'bg-emerald-100',
		text: 'text-emerald-700',
		border: 'border-emerald-200'
	},
	'Koolitus': {
		bg: 'bg-blue-100',
		text: 'text-blue-700',
		border: 'border-blue-200'
	},
	'Reis': {
		bg: 'bg-purple-100',
		text: 'text-purple-700',
		border: 'border-purple-200'
	}
} as const;

export type ViewMode = 'grid' | 'calendar'; 