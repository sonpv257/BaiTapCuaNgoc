document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector(".list-table tbody");
    if (!table) return;

    const rows = Array.from(table.querySelectorAll("tr"));
    const rowsPerPage = 10;
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    let currentPage = 1;

    // Tạo phần tử pagination
    const pagination = document.createElement("div");
    pagination.className = "pagination";

    const info = document.createElement("div");
    info.className = "page-info";

    const pageNumbers = document.createElement("div");
    pageNumbers.className = "page-numbers";

    pagination.appendChild(info);
    pagination.appendChild(pageNumbers);
  table.parentElement.parentElement.appendChild(pagination);

    // Hiển thị bảng
    function renderTable() {
        rows.forEach(row => (row.style.display = "none"));
        const start = (currentPage - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, totalRows);

        for (let i = start; i < end; i++) {
            rows[i].style.display = "";
        }

        info.innerHTML = `Hiển thị <b>${start + 1}</b> đến <b>${end}</b> trong tổng <b>${totalRows}</b>`;
        renderPagination();
    }

    // Vẽ thanh phân trang
    function renderPagination() {
        pageNumbers.innerHTML = "";

        // Nút trước
        const prev = document.createElement("button");
        prev.textContent = "Trước";
        prev.disabled = currentPage === 1;
        prev.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        };
        pageNumbers.appendChild(prev);

        // Tính trang hiển thị
        const maxVisible = 4;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1)
            startPage = Math.max(1, endPage - maxVisible + 1);

        // Nếu trang > 1 thì thêm "1 ..." ở đầu
        if (startPage > 1) {
            const first = createPageButton(1);
            pageNumbers.appendChild(first);
            if (startPage > 2) {
                const dots = document.createElement("span");
                dots.textContent = "...";
                dots.className = "dots";
                pageNumbers.appendChild(dots);
            }
        }

        // Thêm các số trang
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.appendChild(createPageButton(i));
        }

        // Nếu chưa đến cuối thì thêm "... n"
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement("span");
                dots.textContent = "...";
                dots.className = "dots";
                pageNumbers.appendChild(dots);
            }
            const last = createPageButton(totalPages);
            pageNumbers.appendChild(last);
        }

        // Nút sau
        const next = document.createElement("button");
        next.textContent = "Sau";
        next.disabled = currentPage === totalPages;
        next.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        };
        pageNumbers.appendChild(next);
    }

    // Hàm tạo nút trang
    function createPageButton(page) {
        const btn = document.createElement("button");
        btn.textContent = page;
        btn.className = page === currentPage ? "active" : "";
        btn.onclick = () => {
            currentPage = page;
            renderTable();
        };
        return btn;
    }

    renderTable();
});

