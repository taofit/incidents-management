import React from "react";
import { Text } from "@cinemataztic/cine-ui";

const App = () => {
  return (
    <div className="bg-primary h-screen overflow-y-auto min-h-full px-4">
      <Text color="primary" className="py-8">
        Hello, World!
      </Text>
      <div className="text-white bg-secondary rounded-xl h-auto p-5">
        <Text color="default">Let's get started.</Text>
      </div>
    </div>
  );
};

export default App;
