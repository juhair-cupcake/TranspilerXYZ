export async function addBlobDownload(fileName, linkURL, targatedAnkorEle) {
  const response = await fetch(linkURL);
  const resBlob = await response.blob();
  const blob = new Blob([resBlob], {
    type: 'application/octetstream'
  });

  const url = window.URL || window.webkitURL;
  const link = url.createObjectURL(blob);

  targatedAnkorEle.setAttribute('download', fileName);
  targatedAnkorEle.setAttribute('href', link);
}
