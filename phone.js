const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones);
};
const displayPhones = (phones) => {
  phones.forEach((phone) => {
    const cardContainer = document.getElementById("card-container");
    const card = document.createElement("div");
    card.classList = `card m-10 bg-gray-100 shadow-xl`;
    card.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `;
    cardContainer.appendChild(card);
    console.log(phone.image);
  });
};
loadPhone();
