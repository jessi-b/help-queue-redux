import formVisibleReducer from '../../reducers/form-visible-reducer';

describe("formVisibleReducer", () => {

  test('Should return default state if no action type is recognized', (npm run test) => {
    expect(formVisibleReducer(false, { type: null })).toEqual(false);
  });
});