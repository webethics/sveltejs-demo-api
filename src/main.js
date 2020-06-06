import App from './App.svelte';
import axios from "axios";

window.axios = axios
axios.defaults.baseURL = 'http://localhost:8083/api/';

const app = new App({
	target: document.body,
});

export default app;
