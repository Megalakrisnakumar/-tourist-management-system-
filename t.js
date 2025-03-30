const uu="http://localhost:8000/uploads/1743330414993-Screenshot (2).png"
console.log(uu.split("http://localhost:8000/"));

const imagePath = path.join(__dirname, uu.split("http://localhost:8000/"))
