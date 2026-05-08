const API_URL = "/api/images";

const form = document.getElementById("uploadForm");
const imageList = document.getElementById("imageList");

async function fetchImages() {

    const response = await fetch(API_URL);
    const images = await response.json();

    imageList.innerHTML = "";

    images.forEach(image => {

        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${image.title}</h3>
            <img src="${image.imageUrl}" width="200">
            <br><br>

            <button onclick="editImage(${image.id})">
                Edit
            </button>

            <button onclick="deleteImage(${image.id})">
                Delete
            </button>

            <hr>
        `;

        imageList.appendChild(div);
    });
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData(form);

    await fetch(API_URL, {
        method: "POST",
        body: formData
    });

    form.reset();

    fetchImages();
});

async function editImage(id) {

    const newTitle = prompt("Enter new title");

    if (!newTitle) return;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newTitle
        })
    });

    fetchImages();
}

async function deleteImage(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    fetchImages();
}

fetchImages();