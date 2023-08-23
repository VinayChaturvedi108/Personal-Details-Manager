const userDetails = document.querySelector(".userDetails");
const editProfile = document.querySelector("#editProfile");
function createusercollection(user) {
  firebase.firestore().collection("users").doc(user.uid).set({
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    phone: "",
    speciality: "",
    portfolioUrl: "",
    experience: "",
  });
}

async function getuserinfo(userID) {
  if (userID) {
    const usersnap = await firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .get();

    const userInfo = usersnap.data();
//     if (userInfo != null) {
//       userDetails.innerHTML = `
//             <h3>${userInfo.name}</h3>
//             <h3>${userInfo.email}</h3>
//             <h3>${userInfo.phone}</h3>
//             `;
//     }
//   } else {
//     userDetails.innerHTML = `
//         <h3>Please Login</h3>`;
//   }
// }

// async function getuserinfoRealtime(userID) {
//   if (userID) {
//     const userdocRef = await firebase
//       .firestore()
//       .collection("users")
//       .doc(userID);
//     userdocRef.onSnapshot((doc) => {
//       if (doc.exists) {
//         const userInfo = doc.data();
        if (userInfo) {
          userDetails.innerHTML = `
                    <ul class="collection">
                      <li class="collection-item"><h3>${userInfo.name}</h3></li>
                      <li class="collection-item"><h4>${userInfo.email}</h4></li>
                      <li class="collection-item">Phone - </li>
                      <li class="collection-item">speciality - </li>
                      <li class="collection-item">PortfolioUrl-<a href="${userInfo.portfolioUrl}"></li>
                      <li class="collection-item">Experience - </li>
                    </ul>
                    <button class="btn waves-effect modal-trigger" href="#modal3">edit</button>
                    `;
          editProfile["name"].value = userInfo.name;
          editProfile["profileEmail"].value = userInfo.email;
          editProfile["phoneno"].value = userInfo.phone;
          editProfile["speciality"].value = userInfo.speciality;
          editProfile["portfolioUrl"].value = userInfo.portfolioUrl;
          editProfile["experience"].value = userInfo.experience;

          if (firebase.auth().currentUser.photoURL) {
            document.querySelector("#proimg").src =
              firebase.auth().currentUser.photoURL;
          }
        }
      }
      else {
      userDetails.innerHTML = `
            <h3>Please Login</h3>`;
    }
    }
    // )} 
// }

function updateUserProfile(e) {
  e.preventDefault();
  const userdocRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);

  userdocRef.update({
    name: editProfile["name"].value,
    email: editProfile["profileEmail"].value,
    phone: editProfile["phoneno"].value,
    speciality: editProfile["speciality"].value,
    portfolioUrl: editProfile["portfolioUrl"].value,
    experience: editProfile["experience"].value,
  });
  M.Modal.getInstance(myModal[2]).close();
}

function uploadImage(e) {
  console.log(e.target.files[0]);
  const uid = firebase.auth().currentUser.uid;
  // const fileRef = firebase.storage().ref().child(`/users/${uid}/profile`)
  const storageRef = firebase.storage().ref();
  // const uploadTask = fileRef.put(e.target.files[0])
  const uploadTask = storageRef
    .child(`/users/${uid}/profile`)
    .put(e.target.files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress == "100") alert("uploaded");
    },
    (error) => {
      console.log(error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        document.querySelector("#proimg").src = downloadURL
        firebase.auth().currentUser.updateProfile({
          displayName: "User",
          photoURL: downloadURL,
        });
      });
    }
  );
}


async function allUserDetails(){
  document.getElementById("table").style.display = 'table'
  const userRef = await firebase.firestore().collection('users').get()

  
    userRef.docs.forEach(doc=>{

      const info = doc.data()
      document.getElementById('tbody').innerHTML +=`
      <tr>
      <td>${info.name}</td>
      <td>${info.email}</td>
      <td>${info.phone}</td>
      <td>${info.speciality}</td>
      <td>${info.experience}</td>
      <td><a href = "${info.portfolioUrl}">view</td>
     </tr>
    `
      console.log(info)
    })
  }
