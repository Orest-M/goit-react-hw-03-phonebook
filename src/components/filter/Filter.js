import PropTypes from 'prop-types';

const Filter = ({ filter, onFilter }) => {
  return <input type="text" value={filter} onChange={onFilter} />;
};

Filter.propTypes = {
  filter: PropTypes.string,
  onFilter: PropTypes.func,
};

export default Filter;
