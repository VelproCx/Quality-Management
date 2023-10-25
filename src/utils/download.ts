// downloadUtils.ts

export default function downloadFile(
  fileUrl: string,
  fileName: string,
  fileType: string
) {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = fileUrl;
  link.target = '_blank';

  // 设置 Content-Disposition 头部
  const disposition = `attachment; filename=${fileName}`;
  link.setAttribute('download', disposition);

  // 设置合适的文件扩展名
  let fileExt = 'txt'; // 默认为 .txt
  if (fileType === 'application/zip') {
    fileExt = 'zip';
  } else if (fileType === 'text/plain') {
    fileExt = 'log';
  } else if (
    fileType ===
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    fileExt = 'xlsx';
  } // 在这里添加更多文件类型的判断和扩展名

  fileName = `${fileName}.${fileExt}`;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export { downloadFile };
