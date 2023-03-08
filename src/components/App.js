import { Component } from 'react';
import { nanoid } from 'nanoid';

import AddContacts from './addContact/AddContact';
import Contacts from './contacts/Contacts';
import Filter from './filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      const data = localStorage.getItem('contacts');

      this.setState({ contacts: JSON.parse(data) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onFilter = e => {
    this.setState({ filter: e.target.value });
    this.setFilteredArr();
  };

  setFilteredArr = () => {
    if (this.state.filter.length > 0) {
      const newArr = this.state.contacts.filter(item =>
        item.name.toLowerCase().includes(this.state.filter.toLowerCase())
      );

      return newArr;
    }
  };

  addItem = (name, number) => {
    const newItem = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(({ contacts }) => {
      const newArr = [...contacts, newItem];
      return {
        contacts: newArr,
      };
    });
  };

  deleteItem = e => {
    if (e.target.dataset.id) {
      const { contacts } = this.state;

      contacts.forEach(item => {
        if (item.id === e.target.dataset.id) {
          const index = contacts.indexOf(item);
          const newArr = [...contacts];
          newArr.splice(index, 1);

          this.setState({ contacts: newArr });
        }
      });
    }
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div style={{ marginLeft: '20px' }}>
        <h2>Phonebook</h2>
        <AddContacts addItem={this.addItem} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter onFilter={this.onFilter} filter={filter} />
        <Contacts
          contacts={contacts}
          setFilteredArr={this.setFilteredArr}
          onDelete={this.deleteItem}
        />
      </div>
    );
  }
}
