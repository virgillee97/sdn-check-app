import React from "react";
// import "antd/dist/antd.css"; // Import Ant Design styles
import SDNForm from "./components/sdnForm/sdnForm";
import dynamic from "next/dynamic";

// Dynamically import the form component with SSR disabled
// const SDNForm = dynamic(() => import("./sdnForm"), { ssr: false });

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
