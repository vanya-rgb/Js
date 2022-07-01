import { ref as stRef, getStorage, deleteObject } from 'firebase/storage'


export async function removeFile(file, path) {
    console.log("FileRemove", file);
	const storage = getStorage()
    const storageRef = stRef(storage, 'files/'+ path+ '/'+file.name)

    await deleteObject(storageRef).then(()=>{
        console.log('File Removed');
    }).catch((error)=> {
        console.log("File Remove:", error);
    })
}

export function removeFiles(files, path) {
	// if (files.length == 1) {
	// 	return removeFile(files, path)
	// } else {
		console.log("remover", files);
		return Promise.all(files.map((file) => removeFile(file, path))) 
	
}

export default function createRemover(path) {
	return {
		removeFile: function (file) {
			return removeFile(file, path)
		},
		removeFiles: function (files) {
			return removeFiles(files, path)
		},
	}
}