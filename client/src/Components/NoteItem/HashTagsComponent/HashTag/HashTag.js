import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteHashTags} from '../../../../Store/MainReducer';

const HashTag = (props) => {
	const {body, className, id} = props
	const dispatch = useDispatch()

	const ableToDelete = className === 'mutable'

	function onClick() {
		dispatch(deleteHashTags({id, body}))
	}

	return body.length ? <span className={className + ' hashTag'}>
		{body}
		{ableToDelete && <button onClick={onClick}>x</button>}
	</span> : <></>
}

export default HashTag
