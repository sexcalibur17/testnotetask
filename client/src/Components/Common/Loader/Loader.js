import React from 'react';
import svg from '../../../assets/img/loader.svg'
import './Loader.scss'

const Loader = () => {
	return <div className={'loader'}>
		<img src={svg} alt="image_loader"/>
	</div>
}

export default Loader