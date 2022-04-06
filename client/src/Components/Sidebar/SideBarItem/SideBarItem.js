import React from 'react';
import './SideBarItem.scss'
import {useDispatch} from 'react-redux';
import {deleteNote} from '../../../Store/MainReducer';
import {NavLink, useNavigate} from 'react-router-dom';

const SideBarItem = ({name, id}) => {
	const navigate = useNavigate()

	const dispatch = useDispatch()

	const deleteElement = (payload) =>{
		dispatch(deleteNote(payload))
		navigate('/')
	}

	return <div className={'SideBarItem_wrapper'}>
		<NavLink to={`/${id}`} className={'SideBarItem'}>
			{name}
		</NavLink>
		<button onClick={()=>deleteElement(id)}> X </button>
	</div>
}

export default SideBarItem