import React, {useEffect, useState} from 'react';
import './Nav.scss'
import {useSelector} from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import {useDebouncedCallback} from '../../Hooks/useDebouncedCallback';
import CreateButton from '../Common/CreateButton/CreateButton';

const Nav = (props) => {
	const notesList = useSelector((state) => state.main.notes)

	const notesFilter = (filterValue) => {
		let search = filterValue.split(' ').filter((el) => {
			return el !== ''
		})
		if (search.length === 0) {
			search = ['']
		}
		setNotes(notesList.filter(note => {
			let hashArray = [...note.hashTags.mutable, ...note.hashTags.immutable]
			return search.every((search) => {
				return hashArray.some((hash) => {
					return hash.toLowerCase().includes(search.toLowerCase())
				})
			})
		}))
	}


	const [notes, setNotes] = useState(notesList)
	const [searchValue, setSearchValue] = useState('')

	const debouncedSearch = useDebouncedCallback(notesFilter, 500)

	useEffect(() => {
		setNotes(notesList)
	}, [notesList])


	const onSearchValueChange = (e) => {
		const newValue = e.target.value
		debouncedSearch(newValue)
		setSearchValue(newValue)
	}

	return (
		<>
			<nav className={'navigation'}>
				<input onChange={e => onSearchValueChange(e)} type="text" value={searchValue}/>
				<CreateButton className={'navigation_button'}/>
			</nav>
			<Sidebar potentialError={props.potentialError} notes={notes}/>
		</>

	)
}

export default Nav