let Books1 = [];
let Books2 = [];

// saat load dom
window.addEventListener("DOMContentLoaded", () => {
  // cek storage dapat digunakan atau tidak
  if (typeof Storage === "undefined") {
    alert("Browser does not support local storage");
    window.location.reload();
  }

  // cek  data di local storage ada atau tidak
  // books1
  if (
    localStorage.getItem("Books1") !== null &&
    localStorage.getItem("Books1") !== ""
  ) {
    //   buat variabel temp html
    let temp_html = "";

    //   panggil buku 1 di localstorage
    let books = JSON.parse(localStorage.getItem("Books1"));

    //   lakukan perulangan
    for (const book of books) {
      // push ke Books1 array
      Books1.push(book);

      // buat html nya
      let data = tampil_book(
        book.title,
        book.author,
        book.year,
        book.id,
        book.isComplete
      );

      //   tambahkan ke temp_html
      temp_html += data;
    }

    //   tampikan ke user
    document.getElementById("incompleteBookList").innerHTML = temp_html;
  } else {
    // selain itu buat localstorage  awal books1
    localStorage.setItem("Books1", "");
  }

  // books2
  if (
    localStorage.getItem("Books2") !== null &&
    localStorage.getItem("Books2") !== ""
  ) {
    //   buat variabel temp html
    let temp_html = "";

    //   panggil buku 1 di localstorage
    let books = JSON.parse(localStorage.getItem("Books2"));

    //   lakukan perulangan
    for (const book of books) {
      // push ke Books1 array
      Books2.push(book);

      // buat html nya
      let data = tampil_book(
        book.title,
        book.author,
        book.year,
        book.id,
        book.isComplete
      );

      //   tambahkan ke temp_html
      temp_html += data;
    }

    //   tampikan ke user
    document.getElementById("completeBookList").innerHTML = temp_html;
  } else {
    //   selain itu biat localstorage awal books2
    localStorage.setItem("Books2", "");
  }
});

// tampilkan data buku dimasing masing colom
const tampil_book = (title, author, year, id, isComplete) => {
  // kembalikan dalam bentuk html string
  return `
        <div data-bookid="${id}" data-testid="bookItem"
            class="border rounded border-3 border-primary-subtle p-3">
            <h3 data-testid="bookItemTitle">${title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${author}</p>
            <p data-testid="bookItemYear">Tahun: ${year}</p>
            <div>
              ${
                isComplete === false
                  ? `<button data-testid="bookItemIsCompleteButton"
                class="btn btn-outline-primary">Selesai
                dibaca</button>`
                  : `<button data-testid="bookItemIsCompleteButton"
                class="btn btn-outline-secondary">Belum Selesai
                dibaca</button>`
              }
              <button data-testid="bookItemDeleteButton"
                class="btn btn-outline-danger">Hapus Buku</button>
              <button data-testid="bookItemEditButton"
                class="btn btn-outline-warning">Edit Buku</button>
            </div>
        </div>
    `;
};

// penyimpanan Buku
// buku 1
const save_book = () => {
  return localStorage.setItem("Books1", JSON.stringify(Books1));
};

// buku 2
const save_book2 = () => {
  return localStorage.setItem("Books2", JSON.stringify(Books2));
};

// Form Tamsbah buku
document.getElementById("bookForm").onsubmit = function (event) {
  // berhentikan event tipe submit
  event.preventDefault();

  // ambil data dari form
  let bookItemTitle = document.querySelector(
    `#${event.target.id} #bookFormTitle`
  ).value;
  let bookItemAuthor = document.querySelector(
    `#${event.target.id} #bookFormAuthor`
  ).value;
  let bookItemYear = document.querySelector(
    `#${event.target.id} #bookFormYear`
  ).value;
  let checked = document.querySelector(
    `#${event.target.id} #bookFormIsComplete`
  ).checked;

  // sisikan menjadi dalam bentuk object
  const data = {
    id: Number(new Date()),
    title: bookItemTitle.toString(),
    author: bookItemAuthor.toString(),
    year: Number(bookItemYear),
    isComplete: checked,
  };

  // buat menjadi json  dna simpan di local storage
  if (checked === true) {
    Books2.push(data);
    save_book2();
  } else {
    Books1.push(data);
    save_book();
  }

  // tampilkan message
  alert("Data Berhasil Ditambahkan");
  window.location.reload();
};

