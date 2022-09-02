
const loadAllNews = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    //console.log(response);
    const data = await response.json();
    //console.log(data.data);
    return data.data;
}
loadAllNews();