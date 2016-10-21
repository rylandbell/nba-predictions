// let addImg = (src) => {
//   let imgElement =
//     document.createElement("img")
//   imgElement.src = src
//   document.body.appendChild(imgElement)
// }

// Promise.all([
//   loadImage('images/cat1.jpg'),
//   loadImage('images/cat2.jpg'),
//   loadImage('images/cat3.jpg'),
//   loadImage('images/cat4.jpg')
// ]).then((images) => {
//   images.forEach(img => addImg(img.src))
// }).catch((error) => {
//   // handle error later
// })

// function loadImage(url) {
//   return new Promise((resolve, reject) => {
//     let image = new Image()

//     image.onload = function() {
//       resolve(image)
//     }

//     image.onerror = function() {
//       let message =
//         'Could not load image at ' + url
//       reject(new Error(msg))
//     }

//     image.src = url

//   })
// }

function getData(isSuccess) {
  return new Promise((resolve, reject) => {
    if(isSuccess) {
      resolve('success!');
    } else {
      reject(new Error('no dice'));
    }
  })
}

function manyPromises(status1, status2, status3) {
  Promise.all([
    getData(status1),
    getData(status2),
    getData(status3)
  ]).then((messages) => {
    messages.forEach(msg => console.log('Message; ', msg));
  }).catch((error) => {
  throw error
  })
}

manyPromises(true, true, true);