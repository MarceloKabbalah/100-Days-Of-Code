<template>
  <div id="app">
    <div class="container grid-xs py-2">
      <img class="img-responsive img-logo" src="@/assets/logo.png" alt="Logomarca" />
      <form @submit.prevent="addTodo(todo)">
        <div class="input-group">
          <input type="text" v-model="todo.description" class="form-input" placeholder="New todo" />
          <button class="btn btn-primary input-group-btn">Add</button>
        </div>
      </form>
      <div class="todo-list">
        <todo v-for="t in todos" :key="t.id" @toggle="toggleTodo" @delete="deleteTodo" :todo="t" />
      </div>
    </div>
  </div>
</template>

<script>
import Todo from './components/Todo';

export default {
  name: "app",
  components: {
    Todo
  },
  data() {
    return { todos: [], todo: { checked: false } };
  },
  methods: {
    addTodo(todo) {
      todo.id = Date.now();
      this.todos.push(todo);
      this.todo = { checked: false };
    },
    toggleTodo(todo) {
      const index = this.todos.findIndex(item => item.id === todo.id);
      if (index > -1) {
        const checked = !this.todos[index].checked;
        this.$set(this.todos, index, { ...this.todos[index], checked})
      }
    },
    deleteTodo(todo) {
      const index = this.todos.findIndex(item => item.id === todo.id);
      if (index > -1) {
        this.$delete(this.todos, index);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.img-logo {
  max-width: 100px;
  margin: 0 auto;
}

.todo-list {
  padding-top: 2rem;
}
</style>
