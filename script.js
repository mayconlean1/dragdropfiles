const dropArea = document.querySelector('.drag-area')
const textArea = document.querySelectorAll('.drag-area>p')[0]
const input = document.querySelector('input[name=image_file]')
const form = document.querySelector('form')

let file
let fileUrl

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    if(file){
        const formData = new FormData ()
        formData.append('image_file', file)

        fetch('http://localhost:8080/', {
        method: 'POST',
        body: formData
        })
        .then(resp => { console.log('status:', resp.status)})
        // .then(data => {
        //     if (data.errors) {
        //         alert(data.errors)
        //     }
        //     else {
        //         console.log(data)
        //     }
        // })
       
    }
})

function sendFile(){input.click()}

input.addEventListener('change',async (event)=>{
    file =  event.target.files[0]
    console.log( 'input.addEventListener(change)',file)
    fileUrl = showImage(file)
    // fileUrl = await getUrlImage(file)
    // dropArea.innerHTML = `<img src="${fileUrl}" alt="">`
})

dropArea.addEventListener('dragover', (event)=>{
    event.preventDefault()
    dropArea.classList.add('active')
    textArea.textContent = 'Solte o arquivo de imagem aqui'
    // console.log('Arquivo em cima da drop area')
})

dropArea.addEventListener('dragleave', ()=>{
    dropArea.classList.remove('active')
    textArea.textContent = 'Arraste um arquivo de imagem aqui'    
    // console.log('Arquivo fora da drop area')
})

dropArea.addEventListener('drop',async (event)=>{
    event.preventDefault()
    dropArea.classList.remove('active') 

    file = event.dataTransfer.files[0] 
    fileUrl = showImage(file)
    // fileUrl= await getUrlImage(file) 
    // dropArea.innerHTML = `<img src="${fileUrl}" alt="">`
})

function showImage(file){
    const imageFormat = ['image/jpeg', 'image/jpg', 'image/png']
    if(imageFormat.includes(file.type)){
        let fileReader = new FileReader()

        fileReader.onload = ()=>{
            // fileUrl = fileReader.result
            
            // console.log(fileUrl)
            dropArea.innerHTML = `<img src="${fileReader.result}" alt="">`
            return fileReader.result
        }

        fileReader.readAsDataURL(file)
    }else{
        alert('Apenas arquivos de imagem!')
    }
}

function getUrlImage(file){
    return new Promise((resolve, reject)=>{
        const imageFormat = ['image/jpeg', 'image/jpg', 'image/png']
        if(imageFormat.includes(file.type)){
            let fileReader = new FileReader()
    
            fileReader.onload = ()=>{
                resolve(fileReader.result)
            }
    
            fileReader.readAsDataURL(file)
        }else{
            alert('Apenas arquivos de imagem!')
        }
    })  
} 


