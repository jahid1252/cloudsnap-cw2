const form = document.getElementById("uploadForm");
const imageList = document.getElementById("imageList");

async function fetchImages() {

    const response = await fetch("http://localhost:5000/api/images");
    const images = await response.json();

    imageList.innerHTML = "";

    images.forEach(image => {

        imageList.innerHTML += `
            <div class="card">

                <img src="${image.imageUrl}" width="250">

                <h3>${image.title}</h3>

                <button onclick="editImage(${image.id})">
                    Edit
                </button>

                <button onclick="deleteImage(${image.id})">
                    Delete
                </button>

            </div>
        `;
    });
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const image = document.getElementById("image").files[0];

    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", image);

    await fetch("http://localhost:5000/api/images", {
        method: "POST",
        body: formData
    });

    form.reset();

    fetchImages();
});

async function deleteImage(id) {

    await fetch(`http://localhost:5000/api/images/${id}`, {
        method: "DELETE"
    });

    fetchImages();
}

async function editImage(id) {

    const newTitle = prompt("Enter new image title:");

    if (!newTitle) return;

    await fetch(`http://localhost:5000/api/images/${id}`, {

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

fetchImages();