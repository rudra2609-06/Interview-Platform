import {
  Show,
  SignInButton,
  SignOutButton,
  UserButton,
  UserProfile,
} from "@clerk/react";
import React from "react";
import "./style.css";

const App = () => {
  return (
    <div>
      <h1 className="bg-amber-800">welcome to app</h1>
      <Show when="signed-out">
        <SignInButton mode="modal" />
      </Show>
      <Show when="signed-in">
        <SignOutButton mode="modal" />
      </Show>
      <UserButton />
    </div>
  );
};

export default App;
