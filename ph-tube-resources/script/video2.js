
// time managing function here
function getTimeString(time){
    //get hour and rest seconds
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600; 
    const minutes = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return `${hour} hour ${minutes} minutes ${remainingSeconds} seconds ago`
}

// create reomve active button 
function removeActiveClass(){
    const buttons = document.getElementsByClassName('category-btn')
    for(let btn of buttons){
        btn.classList.remove('active')
    }
}

// created 3 buttons here
const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// for load videos here
const loadVideos = () => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

//for loading categories video here
const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data =>{
        //remove all the active class
        removeActiveClass()
        //do active the class of id
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add('active')
        // console.log(activeBtn)
        displayVideos(data.category)
    })
    // console.log(id)
}

// for loading details 
const loadDetails = (videoId) => {
    console.log(videoId)
}

// for display videos here
const displayVideos = (videos) => {
  // console.log(videos)
  const videoContainer = document.getElementById("videos");
  document.getElementById("videos").innerHTML = ''
  
  if(videos.length === 0){
    videoContainer.classList.remove('grid')
    videoContainer.innerHTML = `
    <div class='min-h-[300px] flex flex-col gap-5 justify-center items-center '>
    <img src='assets/icon.png'/>
    <h2 class='text-xl font-bold text-center'>No content here in this category</h2>
    </div>
    `;
  }
  else{
    videoContainer.classList.add('grid')
  }

  videos.forEach((video) => {
    // console.log(video);
    const card = document.createElement("div");
    card.classList = 'card card-compact';
    card.innerHTML = `
        <figure class='h-[200px] relative'>
    <img  class='w-full h-full object-cover'
      src=${video.thumbnail}
      alt="Shoes" />
      ${video.others.posted_date?.length === 0 ? "" : `<span class='absolute bottom-2 right-2 bg-black rounded p-1 text-white text-xs'>${getTimeString(video.others.posted_date)}</span>`}
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class='w-10 h-10 rounded-full' src=${video.authors[0].profile_picture}/>
    </div>
    <div>
    <h2>${video.title}</h2>
    <div class='flex justify-center items-center gap-2'>
    <p class='text-gray-400'>${video.authors[0].profile_name}</p>
    ${video.authors[0].verified ? `<img class='w-5 h-5' src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ''}
    </div>
    <p> <button onclick="loadDetails('${video.video_id}')" class='btn btn-sm btn-error'>details</button></p>
    </div>
  </div>
        `;
    videoContainer.appendChild(card);
  });
};
// display buttons here
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    // console.log(item)
    const div = document.createElement("div");
    div.innerHTML = `
    <button id='btn-${item.category_id}' onclick='loadCategoryVideos(${item.category_id})' class='btn category-btn'>${item.category}</button>
    `;
    categoryContainer.appendChild(div);
  });
};

loadCategories();
loadVideos();


// {
//     "category_id": "1003",
//     "video_id": "aaaj",
//     "thumbnail": "https://i.ibb.co/xgWL3vQ/kid-gorgeous.jpg",
//     "title": "Kid Gorgeous",
//     "authors": [
//       {
//         "profile_picture": "https://i.ibb.co/xsfkwN2/john.jpg",
//         "profile_name": "John Mulaney",
//         "verified": true
//       }
//     ],
//     "others": {
//       "views": "241K",
//       "posted_date": ""
//     },
//     "description": "John Mulaney's 'Kid Gorgeous' has captured the hearts of many with 241K views. As a verified comedian, John delivers a masterclass in stand-up with clever anecdotes, quick wit, and relatable humor. This performance is a laugh-filled adventure through his unique take on life, politics, and pop culture."
//   }