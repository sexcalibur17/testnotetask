import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addHashTags} from '../../../../Store/MainReducer';
import './Modal.scss'

const Modal = ({setVisibility, hashTags, id}) => {

	useEffect(()=>{
		return () => {window.ondblclick = null}
	},[])

	window.ondblclick = (e) => {
		const modalVisible = e.target.parentElement.classList.value === 'modal'
			|| e.target.classList.value === 'modal'
		if(!modalVisible){
			setVisibility(false)
		}
	}

	const [error, setError] = useState('')
	const [value, setValue] = useState('')

	const onChange = (e) => {
		setValue(e.target.value)
	}

	const dispatch = useDispatch()

	function onClick(e) {
		e.preventDefault()
		if (value.trim()) {
			let body = value
			if(!value.includes('#')){
				body = '#' + value
			}
			if(value.includes(' ')){
				setError(`hashtag can't include spaces, instead of it you can use '_'`)
				setTimeout(()=>{
					setError('')
				}, 3000)
				return
			}
			if (hashTags.mutable.indexOf(body) >= 0) {
				setError('you already have this hashtag')
				setTimeout(()=>{
					setError('')
				}, 3000)
			}
			else {
				dispatch(addHashTags({body, id}))
				setVisibility(false)
			}
		} else {
			setError('cannot add empty hashtag')
			setTimeout(()=>{
				setError('')
			}, 3000)
		}
	}

	return <form className={'modal'}>
		<span>Add #hashtag</span>
		<input autoFocus={true} type="text" value={value} onChange={onChange}/>
		<button onClick={onClick}>
			Save
		</button>
		{error && <p className={'error'}>{error}</p>}
		<button className={'closeBtn'} onClick={(e)=> {
			e.preventDefault()
			setVisibility(false)
		}}>X</button>
	</form>
}

export default Modal