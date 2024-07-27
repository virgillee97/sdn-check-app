import React from "react";
import SDNForm from "./components/sdnForm/sdnForm";

const Home: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SDNForm />
    </div>
  );
};

export default Home;
