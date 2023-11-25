import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-green/theme.css";

import Button from 'primevue/button';
import Column from 'primevue/column';
import PrimeVue from "primevue/config";
import DataTable from 'primevue/datatable';
import Divider from 'primevue/divider';
import Fieldset from 'primevue/fieldset';
import OrderList from 'primevue/orderlist';
import { createApp } from "vue";
import App from "./App.vue";
import './style.css';

const app = createApp(App);

app.use(PrimeVue, { ripple: true  });

app.component('Button', Button);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Divider', Divider);
app.component('Fieldset', Fieldset);
app.component('OrderList', OrderList);

app.mount("#app");
