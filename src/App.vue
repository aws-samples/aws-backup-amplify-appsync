<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
</script>


<template>
  <authenticator>
    <template v-slot="{ user }">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Hello {{ user.username }}!</h1>
          </div>
          <div class="col">
            <br /><button @click="signOut">Sign Out</button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="row">
              <h3>Create a Category</h3>
              <label for="name">Enter Category</label>
            </div>
            <div class="row">
              <input
                type="text"
                v-model="category.name"
                placeholder="Category Name"
                id="name"
              />
            </div>
            <div class="row">
              <input
                type="button"
                value="Create Category"
                @click="createNewCategory(this.category)"
              />
            </div>
          </div>
          <div class="col">
            <div
              class="row"
              v-for="category in this.categories"
              v-bind:key="category.id"
            >
              <div class="row">
                <h3>{{ category.name }}</h3>
                <ul v-for="item in category.items.items" v-bind:key="item.id">
                  <li>{{ item.title }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template></authenticator
  >
</template>

<script>
import { API } from "aws-amplify";
import { createCategory } from "./graphql/mutations";
import { listCategories } from "./graphql/queries";

export default {
  name: "AppVue",
  data() {
    return {
      category: {},
      item: {},
      categories: [],
    };
  },
  async beforeMount() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      const categories = await API.graphql({ query: listCategories });
      console.log(categories);
      this.categories = categories.data.listCategories.items;
    },
    async createNewCategory(category) {
      await API.graphql({
        query: createCategory,
        variables: { input: category },
      });
      this.loadCategories(); // shortcut, should use subscriptions
    },
  },
};
</script>
