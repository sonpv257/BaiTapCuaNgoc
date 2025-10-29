const inputAnh = document.getElementById("anhSP");
const previewContainer = document.getElementById("preview-container");

inputAnh.addEventListener("change", function () {
    previewContainer.innerHTML = "";

    // Dùng DataTransfer để dễ quản lý danh sách file
    const dataTransfer = new DataTransfer();

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

            // Xử lý xóa ảnh khi click
            previewItem.querySelector(".del-btn").addEventListener("click", () => {
                previewItem.remove();

                // Cập nhật lại danh sách file trừ file bị xóa
                const updatedFiles = Array.from(inputAnh.files).filter(
                    (f) => f.name !== file.name
                );

                const newData = new DataTransfer();
                updatedFiles.forEach((f) => newData.items.add(f));
                inputAnh.files = newData.files;
            });

            previewContainer.appendChild(previewItem);
        };
        reader.readAsDataURL(file);

        // Thêm file vào danh sách (để có thể cập nhật sau này)
        dataTransfer.items.add(file);
    });

    // Gán lại danh sách file cho input
    inputAnh.files = dataTransfer.files;
});
