<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
</script>


<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <div class="container">
        <header class="p-3 text-bg-dark">
          <div class="row">
            <div class="col-10"><img src="backup.png" /></div>

            <div class="col-2 align-items-end justify-content-end">
              <h5>Hello {{ user.username }}!</h5>
              <button class="btn btn-link" @click="signOut">Sign Out</button>
            </div>
          </div>
        </header>
        <div class="row">
          <div class="col-4">
            <form id="categories" class="row g-3">
              <h3>Create a Category</h3>
              <label for="category-name" class="col-form-label"
                >Enter Category</label
              >
              <input
                type="text"
                v-model="category.name"
                placeholder="Category Name"
                id="category-name"
                class="form-control"
              />
              <input
                type="button"
                value="Create Category"
                @click="createNewCategory(this.category)"
                class="form-control btn btn-primary"
              />
              <hr />
            </form>
            <form id="items" class="row g-3">
              <h3>Add items</h3>
              <label for="category" class="col-form-label"
                >Select Category</label
              >
              <select
                v-model="item.categoryItemsId"
                id="category"
                class="form-control"
              >
                <option disabled value="">Choose a category</option>
                <option
                  v-for="category in categories"
                  :value="category.id"
                  v-bind:key="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
              <label for="item-name">Item Name</label>
              <input
                type="text"
                v-model="item.name"
                placeholder="Name"
                id="item-name"
                class="form-control"
              />
              <input
                type="button"
                value="Add Item"
                @click="createNewItem(this.item)"
                class="form-control btn btn-primary"
              />
            </form>
          </div>
          <div class="col-1"></div>
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

<style scoped>
li {
  margin-left: 5%;
}
header {
  margin-bottom: 3%;
}
h3 form {
  margin-top: 3%;
}
hr {
  color: #ffffff;
}
img {
  width: 100px;
  height: 100px;
}
</style>