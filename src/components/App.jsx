import { PureComponent } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section';
import ContactForm from './ContactForm';
import Contacts from './Contacts';
import Filter from './Filter';

export class App extends PureComponent {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (!contacts) {
      this.setState({ contacts: [] });
      return;
    }
    this.setState({ contacts });
  }
  componentDidUpdate() {
    const contacts = this.state.contacts;
    const stringifiedContacts = JSON.stringify(this.state.contacts);

    if (contacts.length < 1) {
      localStorage.removeItem('contacts');
      return;
    }

    localStorage.setItem('contacts', stringifiedContacts);
  }

  onAddContact = ({ name, number, e }) => {
    e.preventDefault();

    const newContact = this.onCheckContact(name.toLowerCase());

    if (newContact) {
      return alert(`${name} is already in contacts`);
    }

    return this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          { id: nanoid(), name: name, number: number },
        ],
      };
    });
  };

  onCheckContact = value => {
    return this.state.contacts.some(
      ({ name }) => name.toLocaleLowerCase() === value
    );
  };

  onSearchContacts = e => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  onFilterContacts = () => {
    const contacts = this.state.contacts;
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(this.state.filter)
    );
  };

  onRemoveContact = contactId => {
    const newContacts = this.state.contacts.filter(
      ({ id }) => id !== contactId
    );

    this.setState({
      contacts: newContacts,
    });
  };

  render() {
    const {
      onAddContact,
      onSearchContacts,
      onFilterContacts,
      onRemoveContact,
      state: { contacts, filter },
    } = this;

    return (
      <Section>
        <ContactForm onAddContact={onAddContact} />

        {contacts.length > 0 && (
          <Filter
            label="Find contacts by name"
            value={filter}
            onSearchContacts={onSearchContacts}
          />
        )}

        {contacts.length > 0 && (
          <Contacts
            contacts={onFilterContacts()}
            onRemoveContact={onRemoveContact}
          />
        )}
      </Section>
    );
  }
}
