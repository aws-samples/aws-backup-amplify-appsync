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
            <div class="mb-2">
              <h3>Create a Category</h3>
              <label for="category-name">Enter Category</label>
              <input
                type="text"
                v-model="category.name"
                placeholder="Category Name"
                id="category-name"
              />
            </div>
            <div class="mb-2">
              <input
                type="button"
                value="Create Category"
                @click="createNewCategory(this.category)"
              />
              <hr />
            </div>
            <div class="mb-2">
              <h3>Add items</h3>
              <label for="category">Select Category</label>
              <select v-model="item.categoryItemsId" id="category">
                <option disabled value="">Choose a category</option>
                <option
                  v-for="category in categories"
                  :value="category.id"
                  v-bind:key="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="mb-2">
              <label for="item-name">Item Name</label>

              <input
                type="text"
                v-model="item.name"
                placeholder="Name"
                id="item-name"
              />
            </div>
            <div class="mb-2">
              <input
                type="button"
                value="Add Item"
                @click="createNewItem(this.item)"
              />
            </div>
          </div>

          <!-- right side -->
          <div class="col">
            <div
              class="row"
              v-for="category in this.categories"
              v-bind:key="category.id"
            >
              <div class="row">
                <h3>{{ category.name }}</h3>
                <ul v-for="item in category.items.items" v-bind:key="item.id">
                  <li>{{ item.name }}</li>
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
import { createCategory, createItem } from "./graphql/mutations";
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
      this.categories = categories.data.listCategories.items;
    },
    async createNewCategory(category) {
      await API.graphql({
        query: createCategory,
        variables: { input: category },
      });
      this.loadCategories(); // shortcut, should use subscriptions
      this.category = {};
    },
    async createNewItem(item) {
      const newItem = await API.graphql({
        query: createItem,
        variables: { input: item },
      });
      const category = this.categories.find(
        (i) => i.id === item.categoryItemsId
      );
      category.items.items.push(newItem.data.createItem);
      this.item = {};
    },
  },
};
</script>
