import React from 'react';
import './SuggestComponent.css'
import CreateButton from '../Common/CreateButton/CreateButton';

const SuggestComponent = () => {
	return <div className={'suggest'}>
		<span>
			Would you like to create new note?
		</span>
		<CreateButton className={'suggest_button'} buttonName={'Create new note'}/>
	</div>
}

export default SuggestComponent