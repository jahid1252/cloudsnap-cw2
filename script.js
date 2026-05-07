const uploadForm = document.getElementById("uploadForm");
const gallery = document.getElementById("gallery");

async function loadImages() {

    const res = await fetch("http://localhost:5000/api/images");

    const images = await res.json();

    gallery.innerHTML = "";

    images.forEach(image => {

        gallery.innerHTML += `
        
        <div class="card">

            <img src="${image.imageUrl}" />

            <h3>${image.title}</h3>

            <button onclick="editImage(${image.id})">
                ✏️ Edit
            </button>

            <button onclick="deleteImage(${image.id})">
                🗑 Delete
            </button>

        </div>
        `;
    });
}

uploadForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
        "title",
        document.getElementById("title").value
    );

    formData.append(
        "image",
        document.getElementById("image").files[0]
    );

    await fetch("http://localhost:5000/api/images", {
        method: "POST",
        body: formData
    });

    alert("✅ Image uploaded successfully");

    uploadForm.reset();

    loadImages();
});

async function deleteImage(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/images/${id}`, {
        method: "DELETE"
    });

    loadImages();
}

async function editImage(id) {

    const newTitle = prompt(
        "Enter new image title"
    );

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

    alert("✅ Title updated");

    loadImages();
}

loadImages();