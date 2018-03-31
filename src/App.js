import React, { Component } from 'react';
import { Layout, Input, Button, List, Icon } from 'antd';

import firestore from './firestore';

import './App.css';

const { Header, Footer, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addingTodo: false,
      pendingTodo: ''
    };

    this.addTodo = this.addTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);

    firestore.collection('todos').onSnapshot(snapshot => {
      let todos = [];
      snapshot.forEach(doc => {
        const todo = doc.data();
        todo.id = doc.id;
        if (!todo.completed) todos.push(todo);
      });

      todos.sort(function (a, b) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      this.setState((prevState, nextState) => ({
        todos
      }));
    });
  }

  async completeTodo(id) {
    await firestore
      .collection('todos')
      .doc(id)
      .set({
        completed: true
      });
  }

  async addTodo(evt) {
    if (!this.state.pendingTodo) return;

    this.setState((prevState, nextState) => ({
      addingTodo: true,
    }));

    await firestore.collection('todos').add({
      content: this.state.pendingTodo,
      completed: false,
    });

    this.setState((prevState, nextState) => ({
      addingTodo: false,
      pendingTodo: ''
    }));
  }

  render() {
    return (
      <Layout className="App">
        <Header className="App-header">
          <h1>Quick Todo</h1>
        </Header>
        <Content className="App-content">
          <Input
            ref='add-todo-input'
            className='App-add-todo-input'
            size='large'
            placeholder='What needs to be done?'
            disabled={this.state.addingTodo}
            onChange={evt => this.setState({ pendingTodo: evt.target.value })}
            value={this.state.pendingTodo}
            onPressEnter={this.addTodo}
          />
          <Button
            className='App-add-todo-button'
            size='large'
            type='primary'
            onClick={this.addTodo}
            loading={this.state.addingTodo}
          >
            Add Todo
        </Button>
          <List
            className='App-todos'
            size='large'
            bordered
            dataSource={this.state.todos}
            renderItem={todo => (
              <List.Item>
                {todo.content}
                <Icon
                  onClick={evt => this.completeTodo(todo.id)}
                  className='App-todo-complete'
                  type='check'
                />
              </List.Item>
            )}
          />
        </Content>
        <Footer className="App-footer">&copy; Your Man In Zen</Footer>
      </Layout>
    );
  }
}

export default App;
