// Start event
addEventListener("load", function () {
    setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
    window.scrollTo(0, 1);
}

// Load data
window.onload = function () {
    var url = "data.json";  // json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径
    var request = new XMLHttpRequest();
    request.open("get", url);  // 设置请求方法与路径
    request.send(null);  // 不发送数据到服务器
    request.onload = function () {  // XHR对象获取到返回信息后执行
        if (request.status == 200) {  // 返回状态为200，即为数据获取成功
            var data = JSON.parse(request.responseText);
            // for (var i = 0; i < data.sites.length; i++) {
            //     console.log(data.sites[i].name);
            // }

            // Base information
            for (var key in data.base_info) {
                document.getElementById(key).innerHTML = data.base_info[key];
            }

            // Others
            document.getElementById("selfphoto").src = data.selfphoto;
            document.getElementById("resume_file").href = data.resume_file;
            document.getElementById("page_title").innerHTML = data.base_info.name + " Personal Web Page";

            // News
            var news_obj = document.getElementById("news");
            for (var key in data.news) {
                var news_div = document.createElement("div");
                news_div.className = "col-xl-12";
                news_div.innerHTML = data.news[key];
                news_obj.appendChild(news_div);
            }

            //Publications
            var publications_obj = document.getElementById("publications");
            for (var key in data.publications) {
                // publications images
                var pub_image = document.createElement("img");
                pub_image.src = "images/low_resolution/" + data.publications[key].image;
                pub_image.alt = "news image";
                pub_image.className = "img-fluid";

                // click image
                var pub_pop = document.createElement("a");
                pub_pop.href = "#pop_" + data.publications[key].name;
                pub_pop.appendChild(pub_image);

                var pub_table = document.createElement("table");
                pub_table.cellpadding = "5";
                pub_table.width = "100%";
                pub_table.border = "0";
                pub_table.align = "top";
                pub_table.id = "paper_" + data.publications[key].name;
                var r = pub_table.insertRow();  // tr 
                var c0 = r.insertCell();  // left td
                c0.width = "20%";
                c0.valign = "center";
                c0.appendChild(pub_pop);
                var c1 = r.insertCell();  // right td
                c1.width = "80%";
                c1.valign = "center";
                c1.innerHTML = data.publications[key].info;  // publications information

                // pop_module
                var pop_up_img = document.createElement("img");
                pop_up_img.src = "images/" + data.publications[key].image;
                pop_up_img.alt = "Popup Image";
                pop_up_img.className = "img-fluid";

                var pop_up_p = document.createElement("p");
                pop_up_p.className = "mt-4";
                pop_up_p.innerHTML = data.publications[key].pop_info;

                var pop_up_a = document.createElement("a");
                pop_up_a.className = "close";
                pop_up_a.href = "#gallery";
                pop_up_a.innerHTML = "&times";


                var pop_up = document.createElement("div");
                pop_up.className = "popup";
                pop_up.append(pop_up_img, pop_up_p, pop_up_a);


                var pop_overlay = document.createElement("div");
                pop_overlay.id = "pop_" + data.publications[key].name;
                pop_overlay.className = "pop-overlay";
                pop_overlay.appendChild(pop_up);


                // Append pop_module and table
                publications_obj.append(pub_table, pop_overlay);
            }

            // Contact
            var location = document.getElementById("location");  // location
            location.innerHTML += " " + data.contact.location;
            var email = document.getElementById("email");  // email
            var email_a = document.createElement("a");
            email_a.href = "mailto:" + data.contact.email;
            email_a.className = "wordstyle";
            email_a.innerHTML = " " + data.contact.email;
            email.appendChild(email_a);

            var github = document.getElementById("github");  // github
            var github_a = document.createElement("a");
            github_a.href = data.contact.github;
            github_a.className = "wordstyle";
            github_a.innerHTML = " Github";
            github.appendChild(github_a);

            var csdn = document.getElementById("csdn");  // csdn
            var csdn_a = document.createElement("a");
            csdn_a.href = data.contact.csdn;
            csdn_a.className = "wordstyle";
            csdn_a.innerHTML = " CSDN Blog";
            csdn.appendChild(csdn_a);

            var gs = document.getElementById("google_scholar");  // csdn
            var gs_a = document.createElement("a");
            gs_a.href = data.contact.google_scholar;
            gs_a.className = "wordstyle";
            gs_a.innerHTML = " Google Scholar";
            gs.appendChild(gs_a);


        }
    }
}
