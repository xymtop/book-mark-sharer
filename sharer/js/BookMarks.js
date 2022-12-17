chrome.bookmarks.getTree(function(bookmarkArray){
    let data = []
    let resdata = ""
    analyseBookMark(bookmarkArray,data,"");
    for(let str in data){
        console.log(data[str])
        resdata += "<input type=\"checkbox\" name=\"like[read]\" title='"+data[str].title+"'">"";
    }
    if(resdata!=null){
        document.querySelector(".marklist").innerHTML = resdata
    }

});


function analyseBookMark (data, bookmarkArray, path) {
    for (var children in data) {
        if (data[children].length > 0 && typeof(data[children]) == "object") {
            if (data && data.title && data.title !== '') {
                path = path + data.title + '/';
            }
            analyseBookMark(data[children], bookmarkArray, path);
        } else {
            if (typeof(data[children]) == "object") {
                for(var childKey in data[children]) {
                    if (typeof(data[children][childKey]) == "object") {
                        if (data && data[children].title && data[children].title !== '') {
                            path = path + data[children].title + '/';
                        }
                        analyseBookMark(data[children][childKey], bookmarkArray, path);
                    } else {
                        if (childKey === "url") {
                            var url = data[children][childKey];
                            var title = data[children].title;
                            var path = path;
                            var jsonData = {
                                title: title,
                                url: url,
                                path: path
                            };
                            bookmarkArray.push(jsonData);
                        }
                    }
                }
            } else {
                if (children === "url") {
                    var url = data[children];
                    var title = data.title;
                    var path = path;
                    var jsonData = {
                        title: title,
                        url: url,
                        path: path
                    };
                    bookmarkArray.push(jsonData);
                }
            }
        }
    }
};
