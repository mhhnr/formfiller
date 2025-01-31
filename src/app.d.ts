// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

/// <reference types="@sveltejs/kit" />

declare global {
	interface Window {
		webkitSpeechRecognition: any;
	}
}

export {};
