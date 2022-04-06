import {applyMiddleware, combineReducers, createStore} from 'redux';
import {MainReducer} from './MainReducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


const Reducers = {
	main: MainReducer
}

const store = createStore(
	combineReducers(Reducers),
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

export default store
