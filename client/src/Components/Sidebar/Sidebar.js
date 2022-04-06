import React, {useEffect} from 'react';
import './Sidebar.scss'
import SideBarItem from './SideBarItem/SideBarItem';
import {sendNotes} from '../../Store/MainReducer';
import {useSelector} from 'react-redux';

const Sidebar = (props) => {

	const {notes} = props
	const potentialError = props.potentialError
	const globalNotes = useSelector(state => state.main.notes)
	const init = useSelector(state => state.main.isInit)

	useEffect(() => {
		if (init === true && !potentialError) {
			sendNotes(globalNotes)
		}
	}, [globalNotes, init, potentialError])

	return (
		<aside className={'sideBar'}>
			{notes.map((note) => <SideBarItem key={note.id}
											  name={note.name} id={note.id}/>)}
		</aside>
	)
}
export default Sidebar