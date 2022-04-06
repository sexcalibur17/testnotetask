import React from 'react';
import {addNote} from '../../../Store/MainReducer';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import createIcon from '../../../assets/img/iconmonstr-edit-6.svg'
import './CreateButton.css'


const CreateButton = (props) =>{
	const className = props.className ? props.className + ' styledButton'
		: 'styledButton'
	const buttonName = props.buttonName ? props.buttonName
		: <img src={createIcon} alt={'create new note'}/>

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const addItem = () => {
		const id = Date.now()
		dispatch(addNote(id))
		navigate(`/${id}`)
	}

	return <button className={className} onClick={addItem}>{buttonName}</button>
}

export default CreateButton