// form edit buku
document.getElementById("bookFormEdit").onsubmit = function (event) {
  // berhentikan event tipe submit
  event.preventDefault();

  // ambil data dari form
  let bookId = document.querySelector(`#${event.target.id} #bookFormId`).value;
  let bookItemTitle = document.querySelector(
    `#${event.target.id} #bookFormTitle`
  ).value;
  let bookItemAuthor = document.querySelector(
    `#${event.target.id} #bookFormAuthor`
  ).value;
  let bookItemYear = document.querySelector(
    `#${event.target.id} #bookFormYear`
  ).value;
  let checked = document.querySelector(
    `#${event.target.id} #bookFormIsComplete`
  ).checked;

  // sisikan menjadi dalam bentuk object
  const data = {
    id: Number(bookId),
    title: bookItemTitle.toString(),
    author: bookItemAuthor.toString(),
    year: Number(bookItemYear),
    isComplete: checked,
  };

  // cari index masing masing book books1 dan books2
  const indexBooks1 = Books1.findIndex((book) => book.id === Number(bookId));
  const indexBooks2 = Books2.findIndex((book) => book.id === Number(bookId));

  // cek index ada atau tidak

  // books1
  if (indexBooks1 !== -1) {
    Books1[indexBooks1] = data;
    save_book();
  }

  // books2
  if (indexBooks2 !== -1) {
    Books2[indexBooks2] = data;
    save_book2();
  }

  // pesaan message ke user dan reload halaman
  alert("Data berhasil diedit");
  window.location.reload();
};

// pencarian Buku
document.getElementById("searchBook").onsubmit = function (event) {
  // berhentikan event tipe submit
  event.preventDefault();

  let temp_html = "";

  // ambil value pencarian
  const searchBookFormTitleInput = document
    .getElementById("searchBookTitle")
    .value.trim()
    .toLowerCase();

  // pencarian kosong
  if (searchBookFormTitleInput === "") {
    return window.location.reload();
  }

  // buku 1

  //   panggil buku 1 di localstorage
  let books = JSON.parse(localStorage.getItem("Books1"));

  for (const book of books) {
    if (book.title.toLowerCase().includes(searchBookFormTitleInput)) {
      temp_html += tampil_book(
        book.title,
        book.author,
        book.year,
        book.id,
        book.isComplete
      ); // panggil fungsi tampil_book
    }
  }

  //   tampikan ke user
  if (temp_html !== "") {
    document.getElementById("incompleteBookList").innerHTML = temp_html;
  } else {
    document.getElementById("incompleteBookList").innerHTML = "";
  }

  // buku 2

  temp_html = "";
  //   panggil buku 2 di localstorage
  books = JSON.parse(localStorage.getItem("Books2"));

  for (const book of books) {
    if (book.title.toLowerCase().includes(searchBookFormTitleInput)) {
      temp_html += tampil_book(
        book.title,
        book.author,
        book.year,
        book.id,
        book.isComplete
      ); // panggil fungsi tampil_book
    }
  }

  //   tampikan ke user;
  if (temp_html != "") {
    document.getElementById("completeBookList").innerHTML = temp_html;
  } else {
    document.getElementById("completeBookList").innerHTML = "";
  }

  // pesan pencarian berhasil
  alert("Pencarian berhasil!");
};

