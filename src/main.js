// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. 
// SPDX-License-Identifier: Apache-2.0 

import { createApp } from 'vue'
import App from './App.vue'
import AmplifyVue from '@aws-amplify/ui-vue';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


Amplify.configure(awsExports);
const app = createApp(App);
app.use(AmplifyVue);
app.mount("#app")


