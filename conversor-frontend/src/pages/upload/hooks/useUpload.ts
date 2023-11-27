import { api } from "../../../config";
import { useRef, useState } from "react";

const useUpload = () => {
    const inputRef = useRef(null)
    const [ file, setFile ] = useState<File | null>(null)
    const [ image, setImage ] = useState<any>(null) 
    const [ loading, setLoading ] = useState<boolean>(false) 

    const handleClickUpload = () => {
        //@ts-ignore
        inputRef.current.click();
    };

    const handleChangeFile = (event: any) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        setImage(URL.createObjectURL(event.target.files[0]))
        setFile(fileObj)
    };

    const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onUpload = async () => {
        console.time('CONVERT')
        setLoading(true)
        const fileBase64 = await toBase64(file);
        const response = await api.post('/file/convert', { base64: fileBase64, name: file?.name }, {
            responseType: 'blob',
        })
        download(response.data)
        console.timeEnd('CONVERT')
        setLoading(false)
    }

    const download = (blob: any) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = `${file?.name.split('.')[0]}.pdf`;
        a.href = url;
        a.target = '_self';
        a.click();

        setTimeout(function () {
            a.remove();
            URL.revokeObjectURL(url);
        }, 100);
    }


    return {
        inputRef,
        file,
        image,
        loading,
        handleClickUpload,
        handleChangeFile,
        onUpload
    }
}

export default useUpload