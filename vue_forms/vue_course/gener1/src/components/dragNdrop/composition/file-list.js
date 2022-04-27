import { ref } from 'vue'

export default function() {
	const file = ref()

	function addFile(newFile) {
		let newUploadableFiles = new UploadableFile(newFile)
		file.value = newUploadableFiles
	}



	function removeFile(file) {
		file.value.url = 'upload.png'
	}

	return { file, addFile, removeFile }
}

class UploadableFile {
	constructor(file) {
		this.file = file
		this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
		this.url = URL.createObjectURL(file)
		this.status = null
	}
}