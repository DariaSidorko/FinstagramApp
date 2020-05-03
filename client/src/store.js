import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'


const devTools = process.env.NODE_ENV === 'development' 
? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null

/* eslint-enable no-underscore-dangle */


const middleware = [thunk];
const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(...middleware), 
    devTools
    )
);

export default store;



/* const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(...middleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
); */