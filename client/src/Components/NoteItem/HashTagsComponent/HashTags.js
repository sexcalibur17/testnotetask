import React, {useState} from 'react';
import './HashTags.scss'
import HashTag from './HashTag/HashTag';
import Modal from './Modal/Modal';


const HashTags = (props) => {

	const [isVisible, setVisibility] = useState(false)

	const {hashTags, id} = props

	function createModal(e) {
		if (isVisible === true) {
			setVisibility(false)
			return
		}
		setVisibility(true)
	}

	return <div className={'noteItem_hashtags'}>
		<div className="hashtags_mutable hashtags">
			<div className="hashtags_btn">
				{isVisible && <Modal setVisibility={setVisibility}
									 hashTags={hashTags}
									 id={id}/>}
				<button onClick={e => createModal(e)}>
					+
				</button>
			</div>
			{hashTags.mutable.map(mHash => <HashTag id={id} className="mutable" key={mHash} body={mHash}/>)}
		</div>
		<div className={'hashtags_immutable hashtags'}>
			{hashTags.immutable.map(imHash => <HashTag id={id} className="immutable" key={imHash} body={imHash}/>)}
		</div>
	</div>
}
export default HashTags
