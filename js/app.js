
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

    //toggleSpinner(true);

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

    //toggleSpinner(false);
};
//newsMenu(1);
function newsMenu(category_id) {
    let url = `https://openapi.programming-hero.com/api/news/category/${"0" + category_id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data));
    //console.log(data.data[0].length);
}

function displayNews(data) {

    //console.log(data.length);

    document.getElementById('item-catagory').innerText = data.length ? data.length : 'No';

    // toggleSpinner(true);

    const detailsNews = document.getElementById('all-news');
    detailsNews.innerHTML = '';
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
                                <i class="fa-regular fa-eye"></i>View:  ${element.total_view}
                                </div>
                                <div>
                                <button onclick="showAllDetails('${element._id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                `;

        detailsNews.appendChild(div);
    });

    //toggleSpinner(false);
}

function showAllDetails(news_id) {
    let url = `https://openapi.programming-hero.com/api/news/${news_id}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => display(data.data))
}

function display(data) {
    //let modalBody = document.getElementById("exampleModal")
    let exampleModalLabel = document.getElementById("exampleModalLabel")
    exampleModalLabel.textContent = " "
    data.forEach(event => {
        //console.log(event);
        let { details, title, total_view, thumbnail_url, author } = event;
        let div = document.createElement('div')
        exampleModalLabel.innerText = title;
        div.innerHTML = `
                <div class = "text-center mt-2 mb-2">
                <img src ="${thumbnail_url}"/>
                </div>
                <p>Details: ${details}</p>
                <h5 class="text-primary">Author Name : ${author.name ? author.name : "No Data Avaiable"}</h5>
                <p class="text-primary">View: ${total_view ? total_view : "No Data Avaiable"}</p>
                
      `;
        exampleModalLabel.appendChild(div)
    })
}
//<h2 class="card-title">${title}</h5>

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
};





//displayNews();
//newsMenu();
loadAllNews();
//showAllDetails();
//displayNews();