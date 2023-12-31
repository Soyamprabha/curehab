import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import CardList from "../services/database/cardList";
import "./styles/profilePage.css";

const ProfilePage=()=> {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const uid = authUser.uid;
        const userDocRef = doc(db, "users", uid);

        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              setUser(docSnapshot.data());
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {user && (
        <div class="profile-bg">
          <div class="container profile-full">
            <div class="first-half">
              <div class="profile-pic">
                <img style={{maxWidth:"100%"}} src={user.photoURL} alt="Profile" />
              </div>
              <div className="profile-name">Hello, {user.name} !</div>
              <div className="profile-name-small">{user.bio}</div>
            </div>

            <div className="second-half">
              <h3> Your Previous Journals</h3>
              <div className="journal-cards">
                <CardList user={user} />
              </div>
            </div>

            <div className="both-buttons">
              <button className="book-appointment">Book Appointment</button>
              <button className="update-profile">Update Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;