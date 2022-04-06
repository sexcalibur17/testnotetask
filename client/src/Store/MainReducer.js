import API from '../API/API'

const ADD_NOTE = 'ADD_NOTE'
const DELETE_NOTE = 'DELETE_NOTE'
const EDIT_NOTE = 'EDIT_NOTE'
const SET_NOTES = 'SET_NOTES'
const ADD_HASHTAGS = 'ADD_HASHTAGS'
const DELETE_HASHTAGS = 'DELETE_HASHTAGS'
const SET_ERROR = 'SET_ERROR'


const initialState = {
	notes: [],
	errorNote: [{name: 'error', id: 1, body: '', hashTags: '', html: '', hasError: true}],
	isInit: false,
}


export const MainReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_NOTE:
			const newNote = {
				name: 'Empty note', id: action.payload, body: '',
				hashTags: {immutable: [''], mutable: []}, html: '',
			}
			return {
				...state,
				notes: [...state.notes, newNote]
			}
		case DELETE_NOTE:
			return {
				...state,
				notes: state.notes.filter((note) => {
					return note.id !== action.payload
				})
			}
		case EDIT_NOTE:
			return {
				...state,
				notes: state.notes.map((note) => {
					if (note.id === action.payload.id) {
						let newBodyHTML = action.payload.body
						const index = action.payload.body.indexOf('\n')
						let newTitle
						if (index < 0) {
							newTitle = action.payload.body
						} else {
							newTitle = action.payload.body.substring(0, index)
							if (newTitle.trim().length === 0) {
								newTitle = 'No title'
							}
						}
						let newBodyHashTags = [...new Set(newBodyHTML.match(/#\S+/g))]
						if (!newBodyHashTags.length) {
							newBodyHashTags = ['']
						}
						return {
							...note,
							name: action.payload.body.trim().length > 1 ? newTitle : 'Empty note',
							body: action.payload.body,
							hashTags: {
								...note.hashTags,
								immutable: newBodyHashTags
							},
							html: action.payload.html,
						}
					}
					return note
				})
			}
		case ADD_HASHTAGS:
			return {
				...state,
				notes: state.notes.map((note) => {
					if (note.id === action.payload.id) {
						const notesSet = [...new Set([action.payload.body, ...note.hashTags.mutable])]
						return {
							...note,
							hashTags: {
								...note.hashTags,
								mutable: notesSet
							},
						}
					}
					return note
				})
			}
		case DELETE_HASHTAGS:
			return {
				...state,
				notes: state.notes.map(note => {
					if (note.id === action.payload.id) {
						return {
							...note,
							hashTags: {
								...note.hashTags,
								mutable: note.hashTags.mutable.filter(el => el !== action.payload.body)
							}
						}
					}
					return note
				})
			}
		case SET_NOTES:
			return {
				...state,
				notes: action.payload,
				isInit: true
			}
		case SET_ERROR:
			return {
				...state,
				errorNote: [...state.errorNote, action.payload]
			}
		default:
			return state
	}
}

export const deleteNote = (payload) => ({type: DELETE_NOTE, payload})
export const addNote = (payload) => ({type: ADD_NOTE, payload})
export const editNote = (payload) => ({type: EDIT_NOTE, payload})
export const addHashTags = (payload) => ({type: ADD_HASHTAGS, payload})
export const deleteHashTags = (payload) => ({type: DELETE_HASHTAGS, payload})
const setNotes = (payload) => ({type: SET_NOTES, payload})
const setError = (payload) => ({type:SET_ERROR, payload})


export const fetchNotes = () => {
	return async (dispatch) => {
		let result
		try {
			result = await API.getNotes()
			result = result.data
		} catch (e) {
			result = []
			let myError =  {
				name: 'error', id: 2, body: '', hashTags: {
					mutable: [''], immutable: ['']
				}, html: '', mode: 'offline'
			}
			dispatch(setError(myError))
		} finally {
			dispatch(setNotes(result))
		}
	}
}


export const sendNotes = async (payload) => {
	try {
		await API.setNotes(payload)
	} catch (e) {
	}
}


