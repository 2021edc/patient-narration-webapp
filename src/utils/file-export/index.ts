import * as XLSX from 'xlsx';

interface ExcelExportOptions<TData> {
  data: TData[];
  fileName: string;
  sheetName?: string;
}

export const exportToExcel = <Tdata>(options: ExcelExportOptions<Tdata>) => {
  const fileName = options.fileName;
  const sheetName = options.sheetName || 'Sheet1';

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(options.data, {
    header: Object.keys(options.data[0] || {}),
  });

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
};
