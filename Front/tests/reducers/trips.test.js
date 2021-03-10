import { expect } from 'chai';

import tripsReducer, { initialState } from 'src/reducers/trips';

describe('reducer for trips', () => {
  describe('structure', () => {
    it('is a function', () => {
      expect(tripsReducer).to.be.a('function');
    });

    it('check initial state', () => {
      expect(initialState).to.be.an('object');

      expect(tripsReducer()).to.be.eql(initialState);
    });
  });

  describe('actions redux', () => {
    it('should return a modified state when receiving CHANGE_SEARCH_FIELD action', () => {
      const newSearch = 'randonnée';
      const action = { type: 'CHANGE_SEARCH_FIELD', value: newSearch};
      const modifiedState = tripsReducer(initialState, action);
      expect(modifiedState).to.be.eql({...initialState, search: newSearch});
    });
  });
});
