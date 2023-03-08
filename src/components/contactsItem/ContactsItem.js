import PropTypes from 'prop-types';

import css from './contactsItem.module.css';

const ContactsItem = ({ name, number, id }) => {
  return (
    <li className={css['contacts-item']}>
      <p>
        {name}: {number}
      </p>
      <button type="button" data-id={id} className={css['contacts-item__btn']}>
        delete
      </button>
    </li>
  );
};

ContactsItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  id: PropTypes.string,
};

export default ContactsItem;
