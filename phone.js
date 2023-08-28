const loadPhone = async (searchFiled, isAllShow) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchFiled}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones, isAllShow);
  // console.log(phones)
  noItems(phones)
};

// Now item show display
const noItems = (items) =>{
  const noItem = document.getElementById('no-item')
  if(items.length===0){
    noItem.classList.remove('hidden')
  }else{
    if(items.length > 0){
    noItem.classList.add('hidden')

    }
  }
}

const displayPhones = (phones, isAllShow) => {
  // console.log(phones);
  const cardContainer = document.getElementById("card-container");
  // clear card container container before add new card
  cardContainer.textContent = "";
  const loadAllButton = document.getElementById("load-all-button");
  if (phones.length > 12 && !isAllShow) {
    loadAllButton.classList.remove("hidden");
  } else {
    loadAllButton.classList.add("hidden");
  }
  // display only first 12 phone
  if (!isAllShow) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone)
    const card = document.createElement("div");
    card.classList = `card p-6 bg-base-100 shadow-xl`;
    card.innerHTML = `
            <figure>
                 <img src="${phone.image}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center ">
                    <button class="btn w-3/6 btn-primary mt-5" onclick="showMyModal('${phone.slug}')">Show Details</button>
                </div>
            </div>
        `;
    cardContainer.appendChild(card);
    // console.log(phone);
  });
  toggleLodgingSpinner(false);
};


// show modal
const showMyModal = async (id) => {
  // load individual data
  console.log("modal", id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showModalDetails(phone);
};

// show modal details
const showModalDetails = (phone) => {
  // const phoneName = document.getElementById('phone-name')
  // phoneName.innerText= phone.name;
  const showModalContainer = document.getElementById('show-modal-container');
  showModalContainer.innerHTML= `
  <div class="bg-sky-100">
      <img src='${phone.image}' class="w-32 mx-auto py-6 rounded-xl mb-6 h-52 ">
  </div>
  <h3 id="phone-name" class="font-bold text-2xl">${phone?.name || 'not bailable'}</h3>
  <p><span class="font-semibold text-xl">Stores:</span> ${phone?.mainFeatures?.storage || 'not bailable'}</p>
  <p><span class="font-semibold text-lg">Display Size :</span> ${phone?.mainFeatures?.displaySize || 'not bailable'}</p>
  <p><span class="font-semibold text-lg">Chipset :</span> ${phone?.mainFeatures?.chipSet || 'not bailable'}</p>
  <p><span class="font-semibold text-lg">Memory :</span> ${phone?.mainFeatures?.memory || 'not bailable'}</p>
  <p><span class="font-semibold text-lg">Slug :</span> ${phone?.slug || 'not bailable'}</p>
  <p><span class="font-semibold text-lg">Release data :</span> ${phone?.releaseDate || 'not bailable'}</p>
  <p><span class="font-semibold text-lg">Brand :</span> ${phone?.brand || 'not bailable'}</p>
  <p><span class="font-semibold text-lg">GPS :</span> ${phone?.others?.GPS || 'not bailable'}</p>
  `
  console.log(phone)
  show_details_modal.showModal();
};

// document.getElementById('search-btn').addEventListener('click', function())
const handelSearch = (siAllShow) => {
  toggleLodgingSpinner(true);
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  fetch("https://openapi.programming-hero.com/api/phones?search=${searchText}");
  loadPhone(searchText, siAllShow);
};

const toggleLodgingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// load all
const loadAllCard = () => {
  handelSearch(true);
};





