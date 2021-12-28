import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";


// 'file' comes from the Blob or File API
const uploadFile = (file) =>{
    const httpsReference = "files/".concat(file.name);
    const fileRef = ref(storage,httpsReference)
    try {
        uploadBytes(fileRef, file).then((url) => {
            getDownloadURL(fileRef).then(downloadUrl =>{
                return downloadUrl;
            });
        });
    } catch (error) {
        return false;
    }
}

export {uploadFile};