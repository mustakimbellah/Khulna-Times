
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
    let url = `https://openapi.programming-hero.com/api/news/category/${'0' + category_id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data));
}



newsMenu();
//loadAllNews();