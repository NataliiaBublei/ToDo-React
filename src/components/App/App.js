import React, {Component} from 'react';

import AppHeader from "../App-header";
import SearchPanel from "../Search-panel";
import TodoList from "../Todo-list";
import ItemStatusFilter from "../Item-status-filter";
import ItemAddForm from "../Item-add-form";

import './App.css';

export default class App extends Component {

  maxId = 100;

  state = {
    items: [
      {id: 1, label: 'Drink Coffee', important: false, done: false},
      {id: 2, label: 'Make Awesome App', important: true, done: false},
      {id: 3, label: 'Have a lunch', important: false, done: false}
    ],
    search: '',
    filter: 'all'
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(item => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const newItem = {...oldItem, [propName]: value};
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(state => {
      const items = this.toggleProperty(state.items, id, 'important');
      return {items};
    })
  };

  onToggleDone = (id) => {
    this.setState(state => {
      const items =  this.toggleProperty(state.items, id, 'done');
      return {items};
    })
  };

  onDelete = (id) => {
    this.setState(state => {
      const newItems = state.items.filter(el => el.id !== id);
      return {
        items: newItems
      };
    });
  };

  addItem = (label) => {
    const newItem = {
      label,
      important: false,
      id: ++this.maxId,
      done: false
    };

    this.setState(({items}) => {
      const newArray = [...items, newItem];
      return {
        items: newArray
      };
    });
  };

  onSearchItems(items, term) {
    if (!term) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }

  onFilterItems(items, filter) {
    if (filter === 'all') {
      return items;
    } else if (filter === 'active') {
      return items.filter(item => (!item.done));
    } else if (filter === 'done') {
      return items.filter(item => item.done);
    }
  }

  onSearchChange = (search) => {
    this.setState({search})
  };

  onFilterChange = (filter) => {
    this.setState({filter})
  };

  render() {
    const {items, search, filter} = this.state;
    const doneCount = items.filter(el => el.done).length;
    const todoCount = items.length - doneCount;
    const visibleItems = this.onSearchItems(this.onFilterItems(items, filter), search);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount}/>

        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange}
          />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.onDelete}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};
