/* let storedBooks = JSON.parse(localStorage.getItem("books")) || [];
let book_name = document.getElementById("bookName").value;
let book_author = document.getElementById("authorName").value;
let semister = document.getElementById("semester").value;
const imgInput = document.getElementById("imageInput");
const  imageSrc= document.getElementById("imageInput").files[0] ? document.getElementById("imageInput").files[0].name : "";

const booksToAppend = [{ name: bookName, author: authorName, image: imageSrc }];
console.log(booksToAppend);
const previewImg = document.getElementById("preview");

imgInput.addEventListener("change", function () {
    const file = imgInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            previewImg.src = reader.result;
            previewImg.style.display = "block";
            console.log("Base64 Image:", reader.result);
            updatedBooks[updatedBooks.length - 1].image = reader.result;
            localStorage.setItem("books", JSON.stringify(updatedBooks));
        };

        reader.readAsDataURL(file); 
    }
});
imgInput.addEventListener("change", function () {
    if (imgInput.files.length > 0) {
        const fileName = imgInput.files[0].name;
        console.log("Selected Image Name:", fileName);
    }
});

if (!Array.isArray(storedBooks)) {
    storedBooks = [];
}

const updatedBooks = storedBooks.concat(booksToAppend);
localStorage.setItem("books", JSON.stringify(updatedBooks));
 

localStorage.removeItem("books"); // Clear stored books
let storedBooks = []; // Reset storage

let book_name = document.getElementById("bookName").value;
let book_author = document.getElementById("authorName").value;
let semister = document.getElementById("semester").value;
const imgInput = document.getElementById("imageInput");
const previewImg = document.getElementById("preview");

const booksToAppend = [{ name: book_name, author: book_author, semester: semister, image: "" }];

// Handle image selection and updating storage
imgInput.addEventListener("change", function () {
    const file = imgInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            previewImg.src = reader.result;
            previewImg.style.display = "block";
            console.log("Base64 Image:", reader.result);
            booksToAppend[0].image = reader.result;

            // Store updated books
            const updatedBooks = storedBooks.concat(booksToAppend);
            localStorage.setItem("books", JSON.stringify(updatedBooks));
        };

        reader.readAsDataURL(file);
    }
});*/
let storedBooks = JSON.parse(localStorage.getItem("books")) || [];
// Handle image preview immediately when selected
const imgInput = document.getElementById("imageInput");
const previewImg = document.getElementById("preview");

imgInput.addEventListener("change", function () {
    const file = imgInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            previewImg.src = reader.result;
            previewImg.style.display = "block";
            console.log("Base64 Image:", reader.result);
        };

        reader.readAsDataURL(file);
    }
});

function addBook() {
    let book_name = document.getElementById("bookName").value.trim();
    let books_count= document.getElementById("books_count").value.trim();
    let book_author = document.getElementById("authorName").value.trim();
    let semester = document.getElementById("semester").value.trim();
    let discription = document.getElementById("discription").value.trim();
    if (!book_name || !book_author || !semester || !discription) {
        alert("Please fill in all fields before adding a book.");
        return;
    }

    const newBook = {
        name: book_name,
        author: book_author,
        semester: semester,
        discription: discription,
        image: imgInput.files.length > 0 ? previewImg.src : "" ,
        books_count:books_count
    };

    storedBooks.push(newBook);
    localStorage.setItem("books", JSON.stringify(storedBooks));
    console.log("Book stored successfully:", newBook);
       setTimeout(() => {
        window.location.reload();
    }, 500); 

}

let delete_book = ()=>{
    let element = document.getElementById("deleteBook"); 
    element.style.display = "block";
}
let update_book=()=>{
    let element = document.getElementById("updateBook"); 
    element.style.display = "block";
}
function remove_book() {
    let storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    let bookName = document.getElementById("remove_bookName").value.trim();
    storedBooks = storedBooks.filter(book => book.name !== bookName);
    localStorage.setItem("books", JSON.stringify(storedBooks));
    document.getElementById("delete_msg").innerText = "Book deleted successfully";
    document.getElementById("delete_msg").style.color = "red";
    setTimeout(() => {
        window.location.reload();
    }, 500);
}
function upgrade(){
    let storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    let bookName = document.getElementById("update_bookName").value.trim();
    let newCount = document.getElementById("update_bookcount").value.trim();

    if (!bookName || !newCount) {
        alert("Please provide both the book name and the new count.");
        return;
    }

    let bookFound = false;

    storedBooks = storedBooks.map(book => {
        if (book.name === bookName) {
            book.books_count = newCount;
            bookFound = true;
        }
        return book;
    });

    if (bookFound) {
        localStorage.setItem("books", JSON.stringify(storedBooks));
        console.log(`Updated book count for "${bookName}" to ${newCount}.`);

        setTimeout(() => {
            window.location.reload();
        }, 500);
    } else {
        alert("Book not found.");
    }
}
