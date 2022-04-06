const API = {
	getNotes: async function () {
		const response = await fetch('/.netlify/functions/server/api/notes')
		return await response.json()
	},
	setNotes: function (notes) {
		let newBody = JSON.stringify(notes)
		return fetch('/.netlify/functions/server/api/notes', {
			method: 'POST',
			body: newBody,
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(r => r.json())
	}
}
export default API
