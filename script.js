function nightVision(){
    var canvas = document.getElementById('inputCanvas');
    var context = canvas.getContext('2d');
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var y = document.getElementById('multiplier').value;
    var slope = (1 - y) / 256;
    for(var i = 0; i < imageData.data.length; i += 4){
        imageData.data[i] = Math.floor(imageData.data[i] * y - imageData.data[i] * slope);
        imageData.data[i + 1] = Math.floor(imageData.data[i + 1] * y - imageData.data[i + 1] * slope);
        imageData.data[i + 2] = Math.floor(imageData.data[i + 2] * y - imageData.data[i + 2] * slope);
    }
    document.getElementById('canvas').getContext('2d').putImageData(imageData, 0, 0);
}

document.getElementById('input').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        var img = new Image();
        img.onload = function(){
            var inputCanvas = document.getElementById('inputCanvas');
            inputCanvas.width = this.width;
            inputCanvas.height = this.height;
            var canvas = document.getElementById('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            inputCanvas.getContext('2d').drawImage(this, 0, 0)
            nightVision();
        }
        img.src = URL.createObjectURL(this.files[0]);
    }
});

document.getElementById('multiplier').addEventListener('change', function(){
    nightVision();
});