import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

function UserCard({ session }: { session: Session }) {
  function handleSignOut() {
    signOut()
      .then(() => {
        console.log("signout");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <div>
        Name: {session.user?.name}
        <br />
        Email: {session.user?.email}
      </div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

export default UserCard;
