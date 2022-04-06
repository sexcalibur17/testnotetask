import {useCallback, useRef} from 'react';

export const useDebouncedCallback = (callback, delay) => {
	const timer = useRef()
	const debouncedCallback = useCallback((...args)=>{
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = setTimeout(()=>{
			callback(...args)
		}, delay)
	}, [callback, delay])
	return debouncedCallback
}