// downloadUtils.ts

// 用于下载 Blob 对象
export default function downloadBlob(blob: Blob, fileName: string) {
  // 使用 Blob 对象创建一个 URL
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;

  // 设置 Content-Disposition 头部
  const disposition = `attachment; filename=${fileName}`;
  link.setAttribute('download', disposition);
  console.log(blob);

  // 默认文件扩展名
  let fileExt = 'txt'; // 如果不知道文件类型，默认使用 .txt
  if (blob.type) {
    if (blob.type === 'application/zip') {
      fileExt = 'zip';
    } else if (blob.type === 'text/plain') {
      fileExt = 'log';
    } else if (
      blob.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      fileExt = 'xlsx';
    } // 在这里添加更多文件类型的判断和扩展名

    fileName = `${fileName}`;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 清理 URL 对象
    window.URL.revokeObjectURL(url);
  }
}
export { downloadBlob };
