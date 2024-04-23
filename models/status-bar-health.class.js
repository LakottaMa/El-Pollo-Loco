class HealthBar extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    percentage = 100;
    /**
     * Initializes a new instance of the constructor function.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
    /**
     * Sets the percentage of the current object and updates the image accordingly.
     * @param {number} percentage - The percentage to set the current object to.
     */
    setPercentage(percentage) {
        console.log('HealthBar Pepe:', percentage);
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }
    /**
     * Resolves the index of the image based on the given percentage.
     * @param {number} percentage - The percentage to resolve the image index for.
     * @return {number} The index of the image corresponding to the percentage.
     */
    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}