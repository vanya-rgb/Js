import { ref } from 'vue'

export default function() {
	const file = ref()
	const files = ref([])
	const message = ref()
	const fileTypes = ref([
		'image/jpg',
		'image/jpeg',
		'image/png',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'application/pdf',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		'application/msaccess',
		'application/vnd.openxmlformats-officedocument.presentationml.presentation'
	])
	
	function addFileDirect (newFiles) {
		let newUpFiles = [...newFiles].map((file) => new UploadableDirect(file))
		files.value = files.value.concat(newUpFiles)
		console.log("DIrect", files.value)
	}

	function addFile(newFile) {
		let newUploadableFiles = new UploadableFile(newFile)
		file.value = newUploadableFiles
	}
	function addFiles(newFiles) {

		let newUploadableFiles = [...newFiles].map((file) => new UploadableFile(file))
			.filter((file) => !fileExists(file.id))
			.filter((file) => validFileType(file.type))
			.filter((file) => goodFileSize(file.size))
			
		if (newUploadableFiles.length + files.value.length > 5) {
			message.value = 'Можно прикрепить только 5 файлов'
			setTimeout(()=> {
				message.value = ''
			}, 5000)
		} else files.value = files.value.concat(newUploadableFiles)
	}
	
	function validFileType(type) {
		if (fileTypes.value.includes(type)){
			return true
		} else message.value = 'Неверный тип файла'
		setTimeout(()=> {
			message.value = ''
		}, 5000)
	}
	
	function goodFileSize(size) {
		if (size < 3145728) {
			return true
		} else message.value = 'Размер файла не должен превышать 3 МБ'
		setTimeout(()=> {
			message.value = ''
		}, 5000)
	}

	function fileExists(otherId) {
		return files.value.some(({ id }) => id === otherId)
	}

	function removeFile(file) {
		console.log("fileRemove", file);
		const index = files.value.indexOf(file)
		console.log(index);

		if (index > -1) files.value.splice(index, 1)
		console.log("FILES", files.value);
	}

	return { file, addFile, files, addFiles, removeFile, message, addFileDirect }
}

class UploadableFile {
	constructor(file) {
		this.file = file
		this.name = file.name
		this.type = file.type
		this.size = file.size
		this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
		this.url = URL.createObjectURL(file)
		// this.status = null
	}
}

class UploadableDirect {
	constructor(file) {
		// this.file = file
		this.id = file.id
		this.name = file.name
		this.size = file.size
		this.type = file.type
		this.url = file.url
	}
}