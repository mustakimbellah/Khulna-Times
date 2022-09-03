
const loadAllNews = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    displayCatagories(data.data.news_category)
        .catch((error) => {
            throw error;
        });
};

const displayCatagories = async (catagories) => {
    //console.log(loadAllNews()); 

    const catagoriesContainer = document.getElementById('all-menu');
    for (const menu of catagories) {
        //console.log(menu);

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="newsMenu(${menu.category_id})">${menu.category_name}</div>
        `;

        catagoriesContainer.appendChild(div);
    }
};

function newsMenu(category_id) {
    let url = `https://openapi.programming-hero.com/api/news/category/${"0" + category_id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data));
}

function displayNews(data) {

    const detailsNews = document.getElementById('all-news');
    detailsNews.textContent = '';
    data.forEach((element) => {
        console.log(element);
        const div = document.createElement('div');
        div.innerHTML = `
                    <div class="card mb-3 p-5" >
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                <h1 class="card-title">${element.title}</h1>
                                <p class="card-text">${element.details.slice(0, 200)}...</p>

                                <div class = 'd-flex justify-content-between align-items-center'>
                                <div><span class = 'me-3' > <img src="${element.author.img}" class="rounded-circle" style = 'width:50px'alt=""> </span>
                                <span>${element.author.name ? element.author.name : "No Name"}</span></div>

                                <div>
                                <i class="fa-solid fa-eye me-2"></i>${element.total_view}
                                </div>
                                <div>
                                <button onclick="showAllDetails('${element._id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsModal">Show Detail</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                `;

        detailsNews.appendChild(div);
    });
}





//displayNews();
//newsMenu();
loadAllNews();