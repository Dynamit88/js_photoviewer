/*
 * Template For Single Instance Plugin
 * @Author: Ivan Mykolenko
 * @Date: 24.07.2019
 */


;
(function () { // Anonymous function 

    var Photoviewer = function (photos, n, opts) {
        this.photos = photos;
        this.n = n; // Current photo in the dataset
        this.size = Object.keys(photos).length;
        this.options = Object.assign(Photoviewer.defaults, opts);
        buildUI(this);
        createHandlers(this);
        addEventListeners(this);
    }

    // Attach our defaults for plugin to the plugin itself
    Photoviewer.defaults = {}



    // Public method
    Photoviewer.prototype.showPhoto = function (n) {
        if (n > -1 && n < this.size - 1) {
            this.photoDiv.style.backgroundImage = "url('" + this.photos[n].src + "')";
            this.n = n;
        }
        return this;
    }

    Photoviewer.prototype.destroy = function () {
        removeEventListeners(this);
        document.body.removeChild(this.wrapper);

        this.photos = null;
        this.onCloseBtnClick = null;
        this.onPrevBtnClick = null;
        this.onNextBtnClick = null;
        this.onKeyDown = null;
    }


    // Private function to initialize the UI Elements
    function buildUI(plugin) {
        plugin.wrapper = document.createElement('div');
        plugin.wrapper.id = "photo-viewer";

        // Close button
        plugin.closeBtn = document.createElement("span");
        plugin.closeBtn.id = "photo-viewer-close-btn";
        plugin.wrapper.appendChild(plugin.closeBtn);


        // Background
        plugin.pane = document.createElement("div");
        pane.id = "photo-viewer-pane";
        plugin.wrapper.appendChild(plugin.pane);


        // Photo conatainer
        plugin.photoDiv = document.createElement("img");
        plugin.photoDiv.id = "photo-div";
        plugin.photoDiv.src = plugin.photos[plugin.n].src;
        checkIfPortrait(plugin.photoDiv);


        //        plugin.photoDiv.style.backgroundImage = "url('" + plugin.photos[plugin.n].src + "')";

        plugin.pane.appendChild(plugin.photoDiv);

        // Description
        plugin.descBox = document.createElement("p");
        plugin.descBox.id = "photo-desc";
        plugin.pane.appendChild(plugin.descBox);
        updateDescription(plugin);

        // Previous photo button
        plugin.leftBtn = document.createElement("div");
        plugin.leftBtn.id = "photo-left-btn";
        plugin.leftBtn.innerHTML += "<span id='photo-left-btn-icon'></span>";
        plugin.pane.appendChild(plugin.leftBtn);


        // Next photo button
        plugin.rightBtn = document.createElement("div");
        plugin.rightBtn.id = "photo-right-btn";
        plugin.rightBtn.innerHTML += "<span id='photo-right-btn-icon'></span>";
        plugin.pane.appendChild(plugin.rightBtn);


        document.body.appendChild(plugin.wrapper);
    }









    function createHandlers(plugin) {
        plugin.onCloseBtnClick = function () {
            Photoviewer.prototype.destroy.call(plugin);
        };

        plugin.onPrevBtnClick = function () {
            plugin.photoDiv.classList.remove("portrait");
            if (plugin.n == 0) {
                plugin.n = plugin.size - 1;
            } else {
                plugin.n--;
            }
            plugin.photoDiv.src = plugin.photos[plugin.n].src;
            checkIfPortrait(plugin.photoDiv);
            updateDescription(plugin);
        };

        plugin.onNextBtnClick = function () {
            plugin.photoDiv.classList.remove("portrait");
            if (plugin.n == plugin.size - 1) {
                plugin.n = 0;
            } else {
                plugin.n++;
            }


            plugin.photoDiv.src = plugin.photos[plugin.n].src;
            checkIfPortrait(plugin.photoDiv);
            updateDescription(plugin);
        };


        plugin.onKeyDown = function (event) {
            switch (event.key) {
                case "ArrowLeft":
                    plugin.onPrevBtnClick();
                    tmpClass(plugin.leftBtn, "hover");
                    break;
                case "ArrowRight":
                    plugin.onNextBtnClick();
                    tmpClass(plugin.rightBtn, "hover");
                    break;
                case "Escape":
                    plugin.onCloseBtnClick();
                    break;

            }
        }
    }

    function checkIfPortrait(image) {
        echo("Width: " + image.clientWidth + " Height: " + image.clientHeight);
        image.onload = function () {
            if (image.clientWidth < image.clientHeight) {
                image.classList.add("portrait");
                image.onload = null;
            }
        }
    }

    function updateDescription(plugin) {
        if (plugin.photos[plugin.n].desc) {
            plugin.descBox.style.display = "block"
            plugin.descBox.innerHTML = plugin.photos[plugin.n].desc;
        } else {
            plugin.descBox.innerHTML = "";
            plugin.descBox.style.display = "none"
        }

    }


    function addEventListeners(plugin) {
        plugin.closeBtn.addEventListener("click", plugin.onCloseBtnClick);
        plugin.leftBtn.addEventListener("click", plugin.onPrevBtnClick);
        plugin.rightBtn.addEventListener("click", plugin.onNextBtnClick);
        document.addEventListener("keydown", plugin.onKeyDown);
    }



    function removeEventListeners(plugin) {
        plugin.closeBtn.removeEventListener("click", plugin.onCloseBtnClick);
        plugin.leftBtn.removeEventListener("click", plugin.onPrevBtnClick);
        plugin.rightBtn.removeEventListener("click", plugin.onNextBtnClick);
        document.removeEventListener("keydown", plugin.onKeyDown);
    }




    function tmpClass(element, classString, delay) {
        element.classList.add(classString);
        setTimeout(function () {
            element.classList.remove(classString);
        }, delay == null ? 500 : delay);

    }






    // Make plugin accessible globally
    window.Photoviewer = Photoviewer;


    function echo(txt) {
        console.log(txt);
    }
})();
