const handleCategory = async () => {



    const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await response.json();
    const categories = data.data.news_category;
    const categoriesTrimed = categories;
    const tabContainer = document.getElementById('tab-container')
    categoriesTrimed.slice(0, 3).forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `

                <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>

            `
        tabContainer.appendChild(div);
    })
}

const handleLoadNews = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    data.data?.forEach((news) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-compact  bg-base-100 shadow-xl">
        <figure><img src="${news?.image_url ? news.image_url : 'No Image Found'}" alt="image" /></figure>
        <div class="card-body space-y-3 mt-4 m-3">
            <div class="flex items-center justify-between">
                <h2 class="card-title text-2xl">${news?.title ? news.title : 'No Title'}</h2>
                <div class="badge badge-secondary p-5 text-base font-semibold">${news?.rating?.badge ? news.rating.badge : 'no Badge'}</div>
            </div>

            <p class="text-base">${news?.details ? news.details.slice(0,100) + '....' : 'No Details'}</p>
            <p class="font-medium">${news?.total_view ? news.total_view + ' Views' : 'No Views'}</p>
            <div class="card-actions flex items-center justify-between">

                <!-- image circle -->
                <div class="flex items-start gap-2">
                    <div class="avatar online">
                        <div class="w-12 rounded-full">
                            <img src="${news?.author?.img ? news.author.img : 'No image found'}" />
                        </div>
                    </div>
                    <div>
                        <p class="text-base font-medium">${news?.author?.name ? news.author.name : 'No name found'}</p>
                        <p>${news?.author?.published_date ? news.author.published_date : 'No date found'}</p>
                        
                    </div>
                    
                </div>

                <button onclick="handleModal('${news._id}')" class="btn btn-primary">Details</button>

            </div>
        </div>
    </div>
        
    `   
        cardContainer.appendChild(div);
        
        


    })

}

const handleModal = async (newsId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await response.json();
    const newsDatas = data.data['0'];

    // Clear the previous modal content
    const modal = document.getElementById('modal');
    modal.innerHTML = '';

    // Create a unique modal ID
    const modalId = `my_modal_${newsId}`;

    // Create the new modal content
    const div = document.createElement('div');
    div.innerHTML = `
        <dialog id="${modalId}" class="modal">
            <form method="dialog" class="modal-box w-11/12 max-w-5xl">
                <div class="flex md:flex-row flex-col gap-4 items-center">
                    <img class="w-96 rounded-lg" src="${newsDatas.image_url}" alt="">
                    <h3 class="font-medium text-base">${newsDatas.details}</h3>
                </div>
                <div class="modal-action">
                    <button class="btn" onclick="closeModal('${modalId}')">Close</button>
                </div>
            </form>
        </dialog>
    `;

    modal.appendChild(div);

    // Show the new modal
    const newModal = document.getElementById(modalId);
    newModal.showModal();
};

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.close();
}


handleCategory();
handleLoadNews('01');