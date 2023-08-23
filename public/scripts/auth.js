const myModal = document.querySelectorAll(".modal");

async function signUp(e) {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.querySelector("#signupPassword");
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password.value);
    await result.user.updateProfile({
      displayName: "User",
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    })
    createusercollection(result.user)
    // await result.user.sendEmailVerification()
    M.toast({
      html: `Registeration Successfully complete with ${result.user.email}`,
      classes: "green",
    }); ////This shows message which is not good  Because we were not want to show any hacker any hint of email or password is wrong or not!
    console.log(result);
  } catch (err) {
    console.log(err);
    M.toast({ html: err.message, classes: "red" });
  }
  email.value = "";
  password.value = "";
  M.Modal.getInstance(myModal[0]).close();
}
async function logIn(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.querySelector("#loginPassword");
  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password.value);
    M.toast({
      html: `You are Successfully login with ${result.user.email}`,
      classes: "green",
    }); ////This shows message which is not good Because we were not want to show any hacker any hint of email or password is wrong or not!
    console.log(result);
  } catch (err) {
    console.log(err);
    M.toast({ html: err.message, classes: "red" });
  }
  email.value = "";
  password.value = "";
  M.Modal.getInstance(myModal[1]).close();
}

function logOut() {
  firebase.auth().signOut()
  document.querySelector("#proimg").src = "./ID's/favicon.png.jpeg"
}
const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    document.getElementById("loginli").style.display = "none"
    document.getElementById("signupli").style.display = "none"
    document.getElementById("logoutli").style.display = "block"
    getuserinfo(user.uid)
    // getuserinfoRealtime(user.uid)
    if(user.uid == '81vnqWHnd7Z6hzrhh5kMBf9RQxO2'){
      allUserDetails()
    }
  } else {
    getuserinfo(null)
    // getuserinfoRealtime(null)
    console.log("logout sucessfully");
    document.getElementById('table').style.display = 'none'
    document.getElementById("logoutli").style.display = "none"
    document.getElementById("loginli").style.display = "block"
    document.getElementById("signupli").style.display = "block"
    M.toast({ html: "logout sucessfully", classes: "red" });
  }
});
/*
code cleanup  
unsubscribe()
*/

// async function loginwithGoogle() {
//     try{
//         var provider = new firebase.auth.GoogleAuthProvider();
//         const result = await firebase.auth()
//         .signInWithPopup(provider)
//         console.log(result)
//         console.log("Google login Successfully");
//         M.toast({ html: "Google login Successfully", classes: "red" });
//     }catch(err){
//       console.log("errogf")
//         console.log(err)
//     }
// }

