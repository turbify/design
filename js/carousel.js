class Carousel {
    constructor(carouselElement) {
      this.carouselList = carouselElement.querySelector('.carousel__list');
      this.carouselItems = carouselElement.querySelectorAll('.carousel__item');
      this.elems = Array.from(this.carouselItems);
      this.totalItems = this.elems.length;  // Dynamically get the total number of items
  
      this.carouselList.addEventListener('click', (event) => {
        const newActive = event.target.closest('.carousel__item');
        
        if (!newActive || newActive.classList.contains('carousel__item_active')) {
          return;
        }
  
        this.update(newActive);
      });
    }
  
    update(newActive) {
      const newActivePos = parseInt(newActive.dataset.pos);
  
      const current = this.elems.find((elem) => parseInt(elem.dataset.pos) === 0);
      
      current.classList.remove('carousel__item_active');
      
      // Update all item positions
      this.elems.forEach((item) => {
        const itemPos = parseInt(item.dataset.pos);
        item.dataset.pos = this.getNewPos(itemPos, newActivePos);
      });
  
      // Set new active class
      this.elems.find(elem => parseInt(elem.dataset.pos) === 0).classList.add('carousel__item_active');
    }
  
    getNewPos(currentPos, newActivePos) {
      // Calculate relative position based on the new active item
      let newPos = (currentPos - newActivePos + this.totalItems) % this.totalItems;
  
      // Normalize the position so it stays within the bounds (-half, +half)
      if (newPos > Math.floor(this.totalItems / 2)) {
        newPos -= this.totalItems; // Adjust for wrapping
      }
  
      return newPos;
    }
  }
  
  // Initialize all carousels on the page
  document.querySelectorAll('.carousel').forEach((carouselElement) => {
    new Carousel(carouselElement);
  });
  