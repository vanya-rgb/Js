import {ref} from 'vue'
import { ref as stRef, getDownloadURL, getStorage, uploadBytes } from 'firebase/storage'


export async function uploadFile(file, path) {
    const loadPhotoUrl = ref()
    console.log("File", file);
	const storage = getStorage()
    console.log('PATH', path);
    const storageRef = stRef(storage, 'files/'+ path +'/' +file.file.name)

    const snapshot = await uploadBytes(storageRef, file.file)
    loadPhotoUrl.value = await getDownloadURL(snapshot.ref)

    console.log("Загрузка", loadPhotoUrl.value);

    return {
        url:loadPhotoUrl.value,
        size: file.file.size,
        type: file.file.type,
        name: file.file.name
    }
}

export function uploadFiles(files, path) {
	return Promise.all(files.map((file) => uploadFile(file, path)))
}

export default function createUploader(path) {
	return {
		uploadFile: function (file) {
			return uploadFile(file, path)
		},
		uploadFiles: function (files) {
			return uploadFiles(files, path)
		},
	}
}