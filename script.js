const dropArea = document.querySelector('.drag-area')
const textArea = document.querySelectorAll('.drag-area>p')[0]
const input = document.querySelector('input[name=image_file]')

let file

function sendFile(){input.click()}

input.addEventListener('change', (event)=>{
    file =  event.target.files[0]
    showImage(file)
    // dropArea.innerHTML = `<img src="${event.target.value}" alt="">`
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

dropArea.addEventListener('drop', (event)=>{
    event.preventDefault()
    dropArea.classList.remove('active') 

    file = event.dataTransfer.files[0] 
    showImage(file)
    
})

function showImage(file){
    const imageFormat = ['image/jpeg', 'image/jpg', 'image/png']
    if(imageFormat.includes(file.type)){
        let fileReader = new FileReader()

        fileReader.onload = ()=>{
            let fileUrl = fileReader.result
            // console.log(fileUrl)
            dropArea.innerHTML = `<img src="${fileUrl}" alt="">`
        }

        fileReader.readAsDataURL(file)
    }else{
        alert('Apenas arquivos de imagem!')
    }
}

