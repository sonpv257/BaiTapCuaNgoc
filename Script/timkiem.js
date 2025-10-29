
// Tìm kiếm theo tất cả các cột

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input");
    const rows = document.querySelectorAll(".product-table tbody tr");

    searchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase().trim();

        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            if (text.includes(keyword)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});


// tìm kiếm theo 1 cột cụ thể

// document.addEventListener("DOMContentLoaded", function () {
//     const searchInput = document.querySelector(".search-input");
//     const rows = document.querySelectorAll(".product-table tbody tr");

//     searchInput.addEventListener("input", function () {
//         const keyword = this.value.toLowerCase().trim();

//         rows.forEach(row => {
//             const nameCell = row.querySelector("td:nth-child(3)"); // Vị trí cột đếm từ 1
//             const name = nameCell ? nameCell.textContent.toLowerCase() : "";
//             row.style.display = name.includes(keyword) ? "" : "none";
//         });
//     });
// });