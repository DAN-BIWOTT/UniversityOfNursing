import { getBlob, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";


// 'file' comes from the Blob or File API
const httpsReference = 'https://firebasestorage.googleapis.com/b/bucket/o/';
const uploadFile = (file) =>{
    const fileRef = ref(storage,`${httpsReference}/${file.name}`)
    uploadBytes(fileRef, file).then((url) => {
        console.log('Uploaded a blob or file!');
        console.log(url);
    return url;
    });
}

export {uploadFile};