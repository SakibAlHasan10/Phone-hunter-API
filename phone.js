const loadPhone = async (searchFiled, isAllShow) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchFiled}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones)
  displayPhones(phones, isAllShow);
};
const displayPhones = (phones, isAllShow) => {
  console.log(phones)
  const cardContainer = document.getElementById("card-container");
  // clear card container container before add new card
  cardContainer.textContent = "";
  const loadAllButton = document.getElementById('load-all-button')
  if(phones.length > 12 && !isAllShow){
      loadAllButton.classList.remove('hidden')
    }else{
        loadAllButton.classList.add('hidden')
    }
    // display only first 12 phone
    if(!isAllShow){

      phones = phones.slice(0, 12);
    }

  phones.forEach((phone) => {
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
  toggleLodgingSpinner(false)

};

// document.getElementById('search-btn').addEventListener('click', function())
const handelSearch = (siAllShow) => {
    toggleLodgingSpinner(true)
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  fetch("https://openapi.programming-hero.com/api/phones?search=${searchText}");
  loadPhone(searchText, siAllShow);
};

const toggleLodgingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
    loadingSpinner.classList.remove('hidden')
    }else{
    loadingSpinner.classList.add('hidden')
    }
}

// load all
const loadAllCard = () =>{
    handelSearch(true)
}

// show modal
const showMyModal = async (id) =>{
  console.log('modal', id)
  // load individual data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = res.json();
  console.log(data)
  document.getElementById('my_modal_5', )
}
