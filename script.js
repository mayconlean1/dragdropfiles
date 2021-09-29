const host = 'http://localhost:3000/'

const dropArea = document.querySelector('.drag-area')
const textArea = document.querySelectorAll('.drag-area>p')[0]
const input = document.querySelector('input[name=image_file]')
const form = document.querySelector('form')

let file
let fileUrl

const files = {}
let currentThumbId = 0

function addImage(){   
    const thumbArea = document.querySelector('.thumb-area')
    thumbArea.innerHTML += `
    <div id='thumb_${String( currentThumbId )}' class="image-field" onClick='deleteThumb(this)' >
        
        <img class='img-thumb' src="${fileUrl}" alt="">
        
    </div>
    `
    
    const dragaArea = document.querySelector('.drag-area')
    dragaArea.innerHTML = `
    <p>Arraste um arquivo de imagem aqui</p>
    <p>ou</p>
    <!-- <input type="file" name="image" id="image_id" accept="image/*"> -->
    <button onclick="sendFile()">Escolha uma imagem</button>
    `

    const id = 'thumb_' + String(currentThumbId)
    files[id] = file
    currentThumbId ++
}

function deleteThumb(self){
   
    if (confirm('Deseja deletar a imagem?')){
        const id = self.id
        self.parentNode.removeChild(self)
        delete files[id]
       
    }
}

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    
    const formData = new FormData ()
    let formDataStatus = false

    if (Object.keys(files).length > 0){
        for(id in files){
            const tempfile = files[id]
            formData.append('image_file', tempfile)
        }
        formDataStatus = true
    }else if(file){
        formData.append('image_file', file)
        formDataStatus = true
    } 
    
    if(formDataStatus){
        fetch(host, {
        method: 'POST',
        body: formData
        })
        .then(resp => { console.log('status:', resp.status)})

    }

 
})

function sendFile(){input.click()}

input.addEventListener('change',async (event)=>{
    file =  event.target.files[0]
    // fileUrl = showImage(file)
    fileUrl = await getUrlImage(file)
    dropArea.innerHTML = `<img src="${fileUrl}" alt="">`
})

dropArea.addEventListener('dragover', (event)=>{
    event.preventDefault()
    dropArea.classList.add('active')
    textArea.textContent = 'Solte o arquivo de imagem aqui'
    
})

dropArea.addEventListener('dragleave', ()=>{
    dropArea.classList.remove('active')
    textArea.textContent = 'Arraste um arquivo de imagem aqui'    
    
})

dropArea.addEventListener('drop',async (event)=>{
    event.preventDefault()
    dropArea.classList.remove('active') 

    file = event.dataTransfer.files[0] 
    // fileUrl = showImage(file)
    fileUrl= await getUrlImage(file) 
    dropArea.innerHTML = `<img src="${fileUrl}" alt="">`
})

function showImage(file){
    const imageFormat = ['image/jpeg', 'image/jpg', 'image/png']
    if(imageFormat.includes(file.type)){
        let fileReader = new FileReader()

        fileReader.onload = ()=>{
            // fileUrl = fileReader.result

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


