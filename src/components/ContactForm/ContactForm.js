import css from './ContactForm.module.css';
import { PureComponent } from 'react';

export default class ContactForm extends PureComponent {
  state = {
    name: '',
    number: '',
  };

  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState(() => {
      return { [name]: value };
    });
  };

  onSubmit = e => {
    this.setState({
      name: '',
      number: '',
    });

    this.props.onAddContact({ ...this.state, e });
  };

  render() {
    const { name, number } = this.state;
    const { onInputChange, onSubmit } = this;

    return (
      <form className={css.form} onSubmit={onSubmit}>
        <label className={css.label}>
          <span className={css.title}>Name</span>
          <input
            className={css.input}
            type="text"
            name="name"
            value={name}
            required
            onChange={onInputChange}
          />
        </label>

        <label className={css.label}>
          <span className={css.title}>Phone number</span>
          <input
            className={css.input}
            type="tel"
            name="number"
            value={number}
            required
            onChange={onInputChange}
          />
        </label>

        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
