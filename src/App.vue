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
              <h3>Create a blog category</h3>
              <label for="firstName">Enter Blog Category</label>
            </div>
            <div class="row">
              <input
                type="text"
                v-model="blog.name"
                placeholder="Blog Name"
                id="name"
              />
            </div>
            <div class="row">
              <input
                type="button"
                value="Create Blog"
                @click="createNewBlog(this.blog)"
              />
            </div>
          </div>
          <div class="col">
            <div class="row" v-for="blog in this.blogs" v-bind:key="blog.id">
              <div class="row">
                <h3>{{ blog.name }}</h3>
                <ul v-for="post in blog.posts.items" v-bind:key="post.id">
                  <li>{{ post.title }}</li>
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
import { createBlog } from "./graphql/mutations";
import { listBlogs } from "./graphql/queries";

export default {
  name: "AppVue",
  data() {
    return {
      blog: {},
      post: {},
      blogs: [],
    };
  },
  async beforeMount() {
    this.loadBlogs();
  },
  methods: {
    async loadBlogs() {
      const blogs = await API.graphql({ query: listBlogs });
      console.log(blogs);
      this.blogs = blogs.data.listBlogs.items;
    },
    async createNewBlog(blog) {
      await API.graphql({
        query: createBlog,
        variables: { input: blog },
      });
      this.loadBlogs(); // shortcut, should use subscriptions
    },
  },
};
</script>
