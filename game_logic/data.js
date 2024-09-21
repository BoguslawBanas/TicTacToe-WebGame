const content = "Hello, world!";
const blob = new Blob([content], { type: 'text/plain' });

const file = new File([blob], "data.txt", { type: "text/plain" });

// console.log(file);
