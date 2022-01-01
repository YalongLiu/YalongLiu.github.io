// Load data
var json_data = null;
window.onload = function () {
    var url = "data/works.json";  // json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径
    var request = new XMLHttpRequest();
    request.open("get", url);  // 设置请求方法与路径
    request.send(null);  // 不发送数据到服务器
    request.onload = function () {  // XHR对象获取到返回信息后执行
        if (request.status == 200) {  // 返回状态为200，即为数据获取成功
            json_data = JSON.parse(request.responseText);

            // Base information
            for (var key in json_data.base_info) {
                document.getElementById(key).innerHTML = json_data.base_info[key];
            }

            // Works card
            var work_n = json_data.data.length;
            for (let i = 0; i < work_n; i++) {

                // Card body
                var card_img = document.createElement("img");
                card_img.src = "images/other_works/images/" + json_data.data[i].images[0];
                card_img.alt = "Article Image";
                card_img.className = "img-small";

                var card_div_div0 = document.createElement("div");
                card_div_div0.className = "card-subtitle mb-2 text-muted";
                card_div_div0.innerHTML = json_data.data[i].time;

                var card_body_h4 = document.createElement("h4");
                card_body_h4.className = "card-title";
                card_body_h4.innerHTML = json_data.data[i].name;

                var card_body_p = document.createElement("p");
                card_body_p.className = "card-text";
                card_body_p.innerHTML = json_data.data[i].abstract;

                var card_div_div1_a = document.createElement("a");
                card_div_div1_a.href = "#" + json_data.data[i].tag;
                card_div_div1_a.className = "card-more";
                card_div_div1_a.onclick = function () { pop_func.init(i); };
                card_div_div1_a.innerHTML = "Read More";

                var card_div_div1 = document.createElement("div");
                card_div_div1.className = "text-right";
                card_div_div1.appendChild(card_div_div1_a);


                var card_a = document.createElement("div");
                card_a.align = "center";
                card_a.appendChild(card_img);

                var card_div = document.createElement("div");
                card_div.className = "card-body";
                card_div.append(card_div_div0, card_body_h4, card_body_p, card_div_div1);

                var card_article = document.createElement("article");
                card_article.className = "card";
                card_article.append(card_a, card_div);

                var card = document.createElement("div");
                card.className = "col-12 col-md-6 col-lg-4";
                card.appendChild(card_article);

                //Pop-overlay
                var pop_b0 = document.createElement("button");
                pop_b0.id = "bt_last";
                pop_b0.onclick = function () { pop_func.changeimg('last'); };
                pop_b0.innerHTML = "<";

                var pop_b1 = document.createElement("button");
                pop_b1.id = "bt_next";
                pop_b1.onclick = function () { pop_func.changeimg('next'); };
                pop_b1.innerHTML = ">";

                var pop_a = document.createElement("a");
                pop_a.className = "close";
                pop_a.href = "#gallery";
                pop_a.onclick = function () { pop_func.close(); };
                pop_a.innerHTML = "&times;";

                var pop_p = document.createElement("p");
                pop_p.id = "pop_p_" + i;

                var pop_dis = document.createElement("p");
                pop_dis.id = "pop_dis_" + i;

                var pop_img = document.createElement("img");
                pop_img.src = "images/other_works/images/" + json_data.data[i].images[0];
                pop_img.id = "pop_img_" + i;
                pop_img.alt = "Popup Image";
                pop_img.className = "img-pop";

                var pop_div_div = document.createElement("div");
                pop_div_div.className = "popup";
                pop_div_div.align = "center";
                pop_div_div.append(pop_b0, pop_b1, pop_a, pop_p, pop_dis, pop_img);

                var pop_div = document.createElement("div");
                pop_div.id = json_data.data[i].tag;
                pop_div.className = "pop-overlay";
                pop_div.appendChild(pop_div_div);


                // Append by work_images div
                var works_images_div = document.getElementById("work_images");
                works_images_div.append(card, pop_div);
            }
        }
    }
}

var pop_img_idx = 0;  // image index in pop element
var pop_id = 0;  // pop element index
var img_list_len = 0;  // image list length
var img_list = [];
var pop_func = {
    init: function (index) {
        // console.log(index);
        pop_id = index;  // get the button index

        img_list = json_data.data[pop_id].images;
        img_list_len = img_list.length;

        // Change index
        var pop_p = document.getElementById("pop_p_" + pop_id);
        pop_p.innerHTML = (pop_img_idx + 1) + "/" + img_list_len;

        var pop_dis = document.getElementById("pop_dis_" + pop_id);
        pop_dis.innerHTML = json_data.data[pop_id].discription[0];
    },
    changeimg: function (pop_name) {
        // Check limit
        if (pop_name == "next") {
            pop_img_idx += 1;
            if (pop_img_idx >= img_list_len) {  // set limit
                pop_img_idx = img_list_len - 1;
                return;
            }
        }
        else {
            pop_img_idx -= 1;
            if (pop_img_idx < 0) {  // set limit
                pop_img_idx = 0;
                return;
            }
        }
        var pop_dis = document.getElementById("pop_dis_" + pop_id);
        pop_dis.innerHTML = json_data.data[pop_id].discription[pop_img_idx];

        // Change index
        var pop_p = document.getElementById("pop_p_" + pop_id);
        pop_p.innerHTML = (pop_img_idx + 1) + "/" + img_list_len;

        // Change image
        var pop_img = document.getElementById("pop_img_" + pop_id);
        pop_img.src = "images/other_works/images/" + img_list[pop_img_idx];
    },
    close: function () {
        // Reset all elements
        pop_img_idx = 0;

        // Reset index
        var pop_p = document.getElementById("pop_p_" + pop_id);
        pop_p.innerHTML = "1/" + img_list_len;

        // Reset image
        var pop_img = document.getElementById("pop_img_" + pop_id);
        pop_img.src = "images/other_works/images/" + img_list[pop_img_idx];

    }
}