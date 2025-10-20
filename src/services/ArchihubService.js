import { URL_API, PAGE_SIZE } from "../config/const";

export function search(filters = {}) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  const path = "/search/public";

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function downloadResource(id, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL_API + "/resources/public/download_records", true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = (event.loaded / event.total) * 100;
        onProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const filename = xhr.getResponseHeader('content-disposition')?.split('filename=')[1] || 'download';

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          resolve();
        }, 100);
      } else {
        reject(new Error(`Download failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Download failed'));
    });

    xhr.timeout = 60000;
    xhr.addEventListener('timeout', () => {
      reject(new Error('Download timed out'));
    });

    xhr.send(JSON.stringify({
      id: id,
      type: 'original'
    }));
  });
}

export function downloadRecord(id, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', URL_API + "/records/public/download", true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = (event.loaded / event.total) * 100;
        onProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const filename = xhr.getResponseHeader('content-disposition')?.split('filename=')[1] || 'download';

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          resolve();
        }, 100);
      } else {
        reject(new Error(`Download failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Download failed'));
    });

    xhr.timeout = 60000;
    xhr.addEventListener('timeout', () => {
      reject(new Error('Download timed out'));
    });


    console.log("Downloading record with id:", id);
    xhr.send(JSON.stringify({
      id: id,
      type: 'original'
    }));
  });
}

export function getById(id) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  const path = "/resources/public/" + id;

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}

export function getRecordById(id) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var miInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  const path = "/records/public/" + id;

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}