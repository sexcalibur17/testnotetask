import React, {useEffect, useState} from 'react';
import Nav from '../Nav/Nav';
import NoteItem from '../NoteItem/NoteItem';
import './App.css'
import {Route, Routes} from 'react-router-dom';
import {fetchNotes} from '../../Store/MainReducer';
import {useDispatch, useSelector} from 'react-redux';
import SuggestComponent from '../SuggestComponent/SuggestComponent';
import Loader from '../Common/Loader/Loader';
import ModalError from '../Common/ModalError/ModalError';


const App = () => {

	const dispatch = useDispatch()
	const isInit = useSelector(state => state.main.isInit)
	const potentialError = useSelector(state => state.main.errorNote)
	const [myError, setError] = useState('')
	const [modalVisible, setVisibility] = useState(false)

	useEffect(() => {
		dispatch(fetchNotes())
	}, [dispatch])

	useEffect(() => {
		if (potentialError.length > 1) {
			setVisibility(true)
			setError(potentialError[1].mode)
		}
	}, [potentialError])


	return isInit ? <div className="App">
			{modalVisible && <ModalError setVisibility={setVisibility}/>}
			<div className={'gridWrap'}>
				<Nav potentialError={myError}/>
				<Routes>
					<Route path={'/:noteId'} element={<NoteItem/>}/>
					<Route path={'*'} element={<SuggestComponent/>}/>
				</Routes>
			</div>
		</div>
		: <Loader/>
}

export default App;
