import React from 'react';
import './Error.scss'
import {useNavigate} from 'react-router-dom';

const ErrorComponent = () => {
	const navigate = useNavigate()
	return <div className='error'>
		<div className={'logo'}>404</div>
		<h1> Not Found </h1>
		<span>Unfortunately the page you are looking for does not exist</span>
		<button onClick={()=>{
			navigate('/')
		}} className={'styledButton'}>To home page</button>
	</div>
}

export default ErrorComponent
