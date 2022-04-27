// <template>
//   <div class="container">
//     <form id="upload-form" @submit.prevent="upload">
//        <input type="file" id="file" @change="handleFileUpload"/>
//         <input type="submit" value="Upload">
//     </form>
//     <button class="btn" @click="onValue">Получить</button>
//     <div class="card">
//         <img alt="File preview" :src="fileLink" class="ng-star-inserted" height="300" width="300">

//     </div>
//     <div class="card">{{fileLink}}</div>

//   </div>
// </template>
// <script>



// import {computed, ref} from 'vue'
// import { getStorage, ref as stRef, uploadBytes, getDownloadURL} from 'firebase/storage'
// import { getDatabase, ref as dbRef, push, set} from 'firebase/database'
// import app from '../firebase/index'
// import {useStore} from 'vuex'

//   export default {

//         setup() {
        
//         const file = ref()
//         const fileLink = ref(localStorage.getItem('pic'))
//         // const storage = getStorage(app)
//         // const store = useStore()
//         // const userName = computed(()=> store.getters['registrate/userId'])

//         const handleFileUpload = (e) => {
//             file.value = e.target.files[0]
//             console.log(file.value);
            
//         }


//         const upload = () => {
            
//             const database = getDatabase()
//             const databaseReference = dbRef(database, 'files')
//             const storageRef = stRef(storage, 'files/'+userName.value+'/'+ file.value.name)
//             uploadBytes(storageRef, file.value).then(() => {
//                 const newFileRef = push(databaseReference)
//                 set(newFileRef, {
//                     "name": file.value.name
//                 })
//             })
//         }

        
//         const onValue = async () => {
            
//             const storageRefDownload = stRef(storage, 'files/'+userName.value+'/'+ file.value.name)


//             await getDownloadURL(storageRefDownload).then((url)=>{
//                 fileLink.value = url
//                 localStorage.setItem('pic', fileLink.value)

//             })
//             console.log(fileLink.value);

//         }
       
//         return {
//             upload, handleFileUpload, file, onValue, fileLink
//         }
//     },
//     }


// </script>




// const handleFileUpload = (e) => {
//     file.value = e.target.files[0]
// }



// async getPic({commit, dispatch}) {
//     try {
//         const localId = computed(()=> store.getters['auth/localId'])
//         console.log('localId', localId.value);
//         const fileName = localStorage.getItem('fileName')
//         console.log('file name', fileName);
//         const storageRefDownload = stRef(storage, `files/${localId.value}/${fileName}`)

//         await getDownloadURL(storageRefDownload).then((url)=>{
//             console.log("LInk", url);
//             commit('setPicLink', url)
//         })
        
//     } catch (e) {
//         dispatch('setMessage', {
//             value: e.message,
//             type: 'danger'
//         }, {root: true})
//     }




{/* <template>
	<div id="app">
		<DropZone class="drop-area" @files-dropped="onDropChange" #default="{ dropZoneActive }">
			<label for="file-input">
				<span v-if="dropZoneActive">
					<span>Drop Them Here</span>
					<span class="smaller">to add them</span>
				</span>
				<span v-else>
					<span>Drag Your Files Here</span>
					<span class="smaller">
						or <strong><em>click here</em></strong> to select files
					</span>
				</span>
				<input type="file" id="file-input" multiple @change="onInputChange" />
			</label>
			<ul class="image-list">
				<FilePreview  :file="file" tag="li"/>
			</ul>
		</DropZone>
		<button @click.prevent="" class="upload-button">Upload</button>
	</div>
</template>

<script>
import DropZone from '../components/dragNdrop/dropZone.vue'
import FilePreview from '../components/dragNdrop/filePreview.vue'

import {ref} from 'vue'
export default {
    setup() {
        const files = ref([])
        

        const onInputChange = (e)=> {
            files.value = e.target.files[0]
            console.log(files.value);
            // e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
        }
        const onDropChange = (e)=> {
            console.log('eshechka',e);
            files.value = e[0]
             // reset so that selecting the same file again will still cause it to fire this change
        }
        // const { uploadFiles } = createUploader('YOUR URL HERE')

        return {
            onInputChange, files, onDropChange
        }
    },
    components: {
        DropZone, FilePreview
    }
}

// Uploader


</script> */}


