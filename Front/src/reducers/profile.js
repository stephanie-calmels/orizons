import members from 'src/data/members';


const initialState = {
  profileInfos: members[0],
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    
    default:
      return oldState;
  }
};

export default reducer;
