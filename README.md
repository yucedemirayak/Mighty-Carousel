# Mighty-Carousel

![banner picture 1](https://github.com/yucedemirayak/Mighty-Carousel/blob/master/Banners/1.jpeg)
### For demo -> https://www.yucedemirayak.com/mighty-carousel-demo.html
## How to use ?

### 1st link the css and js file in the html document
```html
<link rel="stylesheet" href="css/mighty-carousel.css"/>
<script src="js/mighty-carousel.js"></script>
```
### The carousel's html code should look like this
```html
<div class="mc" id="mighty-carousel" data-autoscroll="" data-indicators="" data-controls="">
      <div class="mc-inner" data-imgps="">
          <div class="mc-item">
            <img class="mc-img" src="...">
            <div class="mc-caption">
                <h5>Title</h5>
                <p>Placeholder</p>
            </div>
          </div>
          .
          .
          .
      </div>
    </div>
```
![banner picture 1](https://github.com/yucedemirayak/Mighty-Carousel/blob/master/Banners/2.jpeg)
### You can add as many mc-items as you want.
### Furthermore you can display multiple images per slide by changing imgps dataset.
The maximum value that the imgps dataset can take should be 1 less than the length of the added items.
```html
data-imgps="{maxlength - 1}"
```
### You can change autoscroll dataset for how many seconds you want slide. If you dont want autoscroll you can type "0" or just left it empty.
```html
data-autoscroll="2"
```
### If you want indicators change indicators dataset to true. Indicators are only available when imgps dataset is not set.
```html
data-indicators="true"
```
### You can enable slide control buttons by changing controls dataset to true
```html
data-controls="true"
```