// button buku
document.addEventListener("click", function (event) {
  // ambil button id yang ditekan
  const bookItemButton = event.target.getAttribute("data-testid");
  // ambil id buku ditekan dibagian sudah dibaca / belum
  const bookId =
    event.target.parentElement.parentElement.getAttribute("data-bookid");
  // ambil id grupnya ditekan dibagian sudah dibaca / belum
  const bookGroup =
    event.target.parentElement.parentElement.parentElement.getAttribute(
      "data-testid"
    );

  //   cek apakah button id delete yang ditekan

  // delete item
  if (bookItemButton === "bookItemDeleteButton") {
    //   cek dikolom bagian mana
    //   books2
    if (bookId && bookGroup && bookGroup == "completeBookList") {
      // filterisasi array jika tidak sama
      Books2 = Books2.filter((book) => book.id !== Number(bookId));

      // simpan ke local storage
      save_book2();

      // books1
    } else if (bookId && bookGroup && bookGroup == "incompleteBookList") {
      // filterisasi array jika tidak sama
      Books1 = Books1.filter((book) => book.id !== Number(bookId));

      // simpan ke local storage
      save_book();
    }

    // tampilkan pesan ke user dan auto reload
    alert("Data Berhasil Dihapus");
    window.location.reload();
  }

  // ubah status buku
  else if (bookItemButton === "bookItemIsCompleteButton") {
    //   cek dikolom bagian mana tombol ditekan

    //   books1
    if (bookId && bookGroup && bookGroup == "incompleteBookList") {
      // filterisasi array
      // dengan perubahan status dan mengembalikan array berdasarkan id tersebut
      const Books3 = Books1.filter((book) => {
        return book.id === Number(bookId);
      });

      // dengan perubahan status
      Books3[0].isComplete = true;

      // dengan perubahan yang mengembalikan bukan array berdasarkan id tersebut
      Books1 = Books1.filter((book) => book.id !== Number(bookId));

      // simpan ke array books2 dari variabel penghubung books3
      Books2.push(Books3[0]);
      // books2
    } else if (bookId && bookGroup && bookGroup == "completeBookList") {
      // filterisasi array
      // dengan perubahan status dan mengembalikan array berdasarkan id tersebut
      const Books3 = Books2.filter((book) => {
        return book.id === Number(bookId);
      });

      // dengan perubahan status
      Books3[0].isComplete = false;

      // dengan perubahan yang mengembalikan bukan array berdasarkan id tersebut
      Books2 = Books2.filter((book) => book.id !== Number(bookId));

      // simpan ke array books1 dari variabel penghubung books3
      Books1.push(Books3[0]);
    }

    // simpan ke local storage
    save_book();
    save_book2();

    // tampilkan message ke user dan reload halaman
    alert(
      bookGroup === "incompleteBookList"
        ? "Buku Selesai Dibaca"
        : "Buku Belum Selesai Dibaca"
    );
    window.location.reload();
  }

  // edit Buku
  else if (bookItemButton === "bookItemEditButton") {
    // variabel penghubung
    let Books3 = [];
    //   cek dikolom bagian mana tombol ditekan

    //   books1
    if (bookId && bookGroup && bookGroup == "incompleteBookList") {
      // filtering terlebih dahulu
      Books3 = Books1.filter((book) => book.id === Number(bookId));
    }

    // books 2
    else if (bookId && bookGroup && bookGroup == "completeBookList") {
      // filtering terlebih dahulu
      Books3 = Books2.filter((book) => book.id === Number(bookId));
    }

    // melkukan perulanagan array untuk dapat object 1
    Books3.forEach((book) => {
      // penambahaban value setiap form
      document.querySelector("#bookFormEdit #bookFormId").value = book.id;
      document.querySelector("#bookFormEdit #bookFormTitle").value = book.title;
      document.querySelector("#bookFormEdit #bookFormAuthor").value =
        book.author;
      document.querySelector("#bookFormEdit #bookFormYear").value = book.year;
      document.querySelector("#bookFormEdit #bookFormIsComplete").checked =
        book.isComplete;
    });

    // pilih modal emelen modal yang akan ditampilkan
    const myModalEl = document.getElementById("myModal");

    // Gunakan Bootstrap Modal API untuk menampilkan modal
    const modal = new bootstrap.Modal(myModalEl);

    // tampilkan modal
    modal.show();
  }
});
