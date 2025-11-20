const repoOwner = "waldemarboratyn-collab";
const repoName = "sercem-pisane";

fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents`)
  .then(response => response.json())
  .then(files => {
      const gallery = document.getElementById("gallery");
      files
        .filter(f => f.name.toLowerCase().endsWith(".jpg"))
        .forEach(f => {
            const img = document.createElement("img");
            img.src = f.download_url;
            img.alt = f.name;
            img.onclick = () => openModal(f.download_url);
            gallery.appendChild(img);
        });
  });

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("closeBtn");

function openModal(src) {
    modal.style.display = "block";
    modalImg.src = src;
}
closeBtn.onclick = () => modal.style.display = "none";
