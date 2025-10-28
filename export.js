document.addEventListener("DOMContentLoaded", () => {
  const exportBtn = document.querySelector(".btn-export");
  const exportDropdown = document.querySelector(".export-dropdown");

  // Toggle dropdown menu
  if (exportBtn) {
    exportBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      exportDropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      exportDropdown.classList.remove("show");
    });
  }

  // === 🟢 EXPORT CSV ===
  document.getElementById("export-csv")?.addEventListener("click", (e) => {
    e.preventDefault();

    const table = document.querySelector(".product-table");
    if (!table) return alert("Không tìm thấy bảng sản phẩm.");

    // Lấy tất cả các dòng (th + td)
    const rows = Array.from(table.querySelectorAll("tr"));
    const csv = rows.map(row => {
      const cells = Array.from(row.querySelectorAll("th, td"));
      return cells.map(cell => {
        let text = cell.innerText.replace(/\s+/g, " ").trim().replace(/"/g, '""');
        return `"${text}"`;
      }).join(",");
    }).join("\n");

    // Tạo file CSV để tải về
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DanhSachSanPham.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // === 🟢 PRINT TABLE ===
  document.getElementById("print-table")?.addEventListener("click", (e) => {
    e.preventDefault();

    const table = document.querySelector(".product-table");
    if (!table) return alert("Không tìm thấy bảng sản phẩm để in.");

    const tableHTML = table.outerHTML;
    const printWindow = window.open("", "", "width=1000,height=700");
    
    if (printWindow) {
      const htmlContent = `
        <html>
          <head>
            <title>In danh sách sản phẩm</title>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; padding: 20px; color: #111; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ccc; padding: 8px 10px; text-align: left; }
              th { background: #f3f4f6; }
              tr:nth-child(even) { background: #fafafa; }
              img { max-width: 60px; border-radius: 6px; }
            </style>
          </head>
          <body>
            <h2>Danh sách sản phẩm</h2>
            ${tableHTML}
          </body>
        </html>
      `;

      printWindow.document.documentElement.innerHTML = htmlContent;
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  });
});
