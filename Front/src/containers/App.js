import { connect } from 'react-redux';

import App from '../components/App';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  nickname: state.auth.nickname,
  role: state.auth.route,
});

export default connect(mapStateToProps)(App);
