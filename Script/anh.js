document.getElementById("anhSP").addEventListener("change", function () {
    const previewContainer = document.getElementById("preview-container");
    previewContainer.innerHTML = "";

    Array.from(this.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewItem = document.createElement("div");
            previewItem.className = "preview-item";
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Ảnh sản phẩm">
                <div class="preview-info">${file.name}</div>
                <div class="preview-actions">                    
                    <button class="del-btn" title="Xóa ảnh"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            `;

            previewItem.querySelector(".del-btn").addEventListener("click", () => previewItem.remove());
            previewContainer.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
});
