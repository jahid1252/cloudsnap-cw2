const API_URL = "/api/images";

const form = document.getElementById("uploadForm");
const imageList = document.getElementById("imageList");

async function fetchImages() {

    const response = await fetch(API_URL);
    const images = await response.json();

    imageList.innerHTML = "";

    images.forEach(image => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${image.imageUrl}" width="250">

            <h3>${image.title}</h3>

            <button onclick="editImage(${image.id})">
                Edit
            </button>

            <button onclick="deleteImage(${image.id})">
                Delete
            </button>
        `;

        imageList.appendChild(card);
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