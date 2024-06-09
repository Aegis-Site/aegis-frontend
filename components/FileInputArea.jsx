"use client"

import { Input } from "@components/ui/input"
import { useToast } from "./ui/use-toast"
import { useRouter } from 'next/navigation'

const FileInputArea = () => {
    
    const { toast } = useToast()
    const router = useRouter()

    const uploadData = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("fileUpload", e.target.fileUpload.files[0])
        
        try {
            const res = await fetch("http://localhost:8080/api/fileUpload", {
                method: "POST",
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_SECRET
                },
                body: formData,
            })

            if (res.ok) {
            toast({
                description: "File uploaded"
            })
        }

        const data = await res.json()
        console.log(data)
        router.push(`/reports/${data.sha256}`)
        }
        catch (err) {
            console.log(err)
            toast({
                description: `Error: ${err}`
            })
        }
    }

  return (

    <div className="grid w-full max-w-sm items-center gap-1.5 py-10">
        <form onSubmit={uploadData} encType="multipart/form-data">
            <Input name="fileUpload" id="fileUpload" type="file" required/>
            <br />
            <div>
                <button onClick={() => {
                    toast({
                        description: "File uploading"
                    })
                }} className="submitButton w-full h-10 rounded-lg px-2 py-2" type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default FileInputArea