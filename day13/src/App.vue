<template>
  <div id="app">
    <h1 class="text-center">Todo App</h1>
    <form @submit.prevent="addTodo()">
      <div class="form-group">
        <label for="newTodo">Email address</label>
        <input v-model="newTodo" type="text" class="form-control" id="newTodo" aria-describedby="newTodoHelp" placeholder="Walk thr dog...">
        <small id="newTodoHelp" class="form-text text-muted">Ener a new todo.</small>
      </div>
      <button type="submit" class="btn btn-primary">Add Todo</button>
    </form>
    <ul class="list-group mt-3">
      <li v-for="(todo, i) in todos" :key="todo.id" class="list-group-item">
        <button @click="markDone(todo)" v-if="!todo.done" type="button" class="btn btn-primary">Done</button>
        <button @click="remove(i)" type="button" class="btn btn-danger">Delete</button>
        <span :class="{
          isDone: todo.done
          }">{{todo.title}}</span>
        </li>
    </ul>
  </div>
</template>

<script>
import { METHODS } from 'http'
export default {
  name: 'app',
  data () {
    return {
      newTodo: '',
      todos: []
    }
  },
  watch: {
    todos: {
      handler() {
        localStorage.todos = JSON.stringify(this.todos);
      },
      deep: true
    }
  },
  mounted() {
    if(localStorage.todos) {
      this.todos = JSON.parse(localStorage.todos);
    }
  },
  methods: {
    addTodo() {
      this.todos.push({
        title: this.newTodo,
        done: false
        });
      this.newTodo = '';
    },
    markDone(todo) {
      todo.done = true;
    },
    remove(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>

<style>
.isDone {
  text-decoration: line-through;
}
</style>
