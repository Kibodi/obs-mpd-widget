let old_id;
async function fetchSong() {
    const res = await fetch('/api/song');
    const data = await res.json();
    let cover = await fetchCover()
    if (data.Id != old_id) { 
        updateTitle(data,cover) }
    old_id = data.Id
}
 setInterval(fetchSong, 500);

async function fetchCover() {
    const res = await fetch('/api/cover');
    const blob = await res.blob();
    return URL.createObjectURL(blob)
}

//momentan wird ein innertext von einem tag überschieben
// übergib lieber ein direktes html element und pack es direkt ins dom
function updateTitle(data, cover)
{   
    console.log(cover)
    if (Object.keys(data).length === 0) return;
    if (document.getElementById("card")) document.getElementById("card").remove();
    document.body.appendChild(createCard(data, cover))
}

function createCard(data, cover) {
    divMain = document.createElement("div")
    divMain.id = "card"

    albumCover = document.createElement("img")
    albumCover.src = cover;

    title = []
    for (let i = 0; i < data.Title.length; i++) {
        span = document.createElement("span")
        span.innerText = data.Title[i]
        span.className = "letter-title"
        let part = (i + 1) / data.Title.length;
        span.style.animationDelay = `${part * 0.5 }s`
        if (data.Title[i] === " ") span.className = "space"
        title.push(span)
    }
    
    artist = []
    for (let i = 0; i < data.Artist.length; i++) {
        span = document.createElement("span")
        span.innerText = data.Artist[i]
        span.className = "letter-artist"
        let part = (i + 1) / data.Artist.length;
        span.style.animationDelay = `${part * 0.5}s`
        if (data.Artist[i] === " ") span.className = "space"
        artist.push(span)
    }

    //artist = document.createElement("div")
    //artist.innerText = data.AlbumArtist

    divTitle = document.createElement("div")
    divTitle.className = "container"
    for (let i = 0; i < title.length; i++) {
        divTitle.appendChild(title[i])
    }
    divArtist = document.createElement("div")
    divArtist.className = "container"
    for (let i = 0; i < artist.length; i++) {
        divArtist.appendChild(artist[i])
    }
    divText = document.createElement("div")
    divText.className = "text"
    divMain.appendChild(albumCover)
    divText.appendChild(divTitle)
    divText.appendChild(divArtist)
    divMain.appendChild(divText)
    
    return divMain
}
