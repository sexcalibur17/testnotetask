import React from 'react';
import './ModalError.scss'
import sorry from '../../../assets/img/sorry.gif'

const ModalError = (props) => {
	const {setVisibility} = props
	const onClickHandler = (e) => {
		if(e.target.classList.value.includes('close')){
			setVisibility(false)
		}
	}
	return <div className={'modal_error_background close'}
				onClick={onClickHandler}>
		<div className={'modal_error'}>
			<span>Error</span>
			<img src={sorry} alt="we are sorry"/>
			<span>Changes will not be saved. Try again later</span>
			<button className={'modal_error_close'}>X</button>
		</div>
	</div>
}
export default ModalError
