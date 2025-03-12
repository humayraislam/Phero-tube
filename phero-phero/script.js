//disply date 
function displayDate(time) {
    let hour = parseInt(time / 3600)
    let remaningSec = time % 3600
    let day = parseInt(time / 86400)
    let minute = parseInt(remaningSec / 60)

    return `${hour}hrs ${minute}min ago`
}

//details
const loadDetailsBtn = async(videoId) => {
    console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json()
    //fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
        //.then(res => res.json())
        //.then(data => console.log(data))
    //.catch(error => console.error(error))
    displayDitails(data.video)
}

//
const displayDitails = (video) => {
    console.log(video)
    const modalContent = document.getElementById('modal-content')

    modalContent.innerHTML = `
   <img src=${video.thumbnail} />
   <p>${video.description}</p>
    `

    document.getElementById('modal-data').click()

   
} 

    

//load categories 
function loadCategory() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
    .catch(err => console.error(err))
} 

//load categoryVideo
const categoryVideo = (id) => {
    //alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
    .catch(err => console.error(err))
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('btn-category')
    console.log(buttons)
    for (let btn of buttons) {
        btn.classList.remove('active')
    }
}

//display categories
const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category-container')
    categories.forEach((item) => {
        console.log(item)
        const buttonContainer = document.createElement("div")
        buttonContainer.innerHTML = `
        <button id = "btn-${item.category_id}" class = "btn-category btn" onclick = "categoryVideo(${item.category_id})" >${item.category}</button>
        `

        /*const button = document.createElement('button')
        button.classList = ('btn')
        button.innerText = items.category*/
        categoryContainer.appendChild(buttonContainer)

    });
}

loadCategory()

//load videos
function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
    .catch(err => console.error(err))
} 

//display video
const displayVideos = (videos) => {
    const videoSection = document.getElementById('video-section')
    videoSection.innerHTML = ""
    
    if (videos.length == 0) {
        videoSection.classList.remove('grid')
        videoSection.innerHTML =
        `
        <div class = "flex justify-center text-center lg:pt-20 items-center flex-col">
        <img class = "w-32" src = "assest/icon.png" />
        <p class = "text-3xl">Oops!! Sorry, There is no <br> content here</p>
        </div>
        `
        return
    }
    else {
        videoSection.classList.add('grid')
    }
    

    videos.forEach((video) => {
        console.log(video)
        const card = document.createElement('div')
        card.classList = 'card card-compact '
        card.innerHTML = `
        <figure class = "h-[190px] relative ">
          <img
          src= ${video.thumbnail} 
          class = " h-full w-full"/>

          ${video.others.posted_date?.length == 0 ? "" : `<span class = "absolute right-2 bottom-2 text-xs bg-black p-1 text-white rounded "> ${displayDate(video.others.posted_date)}<span/>` }    

          
       </figure>
      <div class="px-0 py-2 flex items-start  gap-2">
       <div>
       <img class = "rounded-3xl w-10 h-10 object-cover items-center" src = ${video.authors[0].profile_picture}/>
       </div>
       <div>
       <h2 class = "font-semibold text-xl">${video.title}</h2>
       <div class = "flex gap-2 items-center ">
       <p class = "text-base text-gray-500">${video.authors[0].profile_name}</p>
       
       ${video.authors[0].verified === true ? `<img class = "w-4 h-4" src = "https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ''}

       </div>

       <div class = "flex items-center justify-between gap-10 ">
       <p class = "text-gray-500">${video.others.views } views</p>
       <button onclick = "loadDetailsBtn('${video.video_id}')"  class = "btn bg-red-500 text-white">Details</button>
       </div>
       </div>

     </div>
     </div>
        `
        videoSection.append(card)

    });
}


loadVideos()