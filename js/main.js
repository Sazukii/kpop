document.addEventListener('DOMContentLoaded', function(){
  const api_key = 'AIzaSyC2m64dCuhAKPKYgX-8RW2IWcomUfaUC08';
    let playlist_id = 'PLLcCSIwtLcGk5rgsXjAGy95bfUPxMY4uI';
    let page_token = "CDIQAQ";
    let autoplay = 0;
    let api_url = `https://www.googleapis.com/youtube/v3/playlistItems?&part=snippet&maxResults=50&playlistId=${playlist_id}&key=${api_key}&pageToken=${page_token}`;
    let y = 0;
    const knop = document.getElementById('knop');
    const onze_player = document.getElementById('onze_player');
    const giveUrl = document.getElementById('giveUrl');
    giveUrl.addEventListener('click', getUrl);
    const ajax = function (url, type) {
        return new Promise(function (goed, fout) {
            {
                const http = new XMLHttpRequest();
                http.open('GET', url, true);
                http.onreadystatechange = function () {
                    if (http.readyState === 4 && http.status === 200) {
                        goed(this.response);
                    } else if (http.readyState === 4 && http.status !== 200) {
                        fout('Something went wrong.');
                    }
                };
                http.setRequestHeader("Accept", type);
                http.send();

            }
        });
    };

    const p = ajax(api_url, "text/json");
    p.then(
        function (data) {
                const obj = JSON.parse(data);
                let x = obj.items[y].snippet.resourceId.videoId;
                onze_player.innerHTML = `<iframe height="390" width="640" src="https://www.youtube.com/embed/${x}?autoplay=${autoplay}" allowfullscreen frameborder="0" ></iframe>`;
                console.log(obj);
        },
        function (data) {
            console.log("Mislukt: " + data);
        }
    );
    function next() {
        p.then(
            function (data) {
                const obj = JSON.parse(data);
                y++;
                let nextPage = obj.nextPageToken;
                let x = obj.items[y].snippet.resourceId.videoId;
                onze_player.innerHTML = `<iframe height="390" width="640" src="https://www.youtube.com/embed/${x}?autoplay=${autoplay}" frameborder="0" ></iframe>`;

                if (y === obj.items.length) {
                    page_token = nextPage;
                    api_url = `https://www.googleapis.com/youtube/v3/playlistItems?&part=snippet&maxResults=50&playlistId=${playlist_id}&key=${api_key}&pageToken=${page_token}`;
                    y = 0;
                }
            },
            function (data) {
                console.log("Mislukt: " + data);
            }
        );
    }
    knop.addEventListener('click', next);



    function getUrl() {
        const url = document.getElementById('url').value;
        const myRegexp = /list=(.*)/;
        const match = myRegexp.exec(url);
        playlist_id = match[1];
    }
    // console.log(knop.addEventListener('click', p.then()));

)};
