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

// for display videos here
const displayVideos = (videos) => {
  // console.log(videos)
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = 'card card-compact';
    card.innerHTML = `
        <figure class='h-[200px]'>
    <img  class='w-full h-full object-cover'
      src=${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class='w-10 h-10 rounded-full' src=${video.authors[0].profile_picture}/>
    </div>
    <div>
    <h2>${video.title}</h2>
    <div class='flex justify-center items-center gap-2'>
    <p class='text-gray-400'>${video.authors[0].profile_name}</p>
    <img class='w-5 h-5' src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>
    </div>
    <p></p>
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
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    categoryContainer.appendChild(button);
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