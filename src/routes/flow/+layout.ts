import { goto } from '$app/navigation';
import { userStore } from '$lib/stores.svelte';
import { browser } from "$app/environment";

if (browser && !userStore?.id) { goto('/'); }