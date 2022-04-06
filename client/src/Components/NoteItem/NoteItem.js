import React, {useEffect, useRef, useState} from 'react';
import './NoteItem.scss'
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {editNote} from '../../Store/MainReducer';
import ErrorComponent from '../Common/Error/Error';
import {useDebouncedCallback} from '../../Hooks/useDebouncedCallback';
import HashTags from './HashTagsComponent/HashTags';

const NoteItem = () => {
	let {noteId} = useParams()
	noteId = Number(noteId)

	const dispatch = useDispatch()

	let element = useSelector((state) => state.main.notes.find((note) => {
		return note.id === noteId
	}))
	const error = useSelector(state => state.main.errorNote)

	if (element === undefined) {
		element = error[0]
	}

	let {body, hashTags, html} = element

	useEffect(() => {
		setElementBody(body)
		setInnerHTML(html)
	}, [element, body, html])


	const [elementBody, setElementBody] = useState('')
	const [innerHTML, setInnerHTML] = useState('')


	const onBodyChange = (e) => {
		let body = e.target.value
		let html = body.replace(/#\S+/g, '<mark>$&</mark>')
		setElementBody(body)
		setInnerHTML(html)
		debounced(body, html)
	}

	const backdrop = useRef(null)

	const dispatchEditNote = (body, html) => {
		dispatch(editNote({id: noteId, body, html}))
	}

	const debounced = useDebouncedCallback(dispatchEditNote, 500)

	if (element.hasError === true) {
		return <div className={'noteItem'}>
			<ErrorComponent/>
		</div>
	}

	return (
		<div className={'noteItem'}>
			<div className={'noteItem_container'}>
				<div ref={backdrop}
					 className={'noteItem_backdrop'}>
					<div className={'noteItem_highlights'}
						 dangerouslySetInnerHTML={{__html: innerHTML}}>
					</div>
				</div>
				<textarea
					placeholder={'Here you can enter a note, just start typing to get started ;) \nThe first line will be the title of the note \n\nTo create a tag, you can use the panel below or start writing a word with the \'#\' character \n#Example'}
					className={'noteItem_textArea'}
					onScroll={(e) => {
						backdrop.current.scrollTop = e.target.scrollTop
					}}
					onChange={(e) => onBodyChange(e)}
					value={elementBody}
				/>
			</div>
			<HashTags id={noteId} hashTags={hashTags}/>
		</div>

	)
}
export default NoteItem