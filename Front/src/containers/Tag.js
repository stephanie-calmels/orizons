import { connect } from 'react-redux';

import Tag from 'src/components/Tag';
import { getTripsByCategory } from '../actions/trips';

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: (id) => {
    dispatch(getTripsByCategory(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
