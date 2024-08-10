const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file && file.type === 'image/png') {
        const reader = new FileReader();
        reader.onload = function() {
            const imageDataUrl = reader.result;
            const newCSSValue = `url(${imageDataUrl})`;
            document.documentElement.style.setProperty('--tileset01', newCSSValue);
        };
        reader.readAsDataURL(file);
    }
});

function normal_tile()
{
    document.documentElement.style.setProperty('--tileset01', "url(../tileset/tileset01.png)");
}
