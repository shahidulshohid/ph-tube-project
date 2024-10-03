

function gettimeString(time){
  //get hour and rest seconds
  const hours = parseInt(time / 3600)
  let remainingSecond = parseInt(time % 3600)
  const minute = parseInt(remainingSecond / 60) 
  remainingSecond = remainingSecond % 60;
  return `${hours} hour ${minute} minute ${remainingSecond} second ago`
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName('category-btn')
  console.log(buttons)
  for(let btn of buttons){
    btn.classList.remove('active')
  }
}

// 1: fetch load and show categories on html
// create load categories
const loadCategories = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadVideos = (searchText = "") => {
  // console.log(searchText)
  //fetch the data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
  // alert(id)
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      //sobaik active class remove kor
      removeActiveClass()
      //id er class k active korao
      const activeBtn = document.getElementById(`btn-${id}`)
      // console.log(activeBtn)
      activeBtn.classList.add('active')
      displayVideos(data.category)
    })
    .catch((error) => console.log(error));
}
const loadDetails = async(videoId) => {
  console.log(videoId);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(uri)
  const data = await res.json()
  // console.log(data)
  displayDetails(data.video)
}
const displayDetails = (video) => {
  console.log(video)
  const detailsContainer =document.getElementById('modal-content')
  detailsContainer.innerHTML = `
  <img src=${video.thumbnail}/>
  <p>${video.description}</p>
  `;
  // way 1
  // document.getElementById('showModalData').click()
  // way-2
  document.getElementById('customModal').showModal()
}

// const cardDemo = {
//     category_id: "1001"
// ​​
// description: "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// ​​
// others: Object { views: "543K", posted_date: "" }
// ​​
// thumbnail: "https://i.ibb.co/QPNzYVy/moonlight.jpg"
// ​​
// title: "Midnight Serenade"
// ​​
// video_id: "aaab"
// }

const displayVideos = (videos) => {
  console.log(videos)
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = ""

  if(videos.length === 0){
    videosContainer.classList.remove('grid')
    videosContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col justify-center items-center">
    <img src="assets/icon.png"/>
    <h2 class="text-center text-xl font-bold">No content here in this category</>
    </div>
    `;
    return
  }
  else{
    videosContainer.classList.add('grid')
  }

  videos.forEach((video) => {
    // console.log(videos);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class='h-[200px] relative'>
    <img
      src=${video.thumbnail}
      class='h-full w-full object-cover'
      alt="Shoes" />
      ${video.others?.posted_date.length === 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white text-sm rounded p-1">${gettimeString(video.others.posted_date)}</span>`}
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
   <img class="w-10 h-10 rounded-full object-cover" src=${
     video.authors[0].profile_picture
   }/>
   </div>
   <div>
   <h2 class="font-bold">${video.title}</h2>
   <div class='flex items-center gap-2'>
   <p class='text-gray-400'>${video.authors[0].profile_name}</p>

   ${
     video.authors[0].verified === true
       ? `
   <img class='w-5' src='https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png'/>`
       : ""
   }

   </div>
   <p>
   <button onclick="loadDetails('${video.video_id}')" class="btn text-sm btn-error">details</button>
   </p>
   </div>
  </div>
        `;
    videosContainer.appendChild(card);
  });
};

// {
//     "category_id": "1001",
//     "category": "Music"
//   }

// create display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    // console.log(item)
    //create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" class="btn category-btn" onclick="loadCategoryVideos(${item.category_id})">
    ${item.category}
    </button>
    `;
    //add button to container
    categoryContainer.appendChild(buttonContainer);
  });
};

document.getElementById('search-input').addEventListener('keyup', (e) => {
  loadVideos(e.target.value)
})

loadCategories();
loadVideos();
