import css from './Filter.module.css';

const Filter = ({ label, contacts, value, onSearchContacts }) => {
  return (
    <label className={css.label}>
      <span className={css.title}>{label}</span>

      <input
        className={css.input}
        type="text"
        name="name"
        value={value}
        onChange={onSearchContacts}
      ></input>
    </label>
  );
};

export default Filter;
