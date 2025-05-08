import type { AuthModel } from 'pocketbase';


declare global {
	namespace App {
		interface Locals {
			pb: Pocketbase;
			user: AuthModel | undefined;
		}
	}

	interface Window {
		chrome?: typeof chrome;
		affonso_referral?: string;
		Affonso: {
			signup: (email: string) => void;
		};
		twq: (command: string, eventId: string, params?: object) => void;
		gtag: (command: string, eventId: string, params?: object) => void;
		dataLayer: {
			push: (event: object) => void;
		};
	}

	interface Chrome {
		runtime: {
			sendMessage: (message: string, data: any) => Promise<any>;
		};
	}
}

export {};
